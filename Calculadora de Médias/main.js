const form = document.getElementById('form-atividade');
const imgApproved = '<img src="aprovado.png" alt="Emoji celebrando" />';
const imgAprovado = '<img src ="aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src ="reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];

let linhas = '';

let mediaMinima = parseFloat(prompt("Digite a média mínima para aprovação:", "7"));


if (isNaN(mediaMinima) || mediaMinima < 0 || mediaMinima > 10) {
    alert("Valor inválido! A média mínima foi definida para 7 por padrão.");
    mediaMinima = 7;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();  
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (inputNomeAtividade.value && inputNotaAtividade.value) {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= mediaMinima ? imgApproved : imgReprovado}</td>`;
        linha += '</tr>';

        linhas += linha;

        inputNomeAtividade.value = '';
        inputNotaAtividade.value = '';
    } else {
        alert('Por favor, insira o nome da atividade e a nota.');
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= mediaMinima ? '<span class="resultado aprovado">Aprovado</span>' : '<span class="resultado reprovado">Reprovado</span>';
}

function calculaMediaFinal() {
    if (notas.length === 0) return 0;  

    const somaDasNotas = notas.reduce((acc, nota) => acc + nota, 0);
    return somaDasNotas / notas.length;
}