<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

// Laboratório: a imagem "chega" 2 segundos depois do texto.
// Compare o texto de baixo COM e SEM width/height e veja quantos px ele é empurrado.
const svg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'>" +
  "<rect width='800' height='450' fill='#1a5fa8'/><circle cx='620' cy='120' r='60' fill='#ffd23f'/>" +
  "<path d='M0 450 L250 200 L420 350 L560 240 L800 450 Z' fill='#0d2b45'/></svg>"
const src = 'data:image/svg+xml,' + encodeURIComponent(svg)

const comTamanho = ref(false)
const carregada = ref(false)
const salto = ref(null)
const texto = ref(null)
let timer

function carregar() {
  clearTimeout(timer)
  carregada.value = false
  salto.value = null
  nextTick(() => {
    const antes = texto.value.offsetTop
    timer = setTimeout(() => {
      carregada.value = true
      nextTick(() => {
        salto.value = texto.value.offsetTop - antes // quanto o texto andou
      })
    }, 2000)
  })
}

watch(comTamanho, carregar)
onMounted(carregar)
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="lab">
    <h3>Laboratório: imagem atrasada e o texto que pula</h3>

    <label class="opcao">
      <input v-model="comTamanho" type="checkbox" />
      Imagem com <code>width="800" height="450"</code>
    </label>

    <div class="palco">
      <!-- SEM width/height: o elemento só ocupa espaço quando a imagem chega (simulação do que o navegador faz) -->
      <img v-if="!comTamanho && carregada" key="sem" class="foto" :src="src" alt="Montanhas desenhadas em azul e amarelo" />

      <!-- COM width/height: o navegador já sabe a proporção 16:9 e reserva a caixa antes de baixar.
           A regra .reserva:not([src]) no CSS imita essa reserva enquanto não há arquivo. -->
      <img
        v-else-if="comTamanho"
        key="com"
        class="foto reserva"
        :src="carregada ? src : undefined"
        width="800"
        height="450"
        alt="Montanhas desenhadas em azul e amarelo"
      />

      <p ref="texto" class="texto">
        Este parágrafo está logo abaixo da imagem. Repare se ele fica parado ou se é empurrado quando a imagem aparece.
      </p>
    </div>

    <p class="leitura">
      <span v-if="!carregada">Aguardando a imagem (2 segundos)...</span>
      <span v-else>
        O texto se moveu <strong :class="salto ? 'ruim' : 'bom'">{{ salto }}px</strong>.
        {{ salto ? 'Isso é um layout shift (CLS alto).' : 'Nenhum pulo: CLS zero.' }}
      </span>
    </p>
    <button class="btn btn--claro" type="button" @click="carregar">Recarregar a imagem</button>
  </div>
</template>

<style scoped>
.opcao {
  display: flex;
  gap: var(--esp-2);
  align-items: center;
  min-height: 2.75rem;
}
.opcao input {
  width: 1.5rem;
  height: 1.5rem;
  accent-color: var(--cianotipo);
}
.palco {
  position: relative; /* offsetTop do texto é medido a partir daqui */
  padding: var(--esp-3);
  background: var(--papel);
  border: 2px dashed var(--cianotipo);
}
.foto {
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: var(--esp-3);
}
.reserva:not([src]) {
  width: 100%;
  max-width: 50rem;
  aspect-ratio: 800 / 450;
  background: var(--folha);
  border: 2px dashed var(--tinta-suave);
}
.texto {
  margin: 0;
}
.leitura {
  margin: 0;
}
.ruim {
  color: var(--giz);
}
.bom {
  color: var(--certo);
}
</style>
