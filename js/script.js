let lista = [
    {
        nome: "Polímeros",
        categorias: ["meio-ambiente", "industria-tecnologia"],
        descricao: "Os polímeros são macromoléculas formadas pela união de moléculas menores, chamadas monômeros, que se repetem por meio de ligações químicas. Podem ser encontrados naturalmente ou produzidos artificialmente, estando presentes em diversos materiais e produtos do nosso cotidiano <br><br> Vamos conhecer mais sobre eles?",
        imagem: "/img/polimeros.png",
        link: "/polimeros.html"
    },
    {
        nome: "Lipídios",
        categorias: ["alimentacao", "saude"],
        descricao: "Os lipídios são moléculas orgânicas que não se dissolvem em água e desempenham funções importantes no organismo. Atuam como reserva de energia, isolamento térmico e composição das membranas celulares, estando presentes em diversos alimentos.<br><br> Vamos conhecer mais sobre eles?",
        imagem: "/img/lipidio.png",
        link: "/lipidios.html"
    },
    {
        nome: "Carboidratos",
        categorias: ["alimentacao", "saude", "meio-ambiente", "industria-tecnologia"],
        descricao: "Os carboidratos são moléculas orgânicas formadas por carbono, hidrogênio e oxigênio, que desempenham um papel importante no fornecimento de energia ao organismo. Estão presentes em alimentos como pães, frutas, massas e cereais. <br><br><br> Vamos conhecer mais sobre eles?",
        imagem: "/img/carboidratos.png",
        link: "/carboidratos.html"
    },
    {
        nome: "Proteínas",
        categorias: ["alimentacao", "saude"],
        descricao: "As proteínas são macromoléculas essenciais compostas por aminoácidos encadeados e arranjados de forma única. Elas são formadas basicamente por carbono, hidrogênio, oxigênio, nitrogênio e enxofre, contendo fósforo apenas raramente. <br><br> Vamos conhecer mais sobre elas?",
        imagem: "/img/proteinas.png",
        link: "/proteinas.html"
    },
    {
        nome: "Ácidos Nucleicos",
        categorias: ["saude"],
        descricao: "Os ácidos nucleicos são macromoléculas formadas pela união de nucleotídeos, representadas pelo DNA e pelo RNA. Sua principal função é armazenar, codificar e traduzir as informações genéticas que orientam a síntese de proteínas nos seres vivos. <br><br> Vamos conhecer mais sobre eles?",
        imagem: "/img/acidos-nucleicos.png",
        link: "/acidos-nucleicos.html"
    }
];

let areaCartoes = document.getElementById("cartoes");
let campoBusca = document.querySelector("#buscar");
let campoOrdenar = document.querySelector("#ordenar");

    
function mostrarCards(listaCartoes) {
    areaCartoes.innerHTML = "";

    listaCartoes.forEach(function(cartao) {
        areaCartoes.innerHTML += `
            <div class="card">
                <img src="${cartao.imagem}" alt="${cartao.nome}">
                <h2>${cartao.nome}</h2>
                <p>${cartao.descricao}</p>
                <a href="${cartao.link}" class="btn">Saiba mais</a>
            </div>
        `;
    });
}

if (areaCartoes) {
    mostrarCards(lista);
}

function atualizarCards() {
    if (!campoBusca || !campoOrdenar || !areaCartoes) {
        return;
    }

    let texto = campoBusca.value.toLowerCase().trim();
    let categoriaSelecionada = campoOrdenar.value;

    let listaFiltrada = lista.filter(function(cartao) {
        let buscar =
            cartao.nome.toLowerCase().includes(texto) ||
            cartao.descricao.toLowerCase().includes(texto);

        let categoria =
            categoriaSelecionada === "" ||
            categoriaSelecionada === "todas" ||
            cartao.categorias.includes(categoriaSelecionada);

        return buscar && categoria;
    });

    if (listaFiltrada.length === 0) {
        areaCartoes.innerHTML = "Nenhum resultado encontrado.";
    } else {
        mostrarCards(listaFiltrada);
    }
}

if (campoBusca) {
    campoBusca.addEventListener("input", atualizarCards);
}

if (campoOrdenar) {
    campoOrdenar.addEventListener("change", atualizarCards);
}

