var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var nivel = document.getElementById('passStrengthMeter');
var btnMostraSenha = document.getElementById('btnMostrar');
var resultado = document.getElementById('inputResult');

let arrFlag = [];

nome.addEventListener('focusout', validarNome);

function validarNome(e) {
    const regexNome = /^[a-zA-Z ]{6,}$/;

    if (e.target.value.trim().match(regexNome) == null) {
        nomeHelp.textContent = "Nome inválido";
        nomeHelp.style.color = "red";
        flag = 1;
    } else {
        nomeHelp.textContent = "";
        flag = 0;
    }

    arrFlag[0] = flag;
}

ano.addEventListener('focusout', () => {
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim();

    if (anoTrimado.match(regexAno) == null) {
        anoHelp.textContent = "Ano Inválido";
        anoHelp.style.color = "red";
        flag = 1;
    } else {
        var date = new Date();

        if (parseInt(anoTrimado) > parseInt(date.getFullYear() - 2)) {
            anoHelp.textContent = `Ano Inválido`;
            anoHelp.style.color = "red";
            flag = 1;
        } else if (parseInt(anoTrimado) < parseInt(date.getFullYear()) - 124) {
            anoHelp.textContent = `Ano Inválido`;
            anoHelp.style.color = "red";
            flag = 1;
        } else {
            anoHelp.textContent = "";
            flag = 0;
        }
    }

    arrFlag[1] = flag;
});

email.addEventListener('focusout', () => {
    const regexEmail = /^[a-zA-Z]*[a-zA-Z0-9]*@[a-zA-Z0-9]+\.(br|com|net|org)$/;

    if (!email.value.trim().match(regexEmail)) {
        emailHelp.textContent = "Endereço de e-mail incorreto";
        emailHelp.style.color = "red";
        flag = 1;
    } else {
        emailHelp.textContent = "";
        flag = 0;
    }

    arrFlag[2] = flag;
});

function senhaContemNomeAno(senha, nome, ano) {
    const senhaLower = senha.toLowerCase();

    if (senhaLower.includes(ano) || senhaLower.includes(nome.toLowerCase()))
        return true;

    return false;
}

function NivelDeSeguranca(senha) {
    let strength = 0;
    const length = senha.length;

    const hasSpecialChar = /[@#%&!+]/.test(senha);
    const hasNumber = /\d/.test(senha);
    const hasUpperCase = /[A-Z]/.test(senha);

    if (length < 8 && hasSpecialChar && hasNumber) {
        strength = 1;
    } else if (length >= 8 && length <= 12 && hasSpecialChar && hasNumber && hasUpperCase) {
        strength = 2;
    } else if (length > 12 && hasSpecialChar && hasNumber && hasUpperCase) {
        strength = 3;
    }

    switch (strength) {
        case 1:
            return 'fraca';
        case 2:
            return 'moderada';
        case 3:
            return 'forte';
        default:
            return 'fraca'; 
    }
}


senha.addEventListener('focusout', () => {
    let length = senha.value.trim().length;
    const regexSenha = /^(?=.*[@#%&!+])(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (length < 6 || length > 20) {
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color = "red";
        flag = 1;
    } else if (!senha.value.trim().match(regexSenha)) {
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color = "red";
        flag = 1;
        console.log(senha.value)
    } else if (senhaContemNomeAno(senha.value, nome.value, ano.value)) {
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color = "red";
        flag = 1;
    } else {
        const strength = NivelDeSeguranca(senha.value);
        let nivelSenha;
        let meterValue;

        switch (strength) {
            case 'fraca':
                nivelSenha = 'Fraca';
                meterValue = 10; 
                break;
            case 'moderada':
                nivelSenha = 'Moderada';
                meterValue = 20;
                break;
            case 'forte':
                nivelSenha = 'Forte';
                meterValue = 30;
                break;
            default:
                nivelSenha = 'Fraca';
                meterValue = 0;
        }

        nivel.value = meterValue;
        senhaHelp.textContent = `Senha ${nivelSenha}`;
        senhaHelp.style.color = "green";
        flag = 0;

    }

    arrFlag[3] = flag;
});

btnMostraSenha.addEventListener('click', function () {
    var type = senha.getAttribute('type') === 'password' ? 'text' : 'password';
    senha.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Mostrar' : 'Esconder';
});

function validarFormulario() {
    if (arrFlag.includes(1)) {
        resultado.textContent = "Cadastro inválido";
        return false;
    } else {
        resultado.textContent = "Parabéns seus dados foram registrados :)";
        resultado.style.color = "green";
        return true;
    }
}
