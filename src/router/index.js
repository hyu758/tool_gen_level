import { createRouter, createWebHistory } from 'vue-router'
import LevelEditorView from '../view/LevelEditorView.vue'
import CategoryView from '../view/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/level-editor'
    },
    {
      path: '/level-editor',
      name: 'level-editor',
      component: LevelEditorView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    }
  ]
})

export default router