function alternarTexto(botao) {
    const conteudo = botao.previousElementSibling;

    conteudo.classList.toggle("aberto");

    if (conteudo.classList.contains("aberto")) {
        botao.textContent = "Ver menos";
    } else {
        botao.textContent = "Ver mais";
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const linksMenu = document.querySelectorAll("#menu a");

    const paginaAtual = window.location.pathname.split("/").pop();

    linksMenu.forEach(link => {

        const paginaLink = new URL(link.href).pathname.split("/").pop();

        if (paginaLink === paginaAtual) {
            link.classList.add("ativo");
        }

    });

});

document.addEventListener("DOMContentLoaded", function() {
    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");

    if (!botaoMenu || !menu) {
        return;
    }

    botaoMenu.addEventListener("click", function() {
        menu.classList.toggle("aberto");

        let aberto = menu.classList.contains("aberto");

        botaoMenu.textContent = aberto ? "✕" : "☰";
        botaoMenu.setAttribute("aria-expanded", aberto);
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

    menu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            menu.classList.remove("aberto");
            botaoMenu.textContent = "☰";
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
        });
    });
});

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("escuro");
}

document.addEventListener("DOMContentLoaded", function() {
    const botaoTema = document.getElementById("botao-tema");

    if (!botaoTema) {
        return;
    }

    function atualizarBotao() {
        if (document.body.classList.contains("escuro")) {
            botaoTema.textContent = "☀️ Mudar Tema";
            botaoTema.setAttribute("aria-label", "Ativar modo claro");
        } else {
            botaoTema.textContent = "🌙 Mudar Tema";
            botaoTema.setAttribute("aria-label", "Ativar modo escuro");
        }
    }

    atualizarBotao();

    botaoTema.addEventListener("click", function() {
        document.body.classList.toggle("escuro");

        let temaAtual = document.body.classList.contains("escuro")
            ? "escuro"
            : "claro";

        localStorage.setItem("tema", temaAtual);

        atualizarBotao();
    });
});

//Função inédita de texto pra fala.
const synth = window.speechSynthesis;

function falarTexto() {
    
    const voz = synth.getVoices().find(voice => voice.lang === 'pt-BR');

    document.querySelectorAll('.conteudo').forEach(conteudo => {
        const fala = new SpeechSynthesisUtterance(conteudo.innerText.trim());
        fala.lang = 'pt-BR';
        if (voz) fala.voice = voz;
        synth.speak(fala);
    });
}


let imagensSlider = document.querySelector(".imagensSlider");

if (imagensSlider) {
    let botaoProximo = document.querySelector("#proximo");
    let botaoAnterior = document.querySelector("#anterior");
    let posicao = 0;
    let totalImagens = imagensSlider.children.length;

    botaoProximo.addEventListener("click", function() {
        if (posicao > -(totalImagens - 1) * 600) {
            posicao = posicao - 600;
            imagensSlider.style.transform = `translateX(${posicao}px)`;
        }
    });

    botaoAnterior.addEventListener("click", function() {
        if (posicao < 0) {
            posicao = posicao + 600;
            imagensSlider.style.transform = `translateX(${posicao}px)`;
        }
    });
}

