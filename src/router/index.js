import {createRouter, createWebHistory} from "vue-router";


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },

  {
    path: '/markdown-preview',
    name: 'markdown-preview',
    component: () => import(/* webpackChunkName: "MarkdownPreview" */ '../views/MarkdownPreview.vue')
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router
