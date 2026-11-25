<script setup>
import SectionLayout from '@/components/SectionLayout.vue'
import ViewportLab from '@/labs/ViewportLab.vue'
import { codigosViewport } from '@/data/codigos.js'

const fontes = [
  { nome: 'MDN: Viewport meta tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
  { nome: 'MDN: Responsive design', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design' },
  { nome: 'MDN: Using media queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries' },
]
</script>

<template>
  <SectionLayout
    numero="1"
    titulo="Por que responsividade importa"
    pergunta="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    :codigos="codigosViewport"
    :fontes="fontes"
  >
    <template #explicacao>
      <p>
        As pessoas abrem sites em celulares, tablets, notebooks e TVs, cada um com uma largura de tela diferente. Uma página
        responsiva se adapta a todas, em vez de obrigar a pessoa a dar zoom e rolar para os lados.
      </p>
      <p>
        Existe um detalhe histórico: muitos sites antigos foram feitos só para computador. Para não quebrá-los, o navegador do
        celular finge que a tela tem cerca de 980px, desenha o site assim e depois encolhe tudo. A meta tag
        <code>viewport</code> avisa ao navegador: "esta página foi feita para celular, use a largura real".
      </p>
      <p class="nota">Ideia central: as media queries olham a largura do layout, não a largura física da tela.</p>
    </template>

    <template #laboratorio>
      <ViewportLab />
    </template>

    <template #resposta>
      <p>
        Sem a meta tag, o navegador do celular usa uma viewport virtual larga, em torno de 980px, e depois reduz a página
        inteira para caber na tela. Como as media queries medem a largura do layout (980px) e não a da tela (uns 390px), as
        regras de celular nunca disparam. O site aparece como a versão de computador, em miniatura.
      </p>
      <p>
        Com <code>width=device-width</code>, a largura do layout passa a ser a largura real do aparelho em pixels CSS, e
        <code>initial-scale=1</code> tira o zoom inicial. Agora as media queries enxergam a largura correta e funcionam.
      </p>
    </template>
  </SectionLayout>
</template>
