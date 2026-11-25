<script setup>
import { ref, computed } from 'vue'

// Laboratório de Flexbox: troque as propriedades e veja os itens se reorganizarem.
const justify = ref('flex-start')
const align = ref('stretch')
const quebra = ref(false)
const gap = ref(0.5)

const estilo = computed(() => ({
  justifyContent: justify.value,
  alignItems: align.value,
  flexWrap: quebra.value ? 'wrap' : 'nowrap',
  gap: gap.value + 'rem',
}))
const alturas = [3, 5, 4, 6, 3.5]
</script>

<template>
  <div class="lab">
    <h3>Laboratório: Flexbox</h3>

    <div class="controles">
      <label>
        justify-content
        <select v-model="justify" class="campo">
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
          <option>space-between</option>
          <option>space-around</option>
        </select>
      </label>
      <label>
        align-items
        <select v-model="align" class="campo">
          <option>stretch</option>
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
        </select>
      </label>
      <label>
        gap: {{ gap }}rem
        <input v-model.number="gap" class="range" type="range" min="0" max="2" step="0.25" />
      </label>
      <label class="check">
        <input v-model="quebra" type="checkbox" />
        flex-wrap: wrap
      </label>
    </div>

    <div class="caixa-flex" :style="estilo">
      <div v-for="(h, i) in alturas" :key="i" class="item" :style="{ minHeight: h + 'rem' }">{{ i + 1 }}</div>
    </div>
  </div>
</template>

<style scoped>
label {
  display: grid;
  gap: var(--esp-1);
  font-size: var(--fs-0);
  font-weight: 600;
  min-width: 0;
}
.controles {
  display: grid;
  gap: var(--esp-3);
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  align-items: end;
}
.check {
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  min-height: 2.75rem;
}
.check input {
  width: 1.5rem;
  height: 1.5rem;
  accent-color: var(--cianotipo);
}
.caixa-flex {
  display: flex;
  overflow-x: auto; /* sem wrap, os itens rolam dentro da caixa e não vazam da página */
  min-height: 8rem;
  padding: var(--esp-2);
  background: var(--papel);
  border: 2px dashed var(--cianotipo);
}
.item {
  flex: 0 0 5.5rem;
  display: grid;
  place-items: center;
  font-family: var(--fonte-codigo);
  font-weight: 700;
  background: var(--marca);
  border: var(--borda);
}
</style>
