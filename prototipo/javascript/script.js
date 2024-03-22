
//// funcao para remover textbox da opcao 2 e adicionar na 3

export function troco() {
    var caixaTexto = document.getElementById("caixaTexto");
    var opcao3 = document.getElementById("opcao3");
    var opcao2 = document.getElementById("opcao2");
    if (opcao3.checked) {
        caixaTexto.style.display = "block";
    } else {
        caixaTexto.style.display = "none";
    }

    if (opcao2.checked) {
        caixaTexto.style.display = "none";
    } else {
        caixaTexto.style.display = "block";
    }

}

document.getElementById("opcao3").addEventListener("click", troco);
document.getElementById("opcao2").addEventListener("click", troco);

////// função para remover a textbox da opcao1 
export function troco1() {
    var caixaTexto = document.getElementById("caixaTexto");
    var opcao1 = document.getElementById("opcao1");
    
    if (opcao1.checked) {
        caixaTexto.style.display = "none";
    } else {
        caixaTexto.style.display = "block";
    }

}

document.getElementById("opcao1").addEventListener("click", troco1);

