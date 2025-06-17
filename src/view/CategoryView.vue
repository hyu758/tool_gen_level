<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-slate-900 mb-2">Category Management</h1>
            <p class="text-slate-600">Manage your categories with ease</p>
          </div>
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-slate-700">Items per page:</label>
            <select v-model="itemsPerPage" @change="handleItemsPerPageChange"
              class="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Categories Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 class="text-lg font-semibold text-slate-900">Categories List</h2>
          <p class="text-sm text-slate-600 mt-1">{{ totalItems }} total categories</p>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Placeholder</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Color
                  Scheme</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="category in paginatedCategories" :key="category.Id"
                class="hover:bg-slate-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span
                      class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      {{ category.Id }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-slate-900">{{ category.Name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-slate-600">{{ category.Placeholder }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <div class="flex items-center space-x-1">
                      <div class="w-6 h-6 rounded-lg shadow-sm border border-white ring-1 ring-black/10"
                        :style="{ backgroundColor: `rgb(${category.BackgroundColor})` }"
                        :title="`Background: rgb(${category.BackgroundColor})`">
                      </div>
                      <div class="w-6 h-6 rounded-lg shadow-sm border border-white ring-1 ring-black/10"
                        :style="{ backgroundColor: `rgb(${category.KeysBackgroundColor})` }"
                        :title="`Keys Background: rgb(${category.KeysBackgroundColor})`">
                      </div>
                      <div class="w-6 h-6 rounded-lg shadow-sm border border-white ring-1 ring-black/10"
                        :style="{ backgroundColor: `rgb(${category.KeysColor})` }"
                        :title="`Keys Color: rgb(${category.KeysColor})`">
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-600">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} results
            </div>
            <div v-if="totalPages > 1" class="flex items-center space-x-1">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Previous
              </button>

              <template v-for="page in displayedPages" :key="page">
                <span v-if="page === '...'" class="px-3 py-2 text-sm text-slate-500">
                  ...
                </span>
                <button v-else @click="changePage(page)" :class="[
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50',
                  'px-3 py-2 text-sm font-medium border rounded-lg transition-colors'
                ]">
                  {{ page }}
                </button>
              </template>

              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Category Form -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <h2 class="text-xl font-semibold text-slate-900">Add New Category</h2>
          <p class="text-sm text-slate-600 mt-1">Create a new category with custom colors</p>
        </div>

        <form @submit.prevent="saveCategory" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name Field -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Category Name</label>
              <input type="text" v-model="newCategory.Name" required
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter category name">
            </div>

            <!-- Placeholder Field -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Placeholder Text</label>
              <input type="text" v-model="newCategory.Placeholder" required
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter placeholder text">
            </div>
          </div>

          <!-- Color Selection -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-slate-900">Color Scheme</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Background Color -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-slate-700">Background Color</label>
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <input type="color" v-model="colors.backgroundColor" @input="updateBackgroundColor"
                      class="w-12 h-12 rounded-lg border-2 border-slate-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                      RGB: {{ newCategory.BackgroundColor }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Keys Background Color -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-slate-700">Keys Background</label>
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <input type="color" v-model="colors.keysBackgroundColor" @input="updateKeysBackgroundColor"
                      class="w-12 h-12 rounded-lg border-2 border-slate-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                      RGB: {{ newCategory.KeysBackgroundColor }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Keys Color -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-slate-700">Keys Color</label>
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <input type="color" v-model="colors.keysColor" @input="updateKeysColor"
                      class="w-12 h-12 rounded-lg border-2 border-slate-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                      RGB: {{ newCategory.KeysColor }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Color Preview -->
            <div class="bg-slate-50 rounded-lg p-4">
              <h4 class="text-sm font-medium text-slate-700 mb-3">Color Preview</h4>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg shadow-sm border border-white ring-1 ring-black/10"
                  :style="{ backgroundColor: `rgb(${newCategory.BackgroundColor})` }">
                </div>
                <div class="w-8 h-8 rounded-lg shadow-sm border border-white ring-1 ring-black/10"
                  :style="{ backgroundColor: `rgb(${newCategory.KeysBackgroundColor})` }">
                </div>
                <div class="w-8 h-8 rounded-lg shadow-sm border border-white ring-1 ring-black/10"
                  :style="{ backgroundColor: `rgb(${newCategory.KeysColor})` }">
                </div>
                <span class="text-sm text-slate-600">Combined color scheme</span>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4 border-t border-slate-200">
            <button type="submit"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md">
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const API_URL = import.meta.env.VITE_API_URL

const newCategory = ref({
  Id: '',
  Name: '',
  Placeholder: '',
  BackgroundColor: '233,131,255',
  KeysBackgroundColor: '233,218,255',
  KeysColor: '233,131,255'
})

const colors = ref({
  backgroundColor: '#E983FF',
  keysBackgroundColor: '#E9DAFF',
  keysColor: '#E983FF'
})

const totalItems = computed(() => categories.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalItems.value))

const paginatedCategories = computed(() => {
  return categories.value.slice(startIndex.value, endIndex.value)
})

const displayedPages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
      range.push(i)
    }
  }

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleItemsPerPageChange = () => {
  currentPage.value = 1
}

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ?
    `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` :
    null
}

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.split(',').map(Number)
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

const updateBackgroundColor = () => {
  newCategory.value.BackgroundColor = hexToRgb(colors.value.backgroundColor)
}

const updateKeysBackgroundColor = () => {
  newCategory.value.KeysBackgroundColor = hexToRgb(colors.value.keysBackgroundColor)
}

const updateKeysColor = () => {
  newCategory.value.KeysColor = hexToRgb(colors.value.keysColor)
}

watch([() => categories.value.length, itemsPerPage], () => {
  const maxPage = Math.ceil(categories.value.length / itemsPerPage.value)
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage || 1
  }
})

onMounted(async () => {
  colors.value.backgroundColor = rgbToHex(newCategory.value.BackgroundColor)
  colors.value.keysBackgroundColor = rgbToHex(newCategory.value.KeysBackgroundColor)
  colors.value.keysColor = rgbToHex(newCategory.value.KeysColor)

  await fetchCategories();
})

async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/api/categories`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    categories.value = await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    alert('Failed to load categories')
  }
}

const saveCategory = async () => {
  try {
    const maxId = categories.value.length > 0 ? Math.max(...categories.value.map(cat => cat.Id)) : 0;
    console.log('Max ID:', maxId);
    newCategory.value.Id = maxId + 1;

    const response = await fetch(`${API_URL}/api/save-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory.value)
    })

    if (response.status === 201) {
      newCategory.value = {
        Id: '',
        Name: '',
        Placeholder: '',
        BackgroundColor: '233,131,255',
        KeysBackgroundColor: '233,218,255',
        KeysColor: '233,131,255'
      }

      colors.value = {
        backgroundColor: '#E983FF',
        keysBackgroundColor: '#E9DAFF',
        keysColor: '#E983FF'
      }
      await fetchCategories();
      toast.success('Category saved successfully!', {
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    console.error('Error saving category:', error)
    alert('Failed to save category')
  }
}
</script>