<template>
  <div class="mt-3">
    <label>Category</label>
    <select v-model="selectedCategory" class="form-select">
      <option v-for="cat in categories" :key="cat.Id" :value="cat">{{ cat.Name }}</option>
    </select>
  </div>
</template>

<script setup>
defineProps(['categories'])
const selectedCategory = defineModel('selectedCategory')
</script>
