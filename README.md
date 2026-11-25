# Régua & Esquadro

Guia interativo, feito em Vue 3, para criar páginas que funcionam em qualquer tela.
Projeto de revisão: componentes, rotas, Pinia e responsividade.

**Site publicado:** (cole aqui o link)
**Dupla:** Bárbara Yasmin Pimenta Dos Santos Tobias e Ruan Monteiro Brito

## O que tem no guia

| Rota | Seção | Laboratório |
| --- | --- | --- |
| `/por-que-responsividade` | Por que responsividade importa | Com e sem meta viewport |
| `/unidades-css` | Unidades CSS | Conversor de unidades para px |
| `/flexbox-e-grid` | Flexbox e Grid | Flexbox interativo e auto-fit com minmax |
| `/imagens-responsivas` | Imagens responsivas | Imagem atrasada com e sem width/height |
| `/boas-praticas-vue` | Boas práticas em Vue | v-for com e sem `:key` |
| `/desafio` | Desafio | Pergunta que só se responde usando o guia |

O indicador fixo no canto da tela (largura da janela e breakpoint ativo) aparece em todas as páginas.

## Rodando localmente

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # testa o build
```

## Tecnologias

Vue 3, Vite, Vue Router (hash history, rotas carregadas sob demanda) e Pinia (largura da janela).

## Regras técnicas atendidas

- CSS mobile-first: fora de media query é o estilo do celular; todas as media queries usam `min-width`.
- Fontes e espaçamentos em `rem`; cores, espaços e fontes são variáveis CSS em `:root` (`src/styles/tokens.css`).
- Nenhuma rolagem horizontal na página (blocos de código rolam dentro da própria caixa).
- No celular, o menu vira um botão.

## Publicação

O projeto usa `base: './'` e rotas com hash (`#/rota`), então funciona em qualquer hospedagem estática.

- **Vercel / Netlify:** importe o repositório. Build command: `npm run build`. Output: `dist`.
- **GitHub Pages:** rode `npm run build` e publique a pasta `dist` (por exemplo, com a ação `actions/deploy-pages` ou o pacote `gh-pages`).

## Estrutura

```
src/
  components/  NavBar, WidthIndicator, SectionLayout, CodeBlock
  labs/        ViewportLab, UnitLab, FlexLab, GridLab, ImageLab, KeyLab
  views/       uma tela por rota
  data/        sections.js (menu e home) e codigos.js (exemplos de código)
  router/      rotas
  stores/      Pinia
  styles/      tokens.css e base.css
```

## Uso de IA

Parte do código foi gerada com ajuda de IA e revisada pela dupla, que sabe explicar cada trecho.
