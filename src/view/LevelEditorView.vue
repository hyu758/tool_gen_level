<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Figure It Level Editor</h1>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-center space-x-4">
          <div class="flex items-center">
            <div :class="['flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium',
              step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500']">
              1
            </div>
            <span class="ml-2 text-sm font-medium text-gray-900">Setup</span>
          </div>
          <div class="flex-auto border-t-2 transition duration-500 ease-in-out"
            :class="step >= 2 ? 'border-indigo-600' : 'border-gray-300'"></div>
          <div class="flex items-center">
            <div :class="['flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium',
              step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500']">
              2
            </div>
            <span class="ml-2 text-sm font-medium text-gray-900">Generate</span>
          </div>
        </div>
      </div>

      <div v-if="step === 1" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white">Level Configuration</h2>
          <p class="text-indigo-100 mt-1">Fill in the details to create your level</p>
        </div>

        <div class="px-8 py-8 space-y-8">
          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg class="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Phrase Symbol List
            </label>
            <input v-model="phraseSymbolList"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 placeholder-gray-400 group-hover:border-gray-300"
              placeholder="Enter the symbolic representation of your phrase" />
          </div>

          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg class="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Full Phrase
            </label>
            <input v-model="fullPhrase"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 placeholder-gray-400 group-hover:border-gray-300"
              placeholder="Enter the complete phrase or sentence" />
          </div>

          <div class="group">
            <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg class="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Copyright
            </label>
            <input v-model="copyright"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 placeholder-gray-400 group-hover:border-gray-300"
              placeholder="Enter copyright information" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg class="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Minimum Words
              </label>
              <input v-model.number="wordCount" type="number"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 placeholder-gray-400 group-hover:border-gray-300"
                min="1" placeholder="Minimum number of words" />
            </div>

            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg class="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Category
              </label>
              <select v-model="selectedCategoryId"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 bg-white group-hover:border-gray-300">
                <option value="" disabled>Choose a category</option>
                <option v-for="cat in categories" :key="cat.Id" :value="cat.Id">{{ cat.Name }}</option>
              </select>
            </div>
          </div>

          <div class="pt-6">
            <button @click="initGenerator" :disabled="!canInit"
              class="w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:transform-none disabled:cursor-not-allowed"
              :class="canInit ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl' : 'bg-gray-300'">
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Picking Words
              </span>
            </button>
          </div>
          <div class="pt-2">
            <button @click="downloadJson"
              class="w-full py-4 px-6 rounded-xl text-gray-700 font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-gray-500/50 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 0l-2-2m2 2l2-2m-6 6h6a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Download All Levels
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Word Selection -->
      <div v-else-if="step === 2" class="space-y-8">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Word Selection</h2>
            <div class="text-sm text-gray-500">
              Step 2 of 2
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <p class="text-lg font-medium text-gray-700 mb-2">Picking words for:
                <span class="text-indigo-600 font-bold">"{{ phraseSymbolList }}"</span>
              </p>
              <div class="flex items-center space-x-4">
                <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Selected: {{ chosenWords.length }} / {{ wordCount }} (Minimum)
                </div>
                <div v-if="remainingLetters.size > 0"
                  class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  Remaining letters: {{ remainingLetters.size }}
                </div>
                <div v-else class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  All letters covered!
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Word Selection -->
        <div v-if="currentCandidate" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-teal-600 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">Word</h3>
            <div class="text-3xl font-bold text-white tracking-wide">{{ currentCandidate.Word }}</div>
          </div>

          <div class="px-8 py-8">
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Choose Definition
              </h4>
              <div class="space-y-3">
                <div v-for="(def, idx) in currentDefinitions" :key="idx" class="relative">
                  <input type="radio" :id="`def${idx}`" name="def" :value="def" v-model="selectedDefinition"
                    class="sr-only peer">
                  <label :for="`def${idx}`"
                    class="flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-md">
                    <div class="flex items-center h-5">
                      <div
                        class="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-green-500 peer-checked:bg-green-500 transition-all duration-200 flex items-center justify-center">
                        <div v-if="selectedDefinition === def" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-gray-900 font-medium leading-relaxed">{{ def }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button @click="confirmPick" :disabled="!selectedDefinition"
              class="w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:transform-none disabled:cursor-not-allowed"
              :class="selectedDefinition ? 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-lg hover:shadow-xl' : 'bg-gray-300'">
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Confirm Selection
              </span>
            </button>
          </div>
        </div>

        <!-- Final Output -->
        <div v-else class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">Level Generated!</h3>
            <p class="text-purple-100">Your level is ready to save</p>
          </div>

          <div class="px-8 py-8 space-y-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Generated Level JSON
              </h4>
              <div class="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <pre class="text-sm text-gray-800 overflow-auto max-h-96 whitespace-pre-wrap">{{ outputJson }}</pre>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="saveLevel"
                class="flex-1 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/50 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl">
                <span class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Save Level
                </span>
              </button>
              <button @click="reset"
                class="flex-1 py-4 px-6 rounded-xl text-gray-700 font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-gray-500/50 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50">
                <span class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Over
                </span>
              </button>

            </div>
          </div>
        </div>
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
      categories.value = response.data
    })
    .catch(error => console.error('Error fetching categories:', error))

  axios.get(`${API_URL}/api/words`)
    .then(response => {
      words.value = response.data
    })
    .catch(error => console.error('Error fetching words:', error))

  axios.get(`${API_URL}/api/max-level-id`)
    .then(response => {
      nextId.value = response.data.maxId
    })
    .catch(error => {
      console.error('Error fetching max level ID:', error)
      nextId.value = 1
    })
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
  let mask = 0
  for (let char of str.toUpperCase().replace(/[^A-Z]/g, '')) {
    const index = char.charCodeAt(0) - 'A'.charCodeAt(0)
    mask |= (1 << index)
  }
  return mask
}

