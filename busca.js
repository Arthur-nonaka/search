const elemBusca = document.querySelector("#busca");
const elemSugestoes = document.querySelector(".sugestoes");
const elemHistorico = document.querySelector(".historico");
let historico = [];

var res;
async function start() {
  res = await fetch("./palavras.json").then((res) => res.json());
}

elemBusca.addEventListener("keyup", () => click());

const click = () => {
  if (elemBusca.value == "") {
    limparSugestoes();
    elemHistorico.setAttribute("class", "historico ativado");
    historico.forEach((result) => {
      const elemDiv = document.createElement("div");
      elemDiv.setAttribute("class", "sugestao");
      elemDiv.innerHTML = result;
      elemHistorico.appendChild(elemDiv);
    });
    console.log(historico);
  } else {
    limparSugestoes();
    elemHistorico.setAttribute("class", "historico desativado");
    criarSugestao(elemBusca.value);
  }
};

function limparSugestoes() {
  elemSugestoes.innerHTML = "";
  elemHistorico.innerHTML = "";
}

function criarSugestao(texto) {
  let results = res["palavras"].filter((x) => x.startsWith(texto));
  results.forEach((result) => {
    const elemDiv = document.createElement("div");
    elemDiv.setAttribute("class", "sugestao");
    elemDiv.innerHTML = result;

    elemDiv.addEventListener("click", function () {
      elemBusca.value = result;
      let a = historico.some((x) => x == result);
      if (!a) {
        historico.push(result);
      }
      click();
    });
    elemSugestoes.appendChild(elemDiv);
  });
}
