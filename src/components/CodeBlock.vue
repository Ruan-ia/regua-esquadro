<script setup>
defineProps({
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
})
</script>

<template>
  <figure class="codigo">
    <figcaption>{{ titulo }}</figcaption>
    <pre><code>{{ texto }}</code></pre>
  </figure>
</template>

<style scoped>
.codigo {
  margin: 0 0 var(--esp-4);
  border: var(--borda);
  background: var(--tinta);
  color: #e9f1f7;
  min-width: 0;
}
figcaption {
  font-family: var(--fonte-codigo);
  font-size: var(--fs-0);
  background: var(--marca);
  color: var(--tinta);
  padding: 0.25rem var(--esp-3);
  font-weight: 700;
}
pre {
  margin: 0;
  padding: var(--esp-3);
  overflow-x: auto; /* a rolagem fica DENTRO do bloco, nunca na página */
  font-size: 0.8125rem;
  line-height: 1.5;
}
pre code {
  background: none;
  border: 0;
  padding: 0;
  font-size: inherit;
  white-space: pre;
}
</style>
