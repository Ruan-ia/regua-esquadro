import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Pinia: guarda a largura da janela para qualquer componente usar (o indicador fixo usa isto)
export const useViewportStore = defineStore('viewport', () => {
  const largura = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Mesmos pontos de quebra do CSS: 40rem, 48rem e 64rem (com 1rem = 16px)
  const breakpoint = computed(() => {
    if (largura.value >= 1024) return 'lg'
    if (largura.value >= 768) return 'md'
    if (largura.value >= 640) return 'sm'
    return 'base'
  })

  function atualizar() {
    largura.value = window.innerWidth
  }
  function iniciar() {
    atualizar()
    window.addEventListener('resize', atualizar)
  }
  function parar() {
    window.removeEventListener('resize', atualizar)
  }

  return { largura, breakpoint, iniciar, parar }
})
