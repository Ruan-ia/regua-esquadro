<script setup>
import SectionLayout from '@/components/SectionLayout.vue'
import FlexLab from '@/labs/FlexLab.vue'
import GridLab from '@/labs/GridLab.vue'
import { codigosLayout } from '@/data/codigos.js'

const fontes = [
  { nome: 'MDN: Flexbox', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox' },
  { nome: 'MDN: Grids', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids' },
  { nome: 'MDN: repeat()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/repeat' },
  { nome: 'MDN: minmax()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/minmax' },
]
</script>

<template>
  <SectionLayout
    numero="3"
    titulo="Flexbox e Grid"
    pergunta="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considere 1rem = 16px e mostre a conta."
    :codigos="codigosLayout"
    :fontes="fontes"
  >
    <template #explicacao>
      <p>
        <strong>Flexbox</strong> organiza itens em <em>uma dimensão</em>: uma linha ou uma coluna. É ótimo para barras de menu,
        botões lado a lado e centralizar coisas. <strong>Grid</strong> organiza em <em>duas dimensões</em>, linhas e colunas ao
        mesmo tempo, ideal para a estrutura da página e para galerias de cards.
      </p>
      <dl class="glossario">
        <div><dt>justify-content</dt><dd>Distribui os itens ao longo do eixo principal.</dd></div>
        <div><dt>align-items</dt><dd>Alinha os itens no eixo transversal.</dd></div>
        <div><dt>flex-wrap</dt><dd>Permite que os itens quebrem para a linha de baixo quando não cabem.</dd></div>
        <div><dt>gap</dt><dd>Espaço entre itens, em Flex e em Grid.</dd></div>
      </dl>
      <p>
        O truque <code>repeat(auto-fit, minmax(14rem, 1fr))</code> significa: "faça quantas colunas de no mínimo 14rem couberem
        e divida o espaço que sobrar igualmente". Sem nenhuma media query, os cards se reorganizam sozinhos.
      </p>
      <p class="nota">Regra prática: uma linha ou uma coluna de itens, use Flex. Uma grade, use Grid.</p>
    </template>

    <template #laboratorio>
      <FlexLab />
      <GridLab />
    </template>

    <template #resposta>
      <p>Cada coluna precisa de, no mínimo, 14rem. Com 1rem = 16px:</p>
      <pre class="conta">1 coluna mínima = 14rem x 16 = 224px
gap = 1rem = 16px

Para 2 colunas: 2 x 224 + 1 x 16 = 448 + 16 = 464px</pre>
      <p>
        Com menos de 464px de largura, só cabe uma coluna (que estica até 1fr). A partir de <strong>464px</strong>, passam a
        ser 2 colunas. A fórmula geral é <code>n = floor((largura + gap) / (mínimo + gap))</code>: para 464px,
        (464 + 16) / (224 + 16) = 2.
      </p>
    </template>
  </SectionLayout>
</template>
