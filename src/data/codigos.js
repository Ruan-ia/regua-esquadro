// Exemplos de código exibidos nas seções (ficam num .js para poder conter tags como script sem quebrar o .vue)

export const codigosViewport = [
  {
    titulo: 'index.html (dentro do head)',
    texto: `<!-- Sem esta linha, o celular finge ter ~980px de largura -->
<!-- width=device-width: largura do layout = largura real da tela -->
<!-- initial-scale=1: abre sem zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Evite user-scalable=no: ele impede o zoom de quem precisa ampliar a página -->`,
  },
  {
    titulo: 'CSS mobile-first',
    texto: `/* Fora de media query = estilo do CELULAR */
.cards { display: grid; gap: 1rem; }

/* min-width: "a partir desta largura, acrescente isto" */
@media (min-width: 48rem) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}`,
  },
]

export const codigosUnidades = [
  {
    titulo: 'unidades.css',
    texto: `/* Absoluta: tamanho fixo */
.borda { border: 1px solid; }      /* px: bom para bordas e sombras finas */

/* Relativas à fonte */
html { font-size: 100%; }          /* respeita o navegador. Nunca force 16px aqui! */
body { font-size: 1rem; }          /* rem = tamanho da fonte do <html> */
.botao { padding: 0.5em 1em; }     /* em = fonte do próprio elemento: o botão cresce com o texto */

/* Relativas ao pai ou à janela */
.coluna { width: 50%; }            /* % = porcentagem da largura do pai */
.capa { min-height: 100dvh; }      /* dvh = altura visível de verdade no celular */
.faixa { padding-inline: 5vw; }    /* vw = 1% da largura da janela */
.texto { max-width: 65ch; }        /* ch = largura do "0": linhas confortáveis de ler */

/* Só no Grid */
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr;  /* fr = fração do espaço livre */
}`,
  },
]

export const codigosLayout = [
  {
    titulo: 'flexbox.css (uma dimensão)',
    texto: `.barra {
  display: flex;
  flex-wrap: wrap;                 /* se não couber, quebra para a linha de baixo */
  gap: 1rem;                       /* espaço entre os itens (sem margens manuais) */
  justify-content: space-between;  /* alinha no eixo principal (horizontal por padrão) */
  align-items: center;             /* alinha no eixo transversal (vertical por padrão) */
}`,
  },
  {
    titulo: 'grid.css (duas dimensões)',
    texto: `.cards {
  display: grid;
  gap: 1rem;
  /* "Crie quantas colunas de NO MÍNIMO 14rem couberem; divida a sobra em partes iguais (1fr)" */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

/* Quantas colunas cabem? n = floor((largura + gap) / (minimo + gap)) */`,
  },
]

export const codigosImagens = [
  {
    titulo: 'imagem.html',
    texto: `<!-- width e height: o navegador calcula a proporção ANTES de baixar e reserva o espaço -->
<img
  src="paisagem-800.jpg"
  srcset="paisagem-400.jpg 400w, paisagem-800.jpg 800w, paisagem-1600.jpg 1600w"
  sizes="(min-width: 48rem) 50vw, 100vw"
  width="800" height="450"
  alt="Montanhas ao entardecer"
  loading="lazy"
/>
<!-- loading="lazy": só baixa quando chega perto da tela.
     NÃO use na imagem principal do topo (ela é o LCP e precisa vir primeiro). -->`,
  },
  {
    titulo: 'imagem.css',
    texto: `img {
  max-width: 100%;   /* nunca passa da largura do pai */
  height: auto;      /* mantém a proporção; com width/height no HTML vira aspect-ratio automático */
}
.capa {
  aspect-ratio: 16 / 9;   /* reserva a caixa mesmo sem width/height */
  width: 100%;
  object-fit: cover;      /* preenche a caixa cortando as sobras (contain = mostra tudo) */
}`,
  },
]

export const codigosVue = [
  {
    titulo: 'Estrutura de pastas',
    texto: `src/
  assets/        imagens e fontes
  components/    peças reutilizáveis (BaseButton.vue, AnimalCard.vue)
  views/         uma tela por rota (HomeView.vue, SobreView.vue)
  router/        index.js com as rotas
  stores/        Pinia (um arquivo por assunto)
  styles/        tokens.css e base.css
  App.vue  main.js`,
  },
  {
    titulo: 'AnimalCard.vue (props tipadas e evento)',
    texto: `<script setup>
// Props tipadas: o Vue avisa no console se vier o tipo errado
defineProps({
  nome: { type: String, required: true },
  idade: { type: Number, default: 0 },
})
// Evento: o filho AVISA, o pai DECIDE
const emit = defineEmits(['remover'])
</script>

<template>
  <li>
    {{ nome }} ({{ idade }} anos)
    <button @click="emit('remover')">Remover</button>
  </li>
</template>`,
  },
  {
    titulo: 'Lista com :key',
    texto: `<!-- :key precisa ser um valor ÚNICO e ESTÁVEL do item (o id). Não use o índice. -->
<AnimalCard
  v-for="animal in animais"
  :key="animal.id"
  :nome="animal.nome"
  :idade="animal.idade"
  @remover="remover(animal.id)"
/>`,
  },
  {
    titulo: 'tokens.css (variáveis CSS)',
    texto: `:root {
  --cor-fundo: #e7efed;
  --cor-texto: #0d2b45;
  --esp-4: 1rem;
}
.card {
  padding: var(--esp-4);   /* mudou o token, mudou o site inteiro */
  color: var(--cor-texto);
}`,
  },
  {
    titulo: 'router/index.js (rota sob demanda)',
    texto: `const routes = [
  { path: '/', component: HomeView },  // carrega junto com o app
  // import() dinâmico: o arquivo desta tela só é baixado quando a pessoa visita a rota
  { path: '/sobre', component: () => import('@/views/SobreView.vue') },
]`,
  },
]
