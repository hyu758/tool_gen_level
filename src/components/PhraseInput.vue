<template>
  <div>
    <label>Phrase Symbol List</label>
    <input v-model="phrase" class="form-control mb-2" placeholder="Enter Phrase Symbol List" />
    <label>Full Phrase</label>
    <input v-model="fullPhrase" class="form-control" placeholder="Enter Full Phrase" />
  </div>
</template>

<script setup>
defineProps(['modelValue', 'modelValue:phrase', 'modelValue:fullPhrase'])
const emit = defineEmits(['update:phrase', 'update:fullPhrase'])

const phrase = defineModel('phrase')
const fullPhrase = defineModel('fullPhrase')
</script>
