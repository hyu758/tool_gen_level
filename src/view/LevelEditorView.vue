<template>
  <div class="container mt-4">
    <h2>Level Generator</h2>

    <div v-if="step === 1">
      <div class="mb-3">
        <label class="form-label">Phrase Symbol List</label>
        <input v-model="phraseSymbolList" class="form-control" placeholder="Enter phrase symbol list" />
      </div>
      <div class="mb-3">
        <label class="form-label">Full Phrase</label>
        <input v-model="fullPhrase" class="form-control" placeholder="Enter full phrase" />
      </div>
      <div class="mb-3">
        <label class="form-label">Copyright</label>
        <input v-model="copyright" class="form-control" placeholder="Enter copyright" />
      </div>
      <div class="mb-3">
        <label class="form-label">Minimum Number of Words to Pick</label>
        <input v-model.number="wordCount" type="number" class="form-control" min="1" placeholder="Enter count" />
      </div>
      <div class="mb-3">
        <label class="form-label">Category</label>
        <select v-model="selectedCategoryId" class="form-select">
          <option value="" disabled>Select category</option>
          <option v-for="cat in categories" :key="cat.Id" :value="cat.Id">{{ cat.Name }}</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="initGenerator" :disabled="!canInit">Start Picking Words</button>
    </div>

    <div v-else-if="step === 2">
      <h5>Pick words for: "{{ phraseSymbolList }}"</h5>
      <h6>Selected: {{ chosenWords.length }} / {{ wordCount }} (Minimum)</h6>
      <div v-if="currentCandidate">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Next Word: {{ currentCandidate.Word }}</h5>
            <p>Definitions:</p>
            <div v-for="(def, idx) in currentDefinitions" :key="idx" class="form-check">
              <input class="form-check-input" type="radio" :id="`def${idx}`" name="def" :value="def"
                v-model="selectedDefinition">
              <label class="form-check-label" :for="`def${idx}`">{{ def }}</label>
            </div>
            <button class="btn btn-success mt-2" @click="confirmPick" :disabled="!selectedDefinition">
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <h4>Generated Level JSON</h4>
        <pre>{{ outputJson }}</pre>
        <button class="btn btn-primary mr-2" @click="saveLevel">Save level</button>
        <button class="btn btn-secondary" @click="reset">Start Over</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const categories = ref([])
const words = ref([])
const levels = ref([])
const toast = useToast()
onMounted(() => {
  axios.get(`${API_URL}/api/categories`)
    .then(response => {
      categories.value = response.data;
      console.log('Response :', response.data);
    })
    .catch(error => console.error('Error fetching categories:', error));

  axios.get(`${API_URL}/api/words`)
    .then(response => {
      words.value = response.data;
      console.log('Response :', response.data);
    })
    .catch(error => console.error('Error fetching words:', error));

  axios.get(`${API_URL}/api/max-level-id`)
    .then(response => {
      nextId.value = response.data.maxId;
    })
    .catch(error => {
      console.error('Error fetching max level ID:', error);
      nextId.value = 1;
    });
})

const step = ref(1)
const phraseSymbolList = ref('')
const fullPhrase = ref('')
const copyright = ref('')
const wordCount = ref(1)
const selectedCategoryId = ref('')
const nextId = ref(1)

const remainingLetters = ref(new Set())
const priorityCandidates = reactive(new Map())
const backupCandidates = reactive(new Map())
const chosenWords = ref([])

const currentCandidate = ref(null)
const currentDefinitions = ref([])
const selectedDefinition = ref('')

const canInit = computed(() =>
  phraseSymbolList.value.trim() &&
  fullPhrase.value.trim() &&
  copyright.value.trim() &&
  wordCount.value > 0 &&
  selectedCategoryId.value
)

function toBitmask(str) {
  let mask = 0;
  for (let char of str.toUpperCase().replace(/[^A-Z]/g, '')) {
    const index = char.charCodeAt(0) - 'A'.charCodeAt(0);
    mask |= (1 << index);
  }
  return mask;
}

function countBits(mask) {
  let count = 0;
  while (mask) {
    count += mask & 1;
    mask >>= 1;
  }
  return count;
}

