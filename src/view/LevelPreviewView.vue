<template>
    <div class="container max-w-6xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem trước Level
        </h2>

        <div v-if="levels.length" class="space-y-8">
            <div v-for="level in levels" :key="level.Id" class="bg-white rounded-lg shadow-md overflow-hidden">
                <!-- Level Header - Sử dụng CategoryBackgroundColor làm màu nền -->
                <div class="px-6 py-4" :style="{
                    backgroundColor: `rgba(${level.CategoryBackgroundColor}, 0.1)`,
                    borderBottom: `2px solid rgb(${level.CategoryBackgroundColor})`
                }">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <!-- Số level sử dụng CategoryBackgroundColor -->
                            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                                :style="{ backgroundColor: `rgb(${level.CategoryBackgroundColor})` }">
                                {{ level.DisplayOrder }}
                            </div>
                        </div>
                        <h3 class="text-xl font-semibold" :style="{ color: `rgb(${level.CategoryBackgroundColor})` }">
                            Level {{ level.DisplayOrder }}
                        </h3>
                    </div>
                </div>

                <!-- Level Content -->
                <div class="px-6 py-4">
                    <!-- Category Section -->
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Danh mục</h4>
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :style="{
                            backgroundColor: `rgb(${level.CategoryBackgroundColor})`,
                            color: 'white'
                        }">
                            {{ level.CategoryName }}
                        </div>
                    </div>

                    <!-- Phrase Section - Sử dụng CategoryKeysBackgroundColor làm màu nền -->
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Cụm từ</h4>
                        <div class="rounded-lg p-4"
                            :style="{ backgroundColor: `rgba(${level.CategoryKeysBackgroundColor}, 0.15)` }">
                            <p class="text-gray-900 font-medium mb-2">{{ level.FullPhrase }}</p>
                            <p class="font-mono" :style="{ color: `rgb(${level.CategoryBackgroundColor})` }">
                                {{ level.PhraseSymbolList }}
                            </p>
                        </div>
                    </div>

                    <!-- Words Section - Sử dụng CategoryKeysBackgroundColor và CategoryKeysColor -->
                    <div>
                        <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Từ vựng</h4>
                        <div class="grid gap-4">
                            <div v-for="word in level.Words" :key="word.WordSymbolList"
                                class="rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5" :style="{
                                    backgroundColor: `rgba(${level.CategoryKeysBackgroundColor}, 0.1)`,
                                    border: `1px solid rgba(${level.CategoryKeysBackgroundColor}, 0.2)`
                                }">
                                <div class="flex justify-between items-start">
                                    <div class="mr-4">
                                        <h5 class="font-mono font-bold mb-1"
                                            :style="{ color: `rgb(${level.CategoryKeysColor})` }">
                                            {{ word.WordSymbolList }}
                                        </h5>
                                        <p class="text-gray-600">{{ word.Description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Chưa có level nào</h3>
            <p class="mt-1 text-gray-500">Hiện tại chưa có level nào được tạo.</p>
        </div>

        <div v-if="pagination.totalPages >= 1" class="mt-8">
            <div class="flex items-center justify-between">
                <button @click="changePage(pagination.currentPage - 1)" :disabled="!pagination.hasPrevious"
                    class="relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Trang trước
                </button>

                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                        Trang {{ pagination.currentPage }} / {{ pagination.totalPages }}
                    </span>
                </span>

                <button @click="changePage(pagination.currentPage + 1)" :disabled="!pagination.hasNext"
                    class="relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Trang sau
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Sort Button -->
        <div class="mt-8 text-center">
            <button @click="sortLevels"
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                </svg>
                Sắp xếp Level
            </button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'

const API_URL = import.meta.env.VITE_API_URL

const toast = useToast()
const levels = ref([])
const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false
})

const fetchLevels = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}/api/ordered-levels`, {
            params: {
                page: page,
                pageSize: pagination.value.pageSize
            }
        })

        levels.value = response.data.items
        pagination.value.currentPage = response.data.pagination.currentPage
        pagination.value.pageSize = response.data.pagination.pageSize
        pagination.value.totalItems = response.data.pagination.totalItems
        pagination.value.totalPages = response.data.pagination.totalPages
        console.log('pagination:', pagination.value.totalPages)
        pagination.value.hasNext = response.data.pagination.hasNext
        pagination.value.hasPrevious = response.data.pagination.hasPrevious
    } catch (error) {
        toast.error('Lỗi khi tải danh sách level. Vui lòng thử lại sau.', {
            position: 'top-right',
            duration: 3000
        })
        console.error('Lỗi khi tải danh sách level:', error)
    }
}

const sortLevels = async () => {
    try {
        const respoonse = await axios.post(`${API_URL}/api/update-level-order`, {
            levels: levels.value.map(level => ({
                id: level.Id,
                displayOrder: level.DisplayOrder
            }))
        })
        if (respoonse.status === 200) {
            toast.success('Sắp xếp level thành công!', {
                position: 'top-right',
                duration: 3000
            })
            await fetchLevels(pagination.value.currentPage)
        } else {
            toast.error('Không thể sắp xếp level. Vui lòng thử lại sau.', {
                position: 'top-right',
                duration: 3000
            })
            console.error('Không thể sắp xếp level:', respoonse.data)
        }
    } catch (error) {
        toast.error('Lỗi khi sắp xếp level. Vui lòng thử lại sau.', {
            position: 'top-right',
            duration: 3000
        })
        console.error('Lỗi khi sắp xếp level:', error)
    }
}

const changePage = async (newPage) => {
    await fetchLevels(newPage)
}

onMounted(async () => {
    await fetchLevels()
})
</script>