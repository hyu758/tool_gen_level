<template>
  <div class="mt-3">
    <label>Select Words</label>
    <div v-for="word in words" :key="word.WordSymbolList" class="form-check">
      <input type="checkbox" class="form-check-input" :id="word.WordSymbolList"
             v-model="selectedWords" :value="word" />
      <label class="form-check-label" :for="word.WordSymbolList">{{ word.WordSymbolList }}</label>
    </div>
  </div>
</template>

<script setup>
defineProps(['words'])
const selectedWords = defineModel('selectedWords')
</script>
