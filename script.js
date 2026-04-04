/**
 * script.js — Netflix Clone (Trabalho Acadêmico)
 *
 * Funcionalidades implementadas:
 *  1. Busca em tempo real por título
 *  2. Favoritar / desfavoritar (+ Minha Lista)
 *  3. Mostrar / ocultar descrição de cada card
 *  4. Filtro por categoria via menu de navegação
 *     (Séries, Filmes, Minha Lista, Todos)
 *
 * Boas práticas:
 *  - Verificação de existência dos elementos antes de usar
 *  - Nomes descritivos para variáveis e funções
 *  - Funções com responsabilidade única
 *  - Atributos ARIA atualizados dinamicamente
 *  - Estado global centralizado na variável filtroAtivo
 */

// =====================================================
// ESTADO GLOBAL
// Guarda qual filtro do menu está ativo no momento
// =====================================================

let filtroAtivo = "todos"; // valor padrão ao carregar a página

// =====================================================
// SELETORES — captura os elementos do DOM uma única vez
// =====================================================

const campoBusca            = document.getElementById("searchInput");
const cards                 = document.querySelectorAll(".card");
const mensagemSemResultados = document.getElementById("semResultados");
const tituloPagina          = document.getElementById("tituloPagina");
const linksNav              = document.querySelectorAll(".nav-link");

// =====================================================
// 1. BUSCA EM TEMPO REAL
// Filtra cards pelo título digitado, respeitando
// também o filtroAtivo de categoria
// =====================================================

/**
 * Decide se um card deve ser exibido com base em:
 *  - O texto da busca (deve estar no título)
 *  - O filtro ativo (categoria ou minha-lista)
 *
 * @param {Element} card - Elemento .card a avaliar
 * @param {string}  textoBusca - Texto digitado (já em lowercase)
 * @returns {boolean} true = deve ser exibido
 */
function cardDeveAparecer(card, textoBusca) {
    const elementoTitulo = card.querySelector(".titulo");
    if (!elementoTitulo) return false;

    const titulo     = elementoTitulo.textContent.toLowerCase();
    const categoria  = card.dataset.categoria;          // "filme" ou "serie"
    const favoritado = card.querySelector(".fav-btn").classList.contains("ativo");

    // Verifica se passa pelo filtro de categoria/lista
    const passaFiltro =
        filtroAtivo === "todos"       ||
        filtroAtivo === categoria     ||
        (filtroAtivo === "minha-lista" && favoritado);

    // Verifica se passa pela busca de texto
    const passaBusca = titulo.includes(textoBusca);

    return passaFiltro && passaBusca;
}

/**
 * Percorre todos os cards e mostra ou esconde cada um.
 * Exibe a mensagem de "sem resultados" se nenhum aparecer.
 */
function aplicarFiltros() {
    const textoBusca = campoBusca ? campoBusca.value.toLowerCase().trim() : "";
    let cardsVisiveis = 0;

    cards.forEach(function (card) {
        if (cardDeveAparecer(card, textoBusca)) {
            card.style.display = "flex";
            cardsVisiveis++;
        } else {
            card.style.display = "none";
        }
    });

    // Exibe ou oculta a mensagem de "sem resultados"
    if (mensagemSemResultados) {
        if (cardsVisiveis === 0) {
            mensagemSemResultados.removeAttribute("hidden");
        } else {
            mensagemSemResultados.setAttribute("hidden", "");
        }
    }
}

// Escuta digitação no campo de busca
if (campoBusca) {
    campoBusca.addEventListener("input", aplicarFiltros);
}

// =====================================================
// 2. FAVORITAR / DESFAVORITAR
// =====================================================

/**
 * Alterna o estado de favorito de um botão.
 * Depois re-aplica os filtros para que "Minha Lista"
 * seja atualizada imediatamente se estiver ativa.
 *
 * @param {HTMLButtonElement} botao - O botão clicado
 */
function alternarFavorito(botao) {
    const estaAtivo = botao.classList.toggle("ativo");

    if (estaAtivo) {
        botao.textContent = "✔ Adicionado";
        botao.setAttribute("aria-pressed", "true");
        botao.setAttribute("aria-label", "Remover da minha lista");
    } else {
        botao.textContent = "+ Minha Lista";
        botao.setAttribute("aria-pressed", "false");
        botao.setAttribute("aria-label", "Adicionar à minha lista");
    }

    // Re-aplica os filtros para refletir a mudança em "Minha Lista"
    aplicarFiltros();
}

// Adiciona listener em todos os botões de favorito
document.querySelectorAll(".fav-btn").forEach(function (botao) {
    botao.addEventListener("click", function () {
        alternarFavorito(botao);
    });
});

// =====================================================
// 3. MOSTRAR / OCULTAR DESCRIÇÃO
// =====================================================

/**
 * Expande ou recolhe a descrição de um card.
 *
 * @param {HTMLButtonElement} botao - O botão "Ver mais / Ver menos"
 */
function alternarDescricao(botao) {
    const descricao = botao.closest(".card").querySelector(".descricao");
    if (!descricao) return;

    // Verifica se está oculta (pode estar via hidden ou display:none no CSS)
    const estaOculta = (
        descricao.hasAttribute("hidden") ||
        descricao.style.display === "none" ||
        descricao.style.display === ""
    );

    if (estaOculta) {
        descricao.removeAttribute("hidden");
        descricao.style.display = "block";
        botao.textContent = "Ver menos";
        botao.setAttribute("aria-expanded", "true");
    } else {
        descricao.style.display = "none";
        botao.textContent = "Ver mais";
        botao.setAttribute("aria-expanded", "false");
    }
}

// Adiciona listener em todos os botões de toggle
document.querySelectorAll(".toggle-btn").forEach(function (botao) {
    botao.addEventListener("click", function () {
        alternarDescricao(botao);
    });
});

// =====================================================
// 4. FILTRO DE NAVEGAÇÃO
// Clique nos links do menu filtra os cards por categoria
// =====================================================

/**
 * Mapeia cada valor de data-filtro para um título legível
 * que será exibido no <h2> da página.
 */
const titulosPorFiltro = {
    "todos":       "Todos os Títulos",
    "filme":       "Filmes",
    "serie":       "Séries",
    "minha-lista": "Minha Lista"
};

/**
 * Ativa um link do menu e aplica o filtro correspondente.
 *
 * @param {Element} linkClicado - O <a> do menu que foi clicado
 */
function ativarFiltroNav(linkClicado) {
    // Atualiza o estado global
    filtroAtivo = linkClicado.dataset.filtro;

    // Atualiza a classe "ativo" nos links do menu
    linksNav.forEach(function (link) {
        link.classList.remove("ativo");
    });
    linkClicado.classList.add("ativo");

    // Atualiza o título da seção principal
    if (tituloPagina) {
        tituloPagina.textContent = titulosPorFiltro[filtroAtivo] || "Títulos";
    }

    // Limpa o campo de busca ao trocar de categoria
    if (campoBusca) {
        campoBusca.value = "";
    }

    // Re-aplica todos os filtros com o novo estado
    aplicarFiltros();
}

// Adiciona listener em cada link do menu
linksNav.forEach(function (link) {
    link.addEventListener("click", function (evento) {
        evento.preventDefault(); // impede o salto para "#"
        ativarFiltroNav(link);
    });
});
