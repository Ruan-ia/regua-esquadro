<script setup>
import SectionLayout from '@/components/SectionLayout.vue'
import KeyLab from '@/labs/KeyLab.vue'
import { codigosVue } from '@/data/codigos.js'

const fontes = [
  { nome: 'Vue.js: List Rendering e :key', url: 'https://vuejs.org/guide/essentials/list.html' },
  { nome: 'Vue.js: Props', url: 'https://vuejs.org/guide/components/props.html' },
  { nome: 'Vue.js: Component Events', url: 'https://vuejs.org/guide/components/events.html' },
  { nome: 'Vue.js: Style Guide', url: 'https://vuejs.org/style-guide/' },
  { nome: 'Vue Router: Lazy Loading Routes', url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html' },
  { nome: 'web.dev: Web Vitals', url: 'https://web.dev/articles/vitals' },
  { nome: 'MDN: Using CSS custom properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
]
</script>

<template>
  <SectionLayout
    numero="5"
    titulo="Boas práticas em projetos Vue"
    pergunta="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    :codigos="codigosVue"
    :fontes="fontes"
  >
    <template #explicacao>
      <dl class="glossario">
        <div><dt>Pastas</dt><dd>Separe components (peças), views (telas por rota), router, stores e styles.</dd></div>
        <div><dt>Nomes de componentes</dt><dd>PascalCase e com duas palavras ou mais (AnimalCard, não Card), para não confundir com tags HTML.</dd></div>
        <div><dt>Props tipadas e eventos</dt><dd>Props descrevem o que o componente recebe; eventos avisam o pai do que aconteceu.</dd></div>
        <div><dt>:key no v-for</dt><dd>Dá uma identidade a cada item para o Vue saber quem é quem quando a lista muda.</dd></div>
        <div><dt>Variáveis CSS (tokens)</dt><dd>Cores e espaçamentos definidos uma vez em :root e reutilizados.</dd></div>
        <div><dt>Rotas sob demanda</dt><dd>Com import() dinâmico, cada tela vira um arquivo baixado só quando visitada.</dd></div>
      </dl>
      <h3>Core Web Vitals</h3>
      <dl class="glossario">
        <div><dt>LCP</dt><dd>Largest Contentful Paint: tempo até o maior elemento aparecer. Bom: até 2,5 s.</dd></div>
        <div><dt>INP</dt><dd>Interaction to Next Paint: rapidez de resposta aos toques e cliques. Bom: até 200 ms.</dd></div>
        <div><dt>CLS</dt><dd>Cumulative Layout Shift: o quanto o layout se mexe sozinho. Bom: até 0,1.</dd></div>
      </dl>
    </template>

    <template #laboratorio>
      <KeyLab />
    </template>

    <template #resposta>
      <p>
        Sem <code>:key</code>, o Vue reaproveita os elementos da página pela posição: o 1º elemento continua sendo o 1º, o 2º
        continua sendo o 2º. O texto digitado fica guardado no próprio elemento do campo, e não nos dados do animal.
      </p>
      <p>
        Quando o primeiro animal é removido, o Vue não apaga o primeiro elemento. Ele atualiza os nomes (o elemento 1 passa a
        mostrar o antigo 2º animal, o elemento 2 passa a mostrar o antigo 3º) e apaga o último elemento. Resultado: o texto que
        a pessoa digitou no campo do 2º animal agora aparece ligado a outro animal (o que era o 3º), ou some.
      </p>
      <p>
        Com <code>:key="animal.id"</code>, cada elemento fica preso ao seu animal: o Vue remove exatamente o elemento do
        primeiro e o texto continua no animal certo. Obs.: se o campo usasse <code>v-model</code> ligado ao dado do animal,
        o texto acompanharia o dado, mas o problema continua com foco, animações e estado interno de componentes filhos.
      </p>
    </template>
  </SectionLayout>
</template>
