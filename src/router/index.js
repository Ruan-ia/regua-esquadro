import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { sections } from '@/data/sections.js'

// Hash history (#/rota): funciona em GitHub Pages, Netlify e Vercel sem configurar redirecionamento.
// Cada seção é importada sob demanda (lazy loading): o navegador só baixa a tela quando ela é aberta.
const routes = [
  { path: '/', name: 'inicio', component: HomeView },
  { path: '/por-que-responsividade', name: 'viewport', component: () => import('@/views/ViewportView.vue') },
  { path: '/unidades-css', name: 'unidades', component: () => import('@/views/UnidadesView.vue') },
  { path: '/flexbox-e-grid', name: 'layout', component: () => import('@/views/LayoutView.vue') },
  { path: '/imagens-responsivas', name: 'imagens', component: () => import('@/views/ImagensView.vue') },
  { path: '/boas-praticas-vue', name: 'vue', component: () => import('@/views/BoasPraticasView.vue') },
  { path: '/desafio', name: 'desafio', component: () => import('@/views/DesafioView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  const secao = sections.find((s) => s.path === to.path)
  document.title = secao ? secao.title + ' | Régua & Esquadro' : 'Régua & Esquadro'
})

export default router
