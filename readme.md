# Netflix Clone — Trabalho Acadêmico

## Tema

Site inspirado na Netflix para catalogar e explorar filmes e séries, com busca, favoritos e descrições expansíveis.

---

## Funcionalidades Implementadas

### JavaScript (3 funcionalidades obrigatórias)

1. **Busca em tempo real** — O usuário digita no campo de busca e os cards são filtrados instantaneamente pelo título. Se nenhum resultado for encontrado, uma mensagem é exibida.

2. **Favoritar filmes** — Cada card possui um botão "+ Minha Lista" que alterna entre adicionado e não adicionado, mudando cor, texto e estado ARIA (`aria-pressed`).

3. **Mostrar / ocultar descrição** — O botão "Ver mais" expande a descrição do filme no card. Clicar novamente recolhe a descrição ("Ver menos"). O estado é controlado via `aria-expanded` para acessibilidade.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| HTML5 semântico | Estrutura com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| CSS3 | Estilização, Flexbox, CSS Grid, Media Queries, variáveis CSS, animações com `@keyframes` |
| JavaScript (puro) | DOM, eventos, manipulação de atributos ARIA, lógica de filtragem |

---

## Estrutura de Arquivos

```
/
├── index.html    — Estrutura semântica da página
├── styles.css    — Toda a estilização e responsividade
├── script.js     — Todas as funcionalidades interativas
└── README.md     — Esta documentação
```

---

## Responsividade

| Dispositivo | Breakpoint | Adaptação |
|-------------|------------|-----------|
| Desktop     | > 768px    | Layout padrão, header horizontal |
| Tablet      | ≤ 768px    | Header em coluna, cards com 80% de largura |
| Mobile      | ≤ 480px    | Cards ocupam 95% da tela, fontes reduzidas |

---

## Acessibilidade (WCAG)

- Texto alternativo (`alt`) em todas as imagens
- `<label>` associado ao campo de busca
- Atributos `aria-label`, `aria-expanded`, `aria-pressed`, `aria-live`
- Foco visível para navegação por teclado (`focus-visible`)
- Contraste adequado entre texto e fundo (tema escuro com texto branco/cinza)
- Estrutura semântica com landmarks (`role="banner"`, `role="contentinfo"`)

---

## Como Executar

1. Baixe ou clone os arquivos
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Nenhuma instalação ou dependência necessária