function countBits(mask) {
  let count = 0
  while (mask) {
    count += mask & 1
    mask >>= 1
  }
  return count
}

function initGenerator() {
  const chars = phraseSymbolList.value.toUpperCase().replace(/[^A-Z]/g, '')
  remainingLetters.value = new Set(chars)
  const firstCountLetters = remainingLetters.value.size
  const phraseMask = toBitmask(chars)

  console.log('Phrase mask:', phraseMask.toString(2))
  console.log('First count letters:', firstCountLetters)

  priorityCandidates.clear()
  backupCandidates.clear()
  words.value.forEach(w => {
    const wordMask = toBitmask(w.WordSymbolList)
    if ((wordMask & phraseMask) === wordMask) {
      const overlap = countBits(wordMask)
      const threshold = Math.ceil(firstCountLetters / 3.0)
      if (overlap >= threshold) {
        priorityCandidates.set(w.WordSymbolList, {
          Word: w.WordSymbolList,
          Mask: wordMask,
          Weight: w.Weight,
          Definitions: w.Definitions
        })
      } else {
        backupCandidates.set(w.WordSymbolList, {
          Word: w.WordSymbolList,
          Mask: wordMask,
          Weight: w.Weight,
          Definitions: w.Definitions
        })
      }
    }
  })
  chosenWords.value = []
  console.log('Priority candidates size:', priorityCandidates.size)
  console.log('Backup candidates size:', backupCandidates.size)
  step.value = 2
  pickNext()
}

function computeBest() {
  let best = null
  let maxNewCov = 0
  let maxWeight = 0
  const candidatesToCheck = priorityCandidates.size > 0 ? priorityCandidates : backupCandidates
  const remainingMask = toBitmask(Array.from(remainingLetters.value).join(''))
  candidatesToCheck.forEach(c => {
    const newCov = countBits(c.Mask & remainingMask)
    if (newCov > 0 || remainingLetters.value.size === 0) {
      if (newCov > maxNewCov || (newCov === maxNewCov && c.Weight > maxWeight)) {
        maxNewCov = newCov
        maxWeight = c.Weight
        best = c
      }
    }
  })
  return best
}

