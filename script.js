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

// 3. Barras de nível enchem quando aparecem na tela
const barras = document.querySelectorAll(".barra span");
barras.forEach(function (b) { b.style.width = "0"; });

const observador = new IntersectionObserver(function (itens) {
  itens.forEach(function (item) {
    if (item.isIntersecting) {
      item.target.style.width = "";
      observador.unobserve(item.target);
    }
  });
});
barras.forEach(function (b) { observador.observe(b); });

// 4. Ano do rodapé sempre atualizado
document.querySelector("#ano").textContent = new Date().getFullYear();
