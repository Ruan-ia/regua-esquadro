<script setup>
import SectionLayout from '@/components/SectionLayout.vue'
import ImageLab from '@/labs/ImageLab.vue'
import { codigosImagens } from '@/data/codigos.js'

const fontes = [
  { nome: 'MDN: Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images' },
  { nome: 'MDN: aspect-ratio', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
  { nome: 'MDN: object-fit', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit' },
  { nome: 'web.dev: Cumulative Layout Shift (CLS)', url: 'https://web.dev/articles/cls' },
  { nome: 'web.dev: Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
]
</script>

<template>
  <SectionLayout
    numero="4"
    titulo="Imagens responsivas"
    pergunta="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    :codigos="codigosImagens"
    :fontes="fontes"
  >
    <template #explicacao>
      <dl class="glossario">
        <div><dt>max-width: 100%; height: auto</dt><dd>A imagem nunca passa da largura do pai e mantém a proporção ao encolher.</dd></div>
        <div><dt>width e height no HTML</dt><dd>Informam o tamanho original. O navegador calcula a proporção e reserva o espaço antes de baixar.</dd></div>
        <div><dt>loading="lazy"</dt><dd>Só baixa a imagem quando ela está perto de aparecer. Não use na imagem principal do topo.</dd></div>
        <div><dt>aspect-ratio</dt><dd>Define a proporção da caixa em CSS (por exemplo 16 / 9).</dd></div>
        <div><dt>object-fit</dt><dd>Decide como a imagem preenche a caixa: <code>cover</code> corta as sobras, <code>contain</code> mostra tudo.</dd></div>
        <div><dt>srcset e sizes</dt><dd>Oferecem versões de tamanhos diferentes; o navegador escolhe a mais adequada à tela.</dd></div>
      </dl>
    </template>

    <template #laboratorio>
      <ImageLab />
    </template>

    <template #resposta>
      <p>
        Enquanto a imagem não chega, o navegador não sabe o tamanho dela. Sem <code>width</code> e <code>height</code>, ele
        reserva 0px de altura e desenha o texto no topo. Quando o arquivo termina de baixar, a imagem passa a ocupar espaço e
        empurra tudo o que está abaixo.
      </p>
      <p>
        A métrica que mede isso é o <strong>CLS (Cumulative Layout Shift)</strong>, uma das Core Web Vitals. Um bom valor é
        0,1 ou menos. Com <code>width</code> e <code>height</code> (e <code>height: auto</code> no CSS), o navegador calcula a
        proporção, reserva o espaço antes da imagem chegar e o texto não se move.
      </p>
    </template>
  </SectionLayout>
</template>
