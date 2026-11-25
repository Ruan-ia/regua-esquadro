<script setup>
import SectionLayout from '@/components/SectionLayout.vue'
import UnitLab from '@/labs/UnitLab.vue'
import { codigosUnidades } from '@/data/codigos.js'

const fontes = [
  { nome: 'MDN: Values and units', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units' },
  { nome: 'MDN: CSS length', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length' },
  { nome: 'web.dev: The large, small, and dynamic viewport units', url: 'https://web.dev/blog/viewport-units' },
]
</script>

<template>
  <SectionLayout
    numero="2"
    titulo="Unidades CSS"
    pergunta="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    :codigos="codigosUnidades"
    :fontes="fontes"
  >
    <template #explicacao>
      <p>
        Unidade <strong>absoluta</strong> é um tamanho fixo: o <code>px</code>. Unidade <strong>relativa</strong> é um tamanho
        calculado a partir de outra coisa (a fonte, o pai ou a janela). Em layouts responsivos, as relativas deixam a página
        se ajustar sozinha.
      </p>
      <dl class="glossario">
        <div><dt>px</dt><dd>Fixo. Ótimo para bordas finas e sombras.</dd></div>
        <div><dt>rem</dt><dd>Múltiplo da fonte do html. Use para fontes e espaçamentos.</dd></div>
        <div><dt>em</dt><dd>Múltiplo da fonte do próprio elemento. Use em botões e ícones que devem crescer com o texto.</dd></div>
        <div><dt>%</dt><dd>Porcentagem do pai (na largura, a do pai). Boa para colunas fluidas.</dd></div>
        <div><dt>fr</dt><dd>Fração do espaço livre, só no Grid.</dd></div>
        <div><dt>vw</dt><dd>1% da largura da janela. Útil para títulos e faixas.</dd></div>
        <div><dt>vh</dt><dd>1% da altura da janela. No celular, 100vh pode ficar maior que a área visível.</dd></div>
        <div><dt>dvh</dt><dd>Altura visível de verdade, acompanhando a barra de endereço. Prefira para telas cheias no celular.</dd></div>
        <div><dt>ch</dt><dd>Largura do caractere "0". Use <code>max-width: 65ch</code> para linhas de texto confortáveis.</dd></div>
      </dl>
    </template>

    <template #laboratorio>
      <UnitLab />
    </template>

    <template #resposta>
      <p>
        O <code>px</code> é absoluto: 16px são sempre 16px, não importa o que a pessoa configurou. O <code>rem</code> é um
        múltiplo do tamanho da fonte do elemento <code>html</code>, e esse tamanho vem, por padrão, da configuração do
        navegador (normalmente 16px).
      </p>
      <p>
        Quando a pessoa aumenta a fonte nas configurações, a fonte do html aumenta, e tudo em rem é recalculado (1,5rem deixa
        de ser 24px). Por isso é importante usar <code>html { font-size: 100% }</code> e não fixar o valor em px.
      </p>
    </template>
  </SectionLayout>
</template>
