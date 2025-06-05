let dddsConsultados = [];

function buscarddd() {
  console.log("Buscarddd");
  const inputddd = document.getElementById("input_ddd");
  const valorddd = inputddd.value;

  if (!valorddd) {
    alert("Você precisa digitar um DDD");
    return;
  }

  fetch("https://brasilapi.com.br/api/ddd/v1/" + valorddd)
    .then((resposta) => resposta.json())
    .then((json) => {
      console.log(json);

      const Estado = document.getElementById("Estado");
      Estado.innerText = "O estado é: " + json.state;

      const Cidades = document.getElementById("Cidades");
      Cidades.innerText = "As cidades são: " + json.cities;

      if (!dddsConsultados.includes(valorddd)) {
        dddsConsultados.push(valorddd);
        adicionarDddNaTabela(valorddd, json.state);
      }
    })
    .catch((erro) => {
      alert("DDD inválido ou não encontrado");
      console.error(erro);
    });
}

function adicionarDddNaTabela(ddd, estado) {
  const novaLinha = document.createElement("tr");
  const colunaDdd = document.createElement("td");
  const colunaEstado = document.createElement("td");

  colunaDdd.innerText = ddd;
  colunaEstado.innerText = estado;

  novaLinha.appendChild(colunaDdd);
  novaLinha.appendChild(colunaEstado);

  const tabela = document.getElementById("tabela_ddds");
  tabela.appendChild(novaLinha);
}

function configurarEventos() {
  console.log("Página carregada");
  const botaoBuscar = document.getElementById("botao_buscar");
  botaoBuscar.addEventListener("click", buscarddd);
}

window.addEventListener("load", configurarEventos);