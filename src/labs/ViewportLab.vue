<script setup>
import { ref, computed, onMounted } from 'vue'

// Simulação: um "celular" de 224px de tela. Ligue e desligue a meta viewport.
const comMeta = ref(false)
const tela = ref(null)
const larguraTela = ref(224)
const LARGURA_VIRTUAL = 980 // largura que o celular finge ter sem a meta tag

onMounted(() => {
  larguraTela.value = tela.value.clientWidth
})

const larguraLayout = computed(() => (comMeta.value ? larguraTela.value : LARGURA_VIRTUAL))
const escala = computed(() => larguraTela.value / larguraLayout.value)
// a media query "de celular" do site de mentira: max-width: 600px
const mediaQueryAtiva = computed(() => larguraLayout.value <= 600)
</script>

<template>
  <div class="lab">
    <h3>Laboratório: com e sem meta viewport</h3>
    <label class="opcao">
      <input v-model="comMeta" type="checkbox" />
      Meta tag <code>width=device-width</code> ligada
    </label>

    <div class="aparelho">
      <div ref="tela" class="tela">
        <div
          class="pagina"
          :class="{ estreita: mediaQueryAtiva }"
          :style="{ width: larguraLayout + 'px', transform: 'scale(' + escala + ')' }"
        >
          <div class="p-topo">Meu site</div>
          <div class="p-blocos">
            <div class="bloco">Notícia A</div>
            <div class="bloco">Notícia B</div>
          </div>
        </div>
      </div>
    </div>

    <p class="leitura">
      Largura do layout: <strong>{{ larguraLayout }}px</strong>. Media query
      <code>(max-width: 600px)</code>:
      <strong :class="mediaQueryAtiva ? 'sim' : 'nao'">{{ mediaQueryAtiva ? 'ativa' : 'não ativa' }}</strong>.
    </p>
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
.aparelho {
  width: 15rem; /* 240px: 224px de tela + bordas */
  max-width: 100%;
  margin-inline: auto;
  border: 0.5rem solid var(--tinta);
  border-radius: 1.5rem;
  background: var(--tinta);
}
.tela {
  height: 18rem;
  overflow: hidden;
  background: var(--folha);
  border-radius: 0.75rem;
}
.pagina {
  transform-origin: top left;
  background: var(--papel);
  min-height: 24rem;
}
.p-topo {
  background: var(--tinta);
  color: var(--folha);
  padding: var(--esp-3);
  font-weight: 700;
}
.p-blocos {
  display: flex;
  gap: var(--esp-4);
  padding: var(--esp-4);
}
.bloco {
  flex: 1;
  background: var(--marca);
  border: var(--borda);
  padding: var(--esp-4);
  font-weight: 700;
}
.estreita .p-blocos {
  flex-direction: column;
}
.leitura {
  margin: 0;
}
.sim {
  color: var(--certo);
}
.nao {
  color: var(--giz);
}
</style>
