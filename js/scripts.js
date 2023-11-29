const operacaoAnteriorTexto = document.querySelector("#operacao-anterior");
const operacaoAtualTexto = document.querySelector("#operacao-atual");
const botoes = document.querySelectorAll("#container-botoes button");

class Calculadora {
    constructor(operacaoAnteriorTexto, operacaoAtualTexto) {
        this.operacaoAnteriorTexto = operacaoAnteriorTexto;
        this.operacaoAtualTexto = operacaoAtualTexto;
        this.operacaoAtual = "";
    }

    // adicionar dígito à tela da calculadora
    adicionarDigito(digito) {
        console.log(digito);
        // Verificar se o número já possui um ponto decimal
        if (digito === "." && this.operacaoAtualTexto.innerText.includes(".")) {
            return;
        }

        this.operacaoAtual = digito;
        this.atualizarTela();
    }

    // processar todas as operações da calculadora
    processarOperacao(operacao) {
        // Verificar se o valor atual está vazio
        if (this.operacaoAtualTexto.innerText === "" && operacao !== "C") {
            // Mudar a operação
            if (this.operacaoAnteriorTexto.innerText !== "") {
                this.mudarOperacao(operacao);
            }
            return;
        }

        // Obter valores atuais e anteriores
        let valorOperacao;
        let anterior = +((this.operacaoAnteriorTexto.innerText || "").split(" ")[0]);
        let atual = +((this.operacaoAtualTexto.innerText || "").split(" ")[0]);

        switch (operacao) {
            case "+":
                valorOperacao = anterior + atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "DEL":
                this.processarOperadorDel();
                break;
            case "CE":
                this.processarLimparOperadorAtual();
                break;
            case "C":
                this.processarLimparOperador();
                break;
            case "=":
                this.processarOperadorIgual();
                break;
            default:
                return;
        }
    }

    // Alterar valores da tela da calculadora
    atualizarTela(
        valorOperacao = null,
        operacao = null,
        atual = null,
        anterior = null
    ) {
        if (valorOperacao === null) {
            // Adicionar número ao valor atual
            this.operacaoAtualTexto.innerText += this.operacaoAtual;
        } else {
            // Verificar se o valor é zero, se for, apenas adicionar o valor atual
            if (anterior === 0) {
                valorOperacao = atual;
            }
            // Adicionar valor atual ao anterior
            this.operacaoAnteriorTexto.innerText = `${valorOperacao} ${operacao}`;
            this.operacaoAtualTexto.innerText = "";
        }
    }

    // Alterar a operação matemática
    mudarOperacao(operacao) {
        const operacoesMatematicas = ["*", "-", "+", "/"];

        if (!operacoesMatematicas.includes(operacao)) {
            return;
        }

        this.operacaoAnteriorTexto.innerText =
            this.operacaoAnteriorTexto.innerText.slice(0, -1) + operacao;
    }

    // Excluir um dígito
    processarOperadorDel() {
        this.operacaoAtualTexto.innerText =
            this.operacaoAtualTexto.innerText.slice(0, -1);
    }

    // Limpar operação atual
    processarLimparOperadorAtual() {
        this.operacaoAtualTexto.innerText = "";
    }

    // Limpar todas as operações
    processarLimparOperador() {
        this.operacaoAtualTexto.innerText = "";
        this.operacaoAnteriorTexto.innerText = "";
    }

    // Processar uma operação
    processarOperadorIgual() {
        let operacao = this.operacaoAnteriorTexto.innerText.split(" ")[1];

        this.processarOperacao(operacao);
    }
}

const calculadora = new Calculadora(operacaoAnteriorTexto, operacaoAtualTexto);

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;

        if (+valor >= 0 || valor === ".") {
            console.log(valor);
            calculadora.adicionarDigito(valor);
        } else {
            calculadora.processarOperacao(valor);
        }
    });
});
