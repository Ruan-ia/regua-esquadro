<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { sections } from '@/data/sections.js'

const aberto = ref(false)
const route = useRoute()

// fecha o menu do celular ao trocar de página
watch(() => route.path, () => {
  aberto.value = false
})
</script>

<template>
  <header class="topo">
    <div class="container topo__linha">
      <RouterLink to="/" class="marca">Régua &amp; Esquadro</RouterLink>

      <!-- No celular o menu vira este botão; a partir de 48rem ele some -->
      <button
        class="menu-btn btn btn--claro"
        type="button"
        :aria-expanded="aberto"
        aria-controls="menu-principal"
        @click="aberto = !aberto"
      >
        {{ aberto ? 'Fechar' : 'Menu' }}
      </button>

      <nav id="menu-principal" class="menu" :class="{ 'menu--aberto': aberto }" aria-label="Seções do guia">
        <ul>
          <li v-for="s in sections" :key="s.path">
            <RouterLink :to="s.path">{{ s.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.topo {
  background: var(--folha);
  border-bottom: var(--borda);
  position: sticky;
  top: 0;
  z-index: 10;
}
.topo__linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--esp-2);
  padding-block: var(--esp-2);
}
.marca {
  font-family: var(--fonte-titulo);
  font-size: var(--fs-2);
  font-weight: 700;
  color: var(--tinta);
  text-decoration: none;
  background: linear-gradient(transparent 60%, var(--marca) 60%);
}

/* celular: menu escondido, aparece em coluna quando aberto */
.menu {
  display: none;
  flex-basis: 100%;
}
.menu--aberto {
  display: block;
}
.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.menu a {
  display: block;
  padding: 0.75rem 0;
  color: var(--tinta);
  text-decoration: none;
  border-top: 1px solid var(--linha);
}
.menu a.router-link-exact-active {
  font-weight: 700;
  background: var(--marca);
  padding-inline: var(--esp-2);
}

@media (min-width: 48rem) {
  .menu-btn {
    display: none;
  }
  .menu {
    display: block;
    flex-basis: auto;
  }
  .menu ul {
    display: flex;
    gap: var(--esp-1);
  }
  .menu a {
    border-top: 0;
    padding: 0.4rem 0.6rem;
  }
}
</style>
