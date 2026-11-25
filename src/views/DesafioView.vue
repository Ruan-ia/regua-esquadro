<script setup>
import { ref } from 'vue'

// Desafio: pergunta criada pela dupla, respondida com o laboratório de Grid da Seção 3.
// Combine com a dupla e troque a pergunta e a resposta correta se quiserem.
const RESPOSTA_CERTA = 704
const palpite = ref('')
const resultado = ref('')
const dica = ref(false)

function verificar() {
  const n = Number(palpite.value)
  if (!palpite.value) resultado.value = 'vazio'
  else resultado.value = n === RESPOSTA_CERTA ? 'certo' : 'errado'
}
</script>

<template>
  <article>
    <header class="cabecalho">
      <div class="container">
        <h1>Desafio</h1>
      </div>
    </header>

    <div class="container corpo">
      <p>Esta pergunta só se responde usando o próprio guia.</p>

      <blockquote class="pergunta">
        No laboratório de Grid da <RouterLink to="/flexbox-e-grid">Seção 3</RouterLink>, com os valores iniciais (mínimo de
        14rem e gap de 1rem), a partir de qual largura do contêiner, em px, aparecem 3 colunas?
      </blockquote>

      <form class="caixa form" @submit.prevent="verificar">
        <label>
          Sua resposta (px)
          <input v-model="palpite" class="campo" type="number" inputmode="numeric" />
        </label>
        <div class="botoes">
          <button class="btn" type="submit">Verificar</button>
          <button class="btn btn--claro" type="button" @click="dica = !dica">{{ dica ? 'Esconder dica' : 'Ver dica' }}</button>
        </div>
      </form>

      <p v-if="dica" class="nota">
        Arraste o controle deslizante do laboratório e observe quando o número de colunas muda para 3. Depois confira com a
        fórmula da pergunta-guia 3.
      </p>

      <p v-if="resultado === 'vazio'" class="aviso">Digite um número primeiro.</p>
      <div v-else-if="resultado === 'certo'" class="resposta">
        <p><strong>Correto!</strong> 3 x 224 + 2 x 16 = 672 + 32 = {{ RESPOSTA_CERTA }}px.</p>
      </div>
      <p v-else-if="resultado === 'errado'" class="aviso">
        Ainda não. Lembre: cada coluna tem no mínimo 14rem (224px) e há um gap entre cada par de colunas.
      </p>
    </div>
  </article>
</template>

<style scoped>
.cabecalho {
  background: var(--tinta);
  color: var(--folha);
  padding-block: var(--esp-8);
  margin-bottom: var(--esp-6);
}
.cabecalho h1 {
  margin: 0;
}
.pergunta {
  margin: 0 0 var(--esp-6);
  padding: var(--esp-3) var(--esp-4);
  border-left: 0.5rem solid var(--giz);
  background: var(--folha);
  font-weight: 600;
}
.form {
  display: grid;
  gap: var(--esp-3);
  max-width: 24rem;
  margin-bottom: var(--esp-4);
}
label {
  display: grid;
  gap: var(--esp-1);
  font-weight: 600;
}
.botoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
}
.aviso {
  padding: var(--esp-2) var(--esp-4);
  border-left: 0.375rem solid var(--giz);
  background: var(--folha);
}
</style>