function initGenerator() {
  const chars = phraseSymbolList.value.toUpperCase().replace(/[^A-Z]/g, '');
  remainingLetters.value = new Set(chars);
  const firstCountLetters = remainingLetters.value.size;
  const phraseMask = toBitmask(chars);
  
  console.log("Phrase mask:", phraseMask.toString(2));
  console.log("First count letters:", firstCountLetters);

  priorityCandidates.clear();
  backupCandidates.clear();
  words.value.forEach(w => {
    const wordMask = toBitmask(w.WordSymbolList);
    if ((wordMask & phraseMask) === wordMask) {
      const overlap = countBits(wordMask);
      const threshold = Math.ceil(firstCountLetters / 3.0);
      if (overlap >= threshold) {
        priorityCandidates.set(w.WordSymbolList, {
          Word: w.WordSymbolList,
          Mask: wordMask,
          Weight: w.Weight,
          Definitions: w.Definitions
        });
      } else {
        backupCandidates.set(w.WordSymbolList, {
          Word: w.WordSymbolList,
          Mask: wordMask,
          Weight: w.Weight,
          Definitions: w.Definitions
        });
      }
    }
  });
  chosenWords.value = [];
  console.log("Priority candidates size:", priorityCandidates.size);
  console.log("Backup candidates size:", backupCandidates.size);
  step.value = 2;
  pickNext();
}

function computeBest() {
  let best = null;
  let maxNewCov = 0;
  let maxWeight = 0;
  const candidatesToCheck = priorityCandidates.size > 0 ? priorityCandidates : backupCandidates;
  const remainingMask = toBitmask(Array.from(remainingLetters.value).join(''));
  candidatesToCheck.forEach(c => {
    const newCov = countBits(c.Mask & remainingMask);
    if (newCov > 0 || remainingLetters.value.size === 0) {
      if (newCov > maxNewCov || (newCov === maxNewCov && c.Weight > maxWeight)) {
        maxNewCov = newCov;
        maxWeight = c.Weight;
        best = c;
      }
    }
  });
  return best;
}

function pickNext() {
  if (chosenWords.value.length >= wordCount.value && remainingLetters.value.size === 0) {
    currentCandidate.value = null;
    return;
  }
  const b = computeBest();
  if (b) {
    currentCandidate.value = b;
    currentDefinitions.value = b.Definitions;
    selectedDefinition.value = '';
  } else {
    currentCandidate.value = null;
  }
}

function confirmPick() {
  chosenWords.value.push({
    WordSymbolList: currentCandidate.value.Word,
    Description: selectedDefinition.value
  });
  const wordMask = currentCandidate.value.Mask;
  let remainingMask = toBitmask(Array.from(remainingLetters.value).join(''));
  remainingMask &= ~wordMask;
  remainingLetters.value = new Set(
    Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
      .filter(char => (remainingMask & (1 << (char.charCodeAt(0) - 'A'.charCodeAt(0)))) !== 0)
  );
  if (priorityCandidates.has(currentCandidate.value.Word)) {
    priorityCandidates.delete(currentCandidate.value.Word);
  } else {
    backupCandidates.delete(currentCandidate.value.Word);
  }
  if (chosenWords.value.length >= wordCount.value && remainingLetters.value.size === 0) {
    currentCandidate.value = null;
  } else {
    pickNext();
  }
}

function finish() {
  if (remainingLetters.value.size > 0) {
    alert('Warning: Not all letters are covered by the selected words.');
  }
  step.value = 3;
}

const outputJson = computed(() => JSON.stringify({
  Id: nextId.value.toString(),
  PhraseSymbolList: phraseSymbolList.value,
  FullPhrase: fullPhrase.value,
  CategoryId: selectedCategoryId.value,
  Copyright: copyright.value,
  Words: chosenWords.value
}, null, 2));

function saveLevel() {
  const newLevel = {
    Id: nextId.value.toString(),
    PhraseSymbolList: phraseSymbolList.value,
    FullPhrase: fullPhrase.value,
    CategoryId: selectedCategoryId.value,
    Copyright: copyright.value,
    Words: chosenWords.value
  };
  axios.post(`${API_URL}/api/save-level`, newLevel)
    .then(response => {
      console.log(response.data);
      if (response.status === 201) {
        toast.success('Level saved successfully!', {
          position: 'top-right',
          duration: 3000
        });
        nextId.value += 1;
        reset();
      }
    })
    .catch(error => {
      console.error('Error saving level:', error);
      toast.error('Failed to save level. Please try again.', {
        position: 'top-right',
        duration: 3000
      });
    });
}

function reset() {
  step.value = 1;
  phraseSymbolList.value = '';
  fullPhrase.value = '';
  copyright.value = '';
  wordCount.value = 1;
  selectedCategoryId.value = '';
  chosenWords.value = [];
}
</script>