let perguntas = [
  {
    pergunta: "Quais são os quatro grupos principais de biomoléculas orgânicas essenciais para os seres vivos?",
    opcoes: ["Água, sais minerais, vitaminas e carboidratos.", "Carboidratos, lipídios, proteínas e ácidos nucleicos.", "Vitaminas, minerais, água e carboidratos.", "Lipídios, proteínas, sais minerais e vitaminas."],
    respostaCorreta: 1
  },
  {
    pergunta: "Glicose, frutose e galactose são exemplos de qual categoria de carboidratos?",
    opcoes: ["Monossacarídeos", "Dissacarídeos", "Polissacarídeos", "Oligossacarídeos"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual classe de lipídios é a principal responsável por formar a estrutura da membrana celular?",
    opcoes: ["Fosfolipídios", "Esteróis", "Triglicerídeos", "Cetona"],
    respostaCorreta: 0
  },
  {
    pergunta: "Como se chama a ligação química que une os aminoácidos para formar as proteínas?",
    opcoes: ["Ligação peptídica", "Ligação glicídica", "Ligação fosfodiéster", "Ligação hydrogenada"],
    respostaCorreta: 0
  },
  {
    pergunta: "Quais são os três componentes que formam um nucleotídeo (unidade do DNA e RNA)?",
    opcoes: ["Um aminoácido, um grupo carboxila e um grupo amina.", "Uma base nitrogenada, uma pentose (açúcar) e um grupo fosfato.", "Um ácido graxo, um glicerol e um grupo fosfato.", "Uma glicose, uma frutose e uma molécula de água.", "Uma purina, uma pirimidina e um grupo enzima."],
    respostaCorreta: 1
  }
];

let quizCard = document.getElementById("quizCard");

if (quizCard) {
    let indicePerguntaAtual = 0;
    let respostasUsuario = new Array(perguntas.length).fill(null);
    let elementoPergunta = document.getElementById("pergunta");
    let elementoOpcoes = document.getElementById("opcoes");
    let btnAnterior = document.getElementById("perguntaAnterior");
    let btnProximo = document.getElementById("proximaPergunta");
    let modalConfirmacao = document.getElementById("confirmacao");
    let resultadoCard = document.getElementById("resultadoCard");
    let btnConfirmar = document.getElementById("confirmarRespostas");
    let btnCancelar = document.getElementById("cancelarConfirmacao");
    let btnReiniciar = document.getElementById("reiniciarQuiz");
    let paragrafoResultado = resultadoCard.querySelector("p");

    function carregarPergunta() {
    let dadosPergunta = perguntas[indicePerguntaAtual];
    elementoPergunta.innerText = `${indicePerguntaAtual + 1}. ${dadosPergunta.pergunta}`;
    elementoOpcoes.innerHTML = "";

    dadosPergunta.opcoes.forEach((opcao, index) => {
        let botao = document.createElement("button");
        botao.innerText = opcao;
        botao.classList.add("botaoOpcao"); 

        if (respostasUsuario[indicePerguntaAtual] === index) {
        botao.classList.add("selecionada");
        }

        botao.addEventListener("click", () => selecionarOpcao(index));
        elementoOpcoes.appendChild(botao);
    });

    atualizarBotoesNavegacao();
    }

    function selecionarOpcao(indiceOpcao) {
    respostasUsuario[indicePerguntaAtual] = indiceOpcao;

    let botoes = elementoOpcoes.querySelectorAll("button");
    botoes.forEach((botao, index) => {
        botao.classList.toggle("selecionada", index === indiceOpcao);
    });

    atualizarBotoesNavegacao();
    }

    function atualizarBotoesNavegacao() {
    btnAnterior.disabled = indicePerguntaAtual === 0;

    if (indicePerguntaAtual === perguntas.length - 1) {
        btnProximo.innerText = "Finalizar Quiz";
    } else {
        btnProximo.innerText = "Próxima Pergunta";
    }

    btnProximo.disabled = respostasUsuario[indicePerguntaAtual] === null;
    }


    btnAnterior.addEventListener("click", () => {
    if (indicePerguntaAtual > 0) {
        indicePerguntaAtual--;
        carregarPergunta();
    }
    });

    btnProximo.addEventListener("click", () => {
    if (indicePerguntaAtual < perguntas.length - 1) {
        indicePerguntaAtual++;
        carregarPergunta();
    } else {
        abrirModalConfirmacao();
    }
    });


    function abrirModalConfirmacao() {
    modalConfirmacao.style.display = "block";
    }

    function fecharModalConfirmacao() {
    modalConfirmacao.style.display = "none";
    }

    btnCancelar.addEventListener("click", fecharModalConfirmacao);

    btnConfirmar.addEventListener("click", () => {
    fecharModalConfirmacao();
    calcularERexibirResultado();
    });


    function calcularERexibirResultado() {
    let acertos = 0;

    perguntas.forEach((pergunta, index) => {
        if (respostasUsuario[index] === pergunta.respostaCorreta) {
        acertos++;
        }
    });

    let pontuacaoFinal = 20 * acertos;
    quizCard.style.display = "none";
    resultadoCard.style.display = "block";
    paragrafoResultado.innerText = `Você acertou ${acertos} de ${perguntas.length} perguntas sobre moléculas! Pontuação Final: ${pontuacaoFinal} pontos.`;
    }

    btnReiniciar.addEventListener("click", () => {
    location.reload();
    });

    carregarPergunta();
}