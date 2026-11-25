<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useViewportStore } from '@/stores/viewport.js'

// Laboratório fixo: mostra a largura atual da janela e o breakpoint ativo.
// Redimensione a janela (ou gire o celular) e veja os números mudarem.
const viewport = useViewportStore()
onMounted(() => viewport.iniciar())
onBeforeUnmount(() => viewport.parar())
</script>

<template>
  <div class="indicador" role="status" aria-label="Largura atual da janela">
    <span class="indicador__px">{{ viewport.largura }}px</span>
    <span class="indicador__bp">{{ viewport.breakpoint }}</span>
  </div>
</template>

<style scoped>
.indicador {
  position: fixed;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 20;
  display: flex;
  font-family: var(--fonte-codigo);
  font-size: var(--fs-0);
  border: var(--borda);
  box-shadow: 0.2rem 0.2rem 0 var(--tinta);
}
.indicador__px {
  background: var(--folha);
  padding: 0.25rem 0.5rem;
}
.indicador__bp {
  background: var(--marca);
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-left: var(--borda);
}
</style>
