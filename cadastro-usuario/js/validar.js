var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var nivel = document.getElementById('passStrengthMeter');

nome.addEventListener('focusout', validarNome);

function validarNome(e){
    const regexNome = /^[a-zA-Z ]{7,}$/;

    if(e.target.value.trim().match(regexNome)==null){
        nomeHelp.textContent = "Formato de nome inválido ou comprimento menor que 7"; 
        nomeHelp.style.color="red";
    }else{
        nomeHelp.textContent = "";
    }       
}

ano.addEventListener('focusout', () => {
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim();

    if(anoTrimado.match(regexAno)==null){
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }else{
        var date = new Date();

        if( parseInt(anoTrimado) > parseInt(date.getFullYear()-2) ){
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()-2}.`;
            anoHelp.style.color="red";
        }else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-124 ){
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-124}.`;
            anoHelp.style.color="red";
        }else{
            anoHelp.textContent="";
        }        
    }
});

email.addEventListener('focusout', () => {
    const regexEmail = /^[a-zA-Z]*[0-9]+[a-zA-Z0-9]*@[a-zA-Z0-9]+\.(br|com|net|org)$/;

    if(!email.value.trim().match(regexEmail)){
        emailHelp.textContent = "Formato de email inválido. Ex: lucas123@gmail.com";
        emailHelp.style.color="red";
    } else {
        emailHelp.textContent = "";
    }
});

function senhaContemNomeAno(senha, nome, ano) {
    const senhaLower = senha.toLowerCase();

    if(senhaLower.includes(ano) || senhaLower.includes(nome.toLowerCase()))
        return true;

    return false;
}

function NivelDeSeguranca(senha) {
    let strength = 0;

    // Adiciona pontos de força com base nas condições da senha
    if (senha.length >= 8) {
        strength += 6;
    }
    if (senha.length > 12) {
        strength += 6;
    }
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) {
        strength += 6;
    }
    if (/\d/.test(senha)) {
        strength += 6;
    }
    if (/[@#%&!+]/.test(senha)) {
        strength += 6;
    }

    // Retorna a força calculada
    return strength;

}

senha.addEventListener('focusout', () => {
    let length = senha.value.trim().length;
    const regexsenha = /^(?=.*[@#%&!+])(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if(length < 6 || length > 20){
        senhaHelp.textContent = "Sua senha deve conter de 6 à 20 caracteres";
        senhaHelp.style.color="red";
    }else if(!senha.value.trim().match(regexsenha)){
        senhaHelp.textContent = "Sua senha deve conter pelo menos uma ocorrência de letras, numeros pelo menos um dos seguintes caracteres especiais: @, #, %, &, ! ou +";
        senhaHelp.style.color="red";
        console.log(senha.value)
    }else if(senhaContemNomeAno(senha.value, nome.value, ano.value)){
        senhaHelp.textContent = "Sua senha não pode conter o seu nome ou ano de nascimento";
        senhaHelp.style.color="red";
    }else{
        nivel.value = NivelDeSeguranca(senha.value)
        senhaHelp.textContent = "";
        console.log(senha.value, senha.value.length)
    }
});