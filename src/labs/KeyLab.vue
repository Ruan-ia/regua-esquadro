<script setup>
import { ref, watch } from 'vue'

// Laboratório do :key. Os campos de texto NÃO usam v-model: o texto digitado vive só no elemento da página (DOM).
// Passo a passo: digite no campo do 2º animal, clique em "Remover o primeiro" e veja onde o texto foi parar.
const inicial = () => [
  { id: 1, nome: 'Capivara' },
  { id: 2, nome: 'Tamanduá' },
  { id: 3, nome: 'Arara' },
  { id: 4, nome: 'Lobo-guará' },
]
const animais = ref(inicial())
const usarKey = ref(false)
const versao = ref(0)

function removerPrimeiro() {
  animais.value.shift()
}
function reiniciar() {
  animais.value = inicial()
  versao.value++ // recria a lista do zero, apagando o que foi digitado
}
watch(usarKey, reiniciar)
</script>

<template>
  <div class="lab">
    <h3>Laboratório: v-for com e sem :key</h3>

    <label class="opcao">
      <input v-model="usarKey" type="checkbox" />
      Usar <code>:key="animal.id"</code>
    </label>

    <ul :key="versao" class="lista">
      <!-- quando usarKey é falso, a key vale undefined: é como escrever o v-for sem :key -->
      <li v-for="animal in animais" :key="usarKey ? animal.id : undefined" class="linha">
        <strong>{{ animal.nome }}</strong>
        <input class="campo" type="text" :aria-label="'Anotação sobre ' + animal.nome" placeholder="digite aqui" />
      </li>
    </ul>

    <div class="botoes">
      <button class="btn" type="button" :disabled="animais.length === 0" @click="removerPrimeiro">Remover o primeiro</button>
      <button class="btn btn--claro" type="button" @click="reiniciar">Reiniciar</button>
    </div>
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
.linha .campo {
  width: 100%;
  box-sizing: border-box; /* o campo ocupa só a largura do item, sem vazar em telas de 320px */
}
.lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--esp-2);
}
.linha {
  display: grid;
  gap: var(--esp-1);
  padding: var(--esp-2) var(--esp-3);
  background: var(--papel);
  border: var(--borda);
}
.botoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (min-width: 40rem) {
  .linha {
    grid-template-columns: 9rem 1fr;
    align-items: center;
  }
}
</style>
