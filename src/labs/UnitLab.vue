<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Conversor: escolha um valor e uma unidade, e veja quantos px dá no contexto abaixo.
const valor = ref(1.5)
const unidade = ref('rem')
const unidades = ['rem', 'em', '%', 'vw', 'vh', 'ch']

const fonteRaiz = ref(16) // tamanho da fonte do <html>
const fonteElemento = ref(20) // fonte do próprio elemento (para em e ch)
const larguraPai = ref(600) // largura do pai (para %)

const janela = ref({ w: 0, h: 0 })
function lerJanela() {
  janela.value = { w: window.innerWidth, h: window.innerHeight }
}
onMounted(() => {
  lerJanela()
  window.addEventListener('resize', lerJanela)
})
onBeforeUnmount(() => window.removeEventListener('resize', lerJanela))

const conta = computed(() => {
  const v = Number(valor.value) || 0
  switch (unidade.value) {
    case 'rem':
      return { px: v * fonteRaiz.value, texto: v + ' x ' + fonteRaiz.value + 'px (fonte do html)' }
    case 'em':
      return { px: v * fonteElemento.value, texto: v + ' x ' + fonteElemento.value + 'px (fonte do elemento)' }
    case '%':
      return { px: (v / 100) * larguraPai.value, texto: v + '% de ' + larguraPai.value + 'px (largura do pai)' }
    case 'vw':
      return { px: (v / 100) * janela.value.w, texto: v + '% de ' + janela.value.w + 'px (largura da janela agora)' }
    case 'vh':
      return { px: (v / 100) * janela.value.h, texto: v + '% de ' + janela.value.h + 'px (altura da janela agora)' }
    default:
      // aproximação: 1ch costuma ser cerca de metade da fonte (depende da fonte usada)
      return { px: v * fonteElemento.value * 0.5, texto: v + ' x ' + fonteElemento.value * 0.5 + 'px (aprox. meia fonte)' }
  }
})
const resultado = computed(() => Math.round(conta.value.px * 100) / 100)
</script>

<template>
  <div class="lab">
    <h3>Laboratório: conversor de unidades para px</h3>

    <div class="linha">
      <label>
        Valor
        <input v-model="valor" class="campo" type="number" step="0.25" />
      </label>
      <label>
        Unidade
        <select v-model="unidade" class="campo">
          <option v-for="u in unidades" :key="u" :value="u">{{ u }}</option>
        </select>
      </label>
    </div>

    <div class="contexto">
      <label>
        Fonte do html (px)
        <input v-model.number="fonteRaiz" class="campo" type="number" min="8" max="40" />
      </label>
      <label>
        Fonte do elemento (px)
        <input v-model.number="fonteElemento" class="campo" type="number" min="8" max="60" />
      </label>
      <label>
        Largura do pai (px)
        <input v-model.number="larguraPai" class="campo" type="number" min="100" max="2000" />
      </label>
    </div>

    <p class="resultado">
      {{ valor }}{{ unidade }} = <strong>{{ resultado }}px</strong>
    </p>
    <p class="conta-txt">Conta: {{ conta.texto }}</p>
    <p class="nota">
      Dica: mude "Fonte do html" para 24 (como quem aumentou a fonte no navegador) e veja o rem crescer. Os px não mudariam.
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
.linha,
.contexto {
  display: grid;
  gap: var(--esp-3);
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
}
.resultado {
  font-family: var(--fonte-codigo);
  font-size: var(--fs-2);
  margin: 0;
  padding: var(--esp-3);
  background: var(--marca);
  border: var(--borda);
}
.conta-txt {
  margin: 0;
  font-family: var(--fonte-codigo);
  font-size: var(--fs-0);
}
.nota {
  margin: 0;
}
</style>
