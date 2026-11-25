<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CodeBlock from '@/components/CodeBlock.vue'
import { sections } from '@/data/sections.js'

// Estrutura comum das cinco seções: explicação, código, laboratório, pergunta-guia e fontes
const props = defineProps({
  numero: { type: String, required: true },
  titulo: { type: String, required: true },
  pergunta: { type: String, required: true },
  codigos: { type: Array, required: true },
  fontes: { type: Array, required: true },
})

const route = useRoute()
const indice = computed(() => sections.findIndex((s) => s.path === route.path))
const anterior = computed(() => (indice.value > 0 ? sections[indice.value - 1] : null))
const proxima = computed(() => (indice.value < sections.length - 1 ? sections[indice.value + 1] : null))
</script>

<template>
  <article>
    <header class="cabecalho">
      <div class="container">
        <p class="numero">Seção {{ props.numero }}</p>
        <h1>{{ props.titulo }}</h1>
      </div>
    </header>

    <div class="container corpo">
      <section>
        <h2>Explicação curta</h2>
        <slot name="explicacao" />
      </section>

      <section>
        <h2>Código comentado</h2>
        <CodeBlock v-for="c in props.codigos" :key="c.titulo" :titulo="c.titulo" :texto="c.texto" />
      </section>

      <section v-if="$slots.laboratorio">
        <h2>Laboratório</h2>
        <slot name="laboratorio" />
      </section>

      <section>
        <h2>Pergunta-guia</h2>
        <blockquote class="pergunta">{{ props.pergunta }}</blockquote>
        <div class="resposta">
          <slot name="resposta" />
        </div>
      </section>

      <section>
        <h2>Fontes consultadas</h2>
        <ul>
          <li v-for="f in props.fontes" :key="f.url">
            <a :href="f.url" target="_blank" rel="noopener">{{ f.nome }}</a>
          </li>
        </ul>
      </section>

      <nav class="pager" aria-label="Navegação entre seções">
        <RouterLink v-if="anterior" :to="anterior.path" class="pager__link">
          <small>Anterior</small>{{ anterior.title }}
        </RouterLink>
        <RouterLink v-if="proxima" :to="proxima.path" class="pager__link pager__link--prox">
          <small>Próxima</small>{{ proxima.title }}
        </RouterLink>
      </nav>
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
.numero {
  display: inline-block;
  margin: 0 0 var(--esp-2);
  padding: 0.1rem 0.6rem;
  background: var(--marca);
  color: var(--tinta);
  font-family: var(--fonte-codigo);
  font-size: var(--fs-0);
  font-weight: 700;
}
.corpo section {
  margin-bottom: var(--esp-8);
}
.pergunta {
  margin: 0;
  padding: var(--esp-3) var(--esp-4);
  border-left: 0.5rem solid var(--giz);
  background: var(--folha);
  font-weight: 600;
}
.pager {
  display: grid;
  gap: var(--esp-3);
}
.pager__link {
  display: block;
  padding: var(--esp-3) var(--esp-4);
  border: var(--borda);
  background: var(--folha);
  color: var(--tinta);
  text-decoration: none;
  font-weight: 700;
}
.pager__link:hover {
  background: var(--marca);
}
.pager__link small {
  display: block;
  font-weight: 400;
  color: var(--tinta-suave);
}

@media (min-width: 40rem) {
  .pager {
    grid-template-columns: 1fr 1fr;
  }
  .pager__link--prox {
    grid-column: 2;
    text-align: right;
  }
}
</style>
