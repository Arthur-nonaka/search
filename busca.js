const elemBusca = document.querySelector("#busca");
const elemSugestoes = document.querySelector(".sugestoes");
let historico = [];

var res;
async function start() {
  res = await fetch("./palavras.json").then((res) => res.json());
}

elemBusca.addEventListener("keyup", () => click());

const click = () => {
  if (elemBusca.value == "") {
    limparSugestoes();
    historico.forEach((result) => {
      const elemDiv = document.createElement("div");
      elemDiv.setAttribute("class", "sugestao");
      elemDiv.innerHTML = result;
      elemSugestoes.appendChild(elemDiv);
    });
  } else {
    limparSugestoes();
    criarSugestao(elemBusca.value);
  }
};

function limparSugestoes() {
  elemSugestoes.innerHTML = "";
}

function criarSugestao(texto) {
  let results = res["palavras"].filter((x) => x.startsWith(texto));
  results.forEach((result) => {
    const elemDiv = document.createElement("div");
    elemDiv.setAttribute("class", "sugestao");
    elemDiv.innerHTML = result;

    elemDiv.addEventListener("click", function () {
      elemBusca.value = result;
      historico.push(result);
      click();
    });
    elemSugestoes.appendChild(elemDiv);
  });
}