function pickNext() {
  if (chosenWords.value.length >= wordCount.value && remainingLetters.value.size === 0) {
    currentCandidate.value = null
    return
  }
  const b = computeBest()
  if (b) {
    currentCandidate.value = b
    currentDefinitions.value = b.Definitions
    selectedDefinition.value = ''
  } else {
    currentCandidate.value = null
  }
}

function confirmPick() {
  chosenWords.value.push({
    WordSymbolList: currentCandidate.value.Word,
    Description: selectedDefinition.value
  })
  const wordMask = currentCandidate.value.Mask
  let remainingMask = toBitmask(Array.from(remainingLetters.value).join(''))
  remainingMask &= ~wordMask
  remainingLetters.value = new Set(
    Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
      .filter(char => (remainingMask & (1 << (char.charCodeAt(0) - 'A'.charCodeAt(0)))) !== 0)
  )
  if (priorityCandidates.has(currentCandidate.value.Word)) {
    priorityCandidates.delete(currentCandidate.value.Word)
  } else {
    backupCandidates.delete(currentCandidate.value.Word)
  }
  if (chosenWords.value.length >= wordCount.value && remainingLetters.value.size === 0) {
    currentCandidate.value = null
  } else {
    pickNext()
  }
}

function finish() {
  if (remainingLetters.value.size > 0) {
    alert('Warning: Not all letters are covered by the selected words.')
  }
  step.value = 3
}

const outputJson = computed(() => JSON.stringify({
  Id: nextId.value,
  PhraseSymbolList: phraseSymbolList.value,
  FullPhrase: fullPhrase.value,
  CategoryId: selectedCategoryId.value,
  Copyright: copyright.value,
  Words: chosenWords.value
}, null, 2))

function saveLevel() {
  const newLevel = {
    Id: nextId.value,
    PhraseSymbolList: phraseSymbolList.value,
    FullPhrase: fullPhrase.value,
    CategoryId: selectedCategoryId.value,
    Copyright: copyright.value,
    Words: chosenWords.value
  }
  axios.post(`${API_URL}/api/save-level`, newLevel)
    .then(response => {
      console.log('Save response:', response.data)
      if (response.status === 201) {
        toast.success('Level saved successfully!', {
          position: 'top-right',
          duration: 3000
        })
        nextId.value += 1
        reset()
      }
    })
    .catch(error => {
      console.error('Error saving level:', error)
      toast.error('Failed to save level. Please try again.', {
        position: 'top-right',
        duration: 3000
      })
    })
}

async function downloadJson() {
  try {
    // Lấy tất cả level hiện có
    const response = await axios.get(`${API_URL}/api/levels`)
    const existingLevels = response.data

    // Tạo Blob từ dữ liệu JSON
    const blob = new Blob([JSON.stringify(existingLevels, null, 2)], { type: 'application/json' })

    // Tạo URL cho Blob
    const url = window.URL.createObjectURL(blob)

    // Lấy ngày giờ hiện tại để đặt tên file
    const now = new Date()
    const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`

    // Tạo thẻ a ẩn để tải file
    const link = document.createElement('a')
    link.href = url
    link.download = `all_levels_${timestamp}.json`

    // Thêm link vào document
    document.body.appendChild(link)

    // Click vào link để tải file
    link.click()

    // Cleanup
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)

    // Hiển thị thông báo
    toast.success('All levels have been downloaded successfully!', {
      position: 'top-right',
      duration: 3000
    })
  } catch (error) {
    console.error('Error downloading levels:', error)
    toast.error('Failed to download levels. Please try again.', {
      position: 'top-right',
      duration: 3000
    })
  }
}

function reset() {
  step.value = 1
  phraseSymbolList.value = ''
  fullPhrase.value = ''
  copyright.value = ''
  wordCount.value = 1
  selectedCategoryId.value = ''
  chosenWords.value = []
}
</script>