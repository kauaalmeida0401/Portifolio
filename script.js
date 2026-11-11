// 1. Modo claro / escuro: liga e desliga a classe "escuro" no body
const botaoTema = document.querySelector("#tema");

function atualizarBotao() {
  if (document.body.classList.contains("escuro")) {
    botaoTema.textContent = "☀️ Modo claro";
  } else {
    botaoTema.textContent = "🌙 Modo escuro";
  }
}

// começa no escuro, a não ser que a pessoa tenha escolhido o claro antes
let temaSalvo = null;
try { temaSalvo = localStorage.getItem("tema"); } catch (e) {}
if (temaSalvo !== "claro") {
  document.body.classList.add("escuro");
}
atualizarBotao();

botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("escuro");
  atualizarBotao();
  try {
    localStorage.setItem("tema", document.body.classList.contains("escuro") ? "escuro" : "claro");
  } catch (e) {}
});

// 2. Janela "Redes e contatos"
const janela = document.querySelector("#janelaContatos");
document.querySelector("#abrirContatos").addEventListener("click", function () {
  janela.showModal();
});
document.querySelector("#fecharContatos").addEventListener("click", function () {
  janela.close();
});
// clicar fora da caixa também fecha
janela.addEventListener("click", function (evento) {
  if (evento.target === janela) janela.close();
});

// 3. Níveis em quadradinhos (10 níveis, estilo Project Zomboid)
// Cada .nivel no HTML tem data-nivel="0 a 10". Os quadrados enchem um a um quando aparecem na tela.
const TOTAL_NIVEIS = 10;
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function montarNivel(caixa) {
  const nivel = Math.max(0, Math.min(TOTAL_NIVEIS, parseInt(caixa.dataset.nivel, 10) || 0));

  const grupo = document.createElement("div");
  grupo.className = "quadrados";
  for (let i = 0; i < TOTAL_NIVEIS; i++) {
    const q = document.createElement("span");
    q.className = "quadrado";
    grupo.appendChild(q);
  }

  const numero = document.createElement("span");
  numero.className = "nivel-num";
  numero.textContent = nivel + "/" + TOTAL_NIVEIS;

  caixa.setAttribute("role", "img");
  caixa.setAttribute("aria-label", "Nível " + nivel + " de " + TOTAL_NIVEIS);
  caixa.appendChild(grupo);
  caixa.appendChild(numero);
}

function encher(caixa) {
  const nivel = Math.max(0, Math.min(TOTAL_NIVEIS, parseInt(caixa.dataset.nivel, 10) || 0));
  const quadrados = caixa.querySelectorAll(".quadrado");
  for (let i = 0; i < nivel; i++) {
    if (reduzirMovimento) {
      quadrados[i].classList.add("cheio");
    } else {
      setTimeout(function () { quadrados[i].classList.add("cheio"); }, i * 90);
    }
  }
}

const caixasNivel = document.querySelectorAll(".nivel");
caixasNivel.forEach(montarNivel);

const observador = new IntersectionObserver(function (itens) {
  itens.forEach(function (item) {
    if (item.isIntersecting) {
      encher(item.target);
      observador.unobserve(item.target);
    }
  });
});
caixasNivel.forEach(function (c) { observador.observe(c); });

// 4. Ano do rodapé sempre atualizado
document.querySelector("#ano").textContent = new Date().getFullYear();
