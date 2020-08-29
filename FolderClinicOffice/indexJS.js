const input = document.getElementById("input");
const submit = document.getElementById("submit");
const error = document.getElementById("error");

form.addEventListener("submit", (e) =>{    //envio do texto digitado ao formulário
  e.preventDefault();   //impede a pag de recarregar

  if(!input.value.lenght){    //validação de erro
    error.className = "error";
    return setTimeout(() => {
      return (error.className = "none-error");
    }, 3000);
  }
  window.location.href = `form.html?user= ${input.value.replace(   //redirecionamento
    " ",
    "-"
  )}`;
});
