const name = document.getElementById("name");
const estados = document.getElementById("estados");
const cidades = document.getElementById("cidades");
const form = document.getElementById("form");
const email = document.getElementById("email");
const confemail = document.getElementById("confemail");
const plano =document.getElementById("plano");
const telefone = document.getElementById("telefone");
const clinica = document.getElementById("clinica");

form.addEventListener("submit", submitForm);

function telMask(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d)/, "+$1");
  v = v.replace(/(.{3})(\d)/, "$1($2");
  v = v.replace(/(.{6})(\d)/, "$1)$2");
  if (v.length == 12) {
    v = v.replace(/(.{1})$/, "-$1");
  } else if (v.length == 13) {
    v = v.replace(/(.{2})$/, "-$1");
  } else if (v.length == 14) {
    v = v.replace(/(.{3})$/, "-$1");
  } else if (v.length == 15) {
    v = v.replace(/(.{4})$/, "-$1");
  } else if (v.length > 15) {
    v = v.replace(/(.{4})$/, "-$1");
  }
  telefone.value = v;
}

function submitForm(event) {    //   evento de validação de estado, cidade e planos
  event.preventDefault();

  if (email.value !== confemail.value) {
    const p = document.createElement("p");
    p.innerText = "Emails não conferem";
    error.appendChild(p);
    error.className = "error";
    confemail.focus();
    return setTimeout(() => {
      error.removeChild(p);
      return (error.className = "none-error");
    }, 3000);
  }

  if (
    estados.options[estados.selectedIndex].value === "0" ||
    cidades.options[cidades.selectedIndex].value === "0" ||
    plano.options[plano.selectedIndex].value === "0"
  ) {
    const p = document.createElement("p");
    p.innerText = null;
    p.innerText = "Por favor, insira em todos os campos";
    error.appendChild(p);
    error.className = "error";
    confemail.focus();
    return setTimeout(() => {
      error.removeChild(p);
      return (error.className = "none-error");
    }, 3000);
  }
  window.location.href = "congratulations.html";
}

function Api(url) {   // função de acesso a apis
  var Httpreq = new XMLHttpRequest();     // uma nova requisição
  Httpreq.open("GET", url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

const responseStates = JSON.parse(    //   chamada da api - estados
  Api("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
);

function changeCities() {   //função que ouve as mudanças do estado e faz requisição a api das cidades
  if (estados.value !== "a") {
    const responseCities = JSON.parse(
      Api(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estados.value}/distritos`
      )
    );

    for (let i = 0; i <= responseCities.length; i++) {
      const option = document.createElement("option");
      option.value = responseStates[i].id;
      option.innerHTML = responseCities[i].nome;
      cidades.appendChild(option);
    }
  }
}

const planos = ["Mensal", "Diário", "Anual", "Semanal"];    //   loop de criação de options - plano
for (let i = 0; i <= planos.length; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerHTML = planos[i];
  console.log(planos[i]);
  plano.appendChild(option);
}

if (window.location.search) {   //   tratamento do texto enviado
  const user = window.location.href
    .split("?")[1]
    .split("=")[1]
    .replace("-", " ");
  document.getElementById("name").value = user;
}

for (let i = 0; i <= responseStates.length; i++) {    //   loop para criação de options - estados
  
  const option = document.createElement("option");    
  option.value = !!responseStates[i].id ? responseStates[i].id : null;
  option.innerHTML = !!responseStates[i].nome
    ? responseStates[i].nome
    : null;
  estados.appendChild(option);
}

/**function ordem(posicaoA, posicaoB) {   //ordem alfabetica dos estados e cidades
	
	return (posicaoA.nome > posicaoB.nome) ? 1 : ((posicaoB.nome > posicaoA.nome) ? -1 : 0);
 
});**/
