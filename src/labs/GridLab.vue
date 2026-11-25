<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

// Laboratório de Grid: mexa na largura do contêiner e veja o NAVEGADOR decidir quantas colunas existem.
const largura = ref(480)
const minRem = ref(14)
const gapRem = ref(1)

const grade = ref(null)
const colunas = ref(1)
const larguraReal = ref(0)
let observador

function medir() {
  if (!grade.value) return
  // lemos o que o navegador calculou de verdade, não a nossa fórmula
  colunas.value = getComputedStyle(grade.value).gridTemplateColumns.split(' ').length
  larguraReal.value = Math.round(grade.value.clientWidth)
}

onMounted(() => {
  observador = new ResizeObserver(medir)
  observador.observe(grade.value)
  medir()
})
onBeforeUnmount(() => observador && observador.disconnect())
watch([minRem, gapRem, largura], () => nextTick(medir))

const estilo = computed(() => ({
  width: largura.value + 'px',
  gap: gapRem.value + 'rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(' + minRem.value + 'rem, 1fr))',
}))

// Fórmula (1rem = 16px): n = floor((largura + gap) / (minimo + gap))
const formula = computed(() => {
  const min = minRem.value * 16
  const gap = gapRem.value * 16
  return Math.max(1, Math.floor((larguraReal.value + gap) / (min + gap)))
})
const cartoes = [1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
  <div class="lab">
    <h3>Laboratório: auto-fit com minmax</h3>

    <label>
      Largura do contêiner: <strong>{{ largura }}px</strong>
      <input v-model.number="largura" class="range" type="range" min="200" max="960" step="1" />
    </label>
    <div class="ajustes">
      <label>
        Mínimo do card (rem)
        <input v-model.number="minRem" class="campo" type="number" min="10" max="20" step="1" />
      </label>
      <label>
        Gap (rem)
        <input v-model.number="gapRem" class="campo" type="number" min="0" max="2" step="0.25" />
      </label>
    </div>

    <div class="faixa">
      <div ref="grade" class="grade" :style="estilo">
        <div v-for="n in cartoes" :key="n" class="card">{{ n }}</div>
      </div>
    </div>

    <p class="leitura">
      Largura real: <strong>{{ larguraReal }}px</strong>. Colunas no navegador: <strong>{{ colunas }}</strong>. Pela fórmula:
      <strong>{{ formula }}</strong>.
    </p>
    <p class="nota">
      No celular, a largura do contêiner fica limitada pela tela (max-width: 100%). Os valores iniciais são mínimo 14rem e gap 1rem.
    </p>
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
.ajustes {
  display: grid;
  gap: var(--esp-3);
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
}
.faixa {
  padding: var(--esp-2);
  background: var(--papel);
  border: 2px dashed var(--cianotipo);
}
.grade {
  display: grid;
  max-width: 100%;
  outline: 2px solid var(--cianotipo);
}
.card {
  min-width: 0;
  padding: var(--esp-4) var(--esp-2);
  text-align: center;
  font-family: var(--fonte-codigo);
  font-weight: 700;
  background: var(--marca);
  border: var(--borda);
}
.leitura,
.nota {
  margin: 0;
}
</style>
