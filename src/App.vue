<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Mobile menu button-->
          <div class="flex sm:hidden">
            <button type="button" @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <!-- Desktop menu -->
          <div class="hidden sm:block">
            <div class="flex space-x-4">
              <router-link to="/level-editor"
                :class="[$route.path === '/level-editor' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium']">
                Level Editor
              </router-link>
              <router-link to="/category"
                :class="[$route.path === '/category' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium']">
                Category
              </router-link>
              <router-link to="/level-preview"
                :class="[$route.path === '/level-preview' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium']">
                Level Preview
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div class="sm:hidden" v-show="mobileMenuOpen">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link to="/level-editor"
            :class="[$route.path === '/level-editor' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium']">
            Level Editor
          </router-link>
          <router-link to="/category"
            :class="[$route.path === '/category' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium']">
            Category
          </router-link>
          <router-link to="/level-preview"
            :class="[$route.path === '/level-preview' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium']">
            Level Preview
          </router-link>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>