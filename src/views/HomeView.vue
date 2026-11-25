<script setup>
import { sections } from '@/data/sections.js'
</script>

<template>
  <div>
    <section class="capa">
      <div class="container capa__grade">
        <div>
          <h1>Régua &amp; Esquadro</h1>
          <p class="capa__sub">
            Um guia para construir páginas que não quebram no celular. Cada seção explica, mostra o código e deixa você mexer
            no conceito.
          </p>
          <RouterLink class="btn capa__cta" to="/por-que-responsividade">Começar pela Seção 1</RouterLink>
        </div>
        <!-- a própria capa é um laboratório: redimensione a janela e veja o contador -->
        <div class="caixa regua">
          <p class="regua__titulo">Experimente agora</p>
          <p>
            Veja o indicador no canto inferior direito. Estique e encolha a janela (ou gire o celular): ele mostra a largura e o
            breakpoint ativo.
          </p>
        </div>
      </div>
    </section>

    <section class="container indice">
      <h2>O que tem no guia</h2>
      <ul class="cards">
        <li v-for="s in sections" :key="s.path">
          <RouterLink :to="s.path" class="card">
            <span class="card__num">{{ s.num || '?' }}</span>
            <span>
              <strong>{{ s.title }}</strong>
              <small>{{ s.resumo }}</small>
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.capa {
  background: var(--tinta);
  color: var(--folha);
  padding-block: var(--esp-8);
}
.capa__grade {
  display: grid;
  gap: var(--esp-6);
  align-items: center;
}
.capa h1 {
  font-size: var(--fs-4);
}
.capa__sub {
  font-size: var(--fs-2);
  line-height: 1.4;
}
.capa__cta {
  display: inline-block;
  background: var(--marca);
  color: var(--tinta);
  border-color: var(--marca);
  font-weight: 700;
  text-decoration: none;
}
.capa__cta:hover {
  background: var(--folha);
  border-color: var(--folha);
}
.regua {
  color: var(--tinta);
}
.regua__titulo {
  font-family: var(--fonte-titulo);
  font-weight: 700;
  font-size: var(--fs-2);
  margin-bottom: var(--esp-2);
}
.regua p:last-child {
  margin-bottom: 0;
}
.indice {
  margin-top: var(--esp-8);
}
.cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--esp-4);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
.card {
  display: flex;
  gap: var(--esp-3);
  height: 100%;
  padding: var(--esp-4);
  background: var(--folha);
  border: var(--borda);
  color: var(--tinta);
  text-decoration: none;
}
.card:hover {
  background: var(--marca);
}
.card__num {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--tinta);
  color: var(--folha);
  font-family: var(--fonte-codigo);
  font-weight: 700;
}
.card small {
  display: block;
  margin-top: var(--esp-1);
  color: var(--tinta-suave);
  font-size: var(--fs-0);
}

@media (min-width: 48rem) {
  .capa {
    padding-block: var(--esp-12);
  }
  .capa__grade {
    grid-template-columns: 3fr 2fr;
  }
}
</style>
