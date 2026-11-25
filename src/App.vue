<script setup>
import NavBar from '@/components/NavBar.vue'
import WidthIndicator from '@/components/WidthIndicator.vue'
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <footer class="rodape">
    <div class="container">
      <p>Régua &amp; Esquadro, projeto de revisão. Dupla: Barbara Yasmin Pimenta Dos Santos Tobias e Ruan Monteiro Brito.</p>
    </div>
  </footer>
  <WidthIndicator />
</template>

<style scoped>
.rodape {
  margin-top: var(--esp-12);
  padding-block: var(--esp-6);
  background: var(--tinta);
  color: var(--folha);
  font-size: var(--fs-0);
}
.rodape p {
  margin: 0;
}
</style>
