<template>
    <div class="container">
      <h2 class="mb-4">Category Management</h2>
  
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Categories</h5>
          <div>
            <select class="form-select form-select-sm" v-model="itemsPerPage" @change="handleItemsPerPageChange">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Placeholder</th>
                <th>Background Color</th>
                <th>Keys Background</th>
                <th>Keys Color</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in paginatedCategories" :key="category.Id">
                <td>{{ category.Id }}</td>
                <td>{{ category.Name }}</td>
                <td>{{ category.Placeholder }}</td>
                <td>
                  <div class="color-box" :style="{ backgroundColor: `rgb(${category.BackgroundColor})` }"></div>
                </td>
                <td>
                  <div class="color-box" :style="{ backgroundColor: `rgb(${category.KeysBackgroundColor})` }"></div>
                </td>
                <td>
                  <div class="color-box" :style="{ backgroundColor: `rgb(${category.KeysColor})` }"></div>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Pagination -->
          <nav v-if="totalPages > 1">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
              </li>
              <li v-for="page in displayedPages" 
                  :key="page" 
                  class="page-item" 
                  :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
            <div class="text-center mt-2">
              <small>Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ totalItems }} items</small>
            </div>
          </nav>
        </div>
      </div>
  
      <!-- Add New Category Form -->
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Add New Category</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveCategory">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" v-model="newCategory.Name" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Placeholder</label>
              <input type="text" class="form-control" v-model="newCategory.Placeholder" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Background Color</label>
              <div class="d-flex align-items-center gap-2">
                <input type="color" class="form-control form-control-color" 
                       v-model="colors.backgroundColor"
                       @input="updateBackgroundColor">
                <span>{{ newCategory.BackgroundColor }}</span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Keys Background Color</label>
              <div class="d-flex align-items-center gap-2">
                <input type="color" class="form-control form-control-color" 
                       v-model="colors.keysBackgroundColor"
                       @input="updateKeysBackgroundColor">
                <span>{{ newCategory.KeysBackgroundColor }}</span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Keys Color</label>
              <div class="d-flex align-items-center gap-2">
                <input type="color" class="form-control form-control-color" 
                       v-model="colors.keysColor"
                       @input="updateKeysColor">
                <span>{{ newCategory.KeysColor }}</span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save Category</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  
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
  
      if (!response.status === 201) {
        throw new Error('Failed to save category')
      }
  
      const savedCategory = await response.json()
      categories.value.push(savedCategory)
  
      // Reset form
      newCategory.value = {
        Id: '',
        Name: '',
        Placeholder: '',
        BackgroundColor: '233,131,255',
        KeysBackgroundColor: '233,218,255',
        KeysColor: '233,131,255'
      }
  
      // Reset color pickers
      colors.value = {
        backgroundColor: '#E983FF',
        keysBackgroundColor: '#E9DAFF',
        keysColor: '#E983FF'
      }
      await fetchCategories();
      alert('Category saved successfully!')
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    }
  }
  </script>
  
  <style scoped>
  .color-box {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-control-color {
    width: 100px;
  }
  
  .pagination {
    margin-bottom: 0;
  }
  
  .page-link {
    cursor: pointer;
  }
  </style>