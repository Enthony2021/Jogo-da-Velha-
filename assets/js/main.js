"use strict";
class Game {
    constructor() {
        this.quadro = document.querySelectorAll(".quadro");
        this.tela = document.querySelector(".tela");
        this.mensagens = document.querySelector(".mensagens");
        this.gameStart = document.querySelector(".game-start");
        this.chineseMusic = document.querySelector(".chineseMusic");
        this.waterMusic = document.querySelector(".waterMusic");
        this.swordMusic = document.querySelector(".swordMusic");
        this.mudaJogador = 1;
        this.contaClick = 0;
        this.pontosP1 = 0;
        this.pontosP2 = 0;
        this.vencedorOuEmpate = false;
        this.telaInput = document.createElement("div");
        this.labelOne = document.createElement("label");
        this.labelTwo = document.createElement("label");
        this.inputOne = document.createElement("input");
        this.inputTwo = document.createElement("input");
        this.buttonIniciar = document.createElement("button");
    }
    // Music background
    playBgMusic() {
        document.addEventListener("click", () => {
            if (this.chineseMusic)
                this.chineseMusic.play();
        });
    }
    sound(music) {
        if (music)
            music.play();
    }
    criaTelaInput() {
        this.telaInput.classList.add("tela-input");
        if (this.tela)
            this.tela.appendChild(this.telaInput);
        this.labelOne.innerHTML = "P1";
        this.labelOne.classList.add("label-input");
        this.telaInput.appendChild(this.labelOne);
        this.inputOne.setAttribute("type", "Text");
        this.inputOne.classList.add("input-player");
        this.telaInput.appendChild(this.inputOne);
        this.labelTwo.innerHTML = "P2";
        this.labelTwo.classList.add("label-input");
        this.telaInput.appendChild(this.labelTwo);
        this.inputTwo.setAttribute("type", "Text");
        this.inputTwo.classList.add("input-player");
        this.telaInput.appendChild(this.inputTwo);
        this.telaInput.appendChild(this.buttonIniciar);
        this.buttonIniciar.classList.add("button-iniciar");
        this.buttonIniciar.innerHTML = "➤";
        this.inputOne.addEventListener("focus", (el) => {
            if (el.target)
                el.target.addEventListener("keypress", (e) => {
                    if (e instanceof KeyboardEvent &&
                        e.keyCode === 13 &&
                        this.inputOne.value) {
                        this.inputTwo.focus();
                    }
                });
        });
        this.inputTwo.addEventListener("focus", (el) => {
            if (el.target)
                el.target.addEventListener("keypress", (e) => {
                    if (e instanceof KeyboardEvent &&
                        e.keyCode === 13 &&
                        this.inputTwo.value) {
                        this.buttonIniciar.focus();
                    }
                });
        });
        // Para Iniciar o Jogo
        this.buttonIniciar.addEventListener("click", () => {
            if (this.inputOne.value && this.inputTwo.value) {
                if (this.inputOne.value === this.inputTwo.value)
                    return alert("Jogadores com nomes iguais!");
                this.playerOne = this.inputOne.value;
                this.playerTwo = this.inputTwo.value;
                this.telaInput.style.display = "none";
                this.jogando();
            }
            else {
                alert("Nome dos Jogadores Vazio ou Incompleto!");
            }
        });
    }
    mostraMensagem() {
        if (this.telaInput && this.telaInput.style.display === "none") {
            if (this.mudaJogador === 1)
                this.mensagemText = `Vez de ${this.playerOne}`;
            if (this.mudaJogador === 2)
                this.mensagemText = `Vez de ${this.playerTwo}`;
            if (this.mensagens)
                this.mensagens.innerHTML = this.mensagemText;
        }
    }
    telaFinal() {
        this.telaInput.style.display = "flex";
        this.telaInput.innerHTML = "";
        let msgResult = document.createElement("p");
        let botaoOutraPartida = document.createElement("button");
        let botaoRestart = document.createElement("button");
        msgResult.classList.add("msg-result");
        msgResult.innerHTML = this.mensagenDoResultado;
        botaoOutraPartida.classList.add("button-iniciar");
        botaoRestart.classList.add("button-iniciar");
        botaoOutraPartida.innerHTML = "Continuar";
        botaoRestart.innerHTML = "Restart";
        this.telaInput.appendChild(msgResult);
        this.telaInput.appendChild(botaoOutraPartida);
        this.telaInput.appendChild(botaoRestart);
        if (this.mensagens)
            this.mensagens.innerHTML = `Pontuação ${this.playerOne}: ${this.pontosP1} || ${this.playerTwo}: ${this.pontosP2}`;
        botaoOutraPartida.addEventListener("click", () => {
            this.trono = this.playerOne;
            this.playerOne = this.playerTwo;
            this.playerTwo = this.trono;
            this.trono = this.pontosP1;
            this.pontosP1 = this.pontosP2;
            this.pontosP2 = this.trono;
            this.telaInput.style.display = "none";
            for (let caixa of this.quadro) {
                caixa.innerHTML = "";
            }
            if (this.mensagens)
                this.mensagens.innerHTML = "";
            this.mudaJogador = 1;
            this.contaClick = 0;
        });
        botaoRestart.addEventListener("click", () => {
            this.telaInput.innerHTML = "";
            this.playerOne = "";
            this.playerTwo = "";
            this.inputOne.value = "";
            this.inputTwo.value = "";
            this.pontosP1 = 0;
            this.pontosP2 = 0;
            for (let caixa of this.quadro) {
                caixa.innerHTML = "";
            }
            if (this.mensagens)
                this.mensagens.innerHTML = "";
            this.mudaJogador = 1;
            this.contaClick = 0;
            this.criaTelaInput();
        });
    }
    criarRedLine() {
        let redLine = document.createElement("div");
        redLine.classList.add("red-line");
        if (this.gameStart)
            this.gameStart.appendChild(redLine);
        if (this.redPosition === 0) {
            redLine.style.marginTop = "-66.8%";
        }
        if (this.redPosition === 2) {
            redLine.style.marginTop = "66.8%";
        }
        if (this.redPosition === 3) {
            redLine.style.left = "-27.5%";
            redLine.style.transform = "rotate(90deg)";
        }
        if (this.redPosition === 4) {
            redLine.style.transform = "rotate(90deg)";
        }
        if (this.redPosition === 5) {
            redLine.style.right = "-27.5%";
            redLine.style.transform = "rotate(90deg)";
        }
        if (this.redPosition === 6) {
            redLine.style.transform = "rotate(45deg)";
            redLine.style.width = "120%";
        }
        if (this.redPosition === 7) {
            redLine.style.transform = "rotate(-45deg)";
            redLine.style.width = "120%";
        }
        setTimeout(() => {
            if (this.gameStart)
                this.gameStart.removeChild(redLine);
        }, 1000);
    }
    avaliaVencedor() {
        this.result = [
            this.quadro[0].innerHTML +
                this.quadro[1].innerHTML +
                this.quadro[2].innerHTML,
            this.quadro[3].innerHTML +
                this.quadro[4].innerHTML +
                this.quadro[5].innerHTML,
            this.quadro[6].innerHTML +
                this.quadro[7].innerHTML +
                this.quadro[8].innerHTML,
            this.quadro[0].innerHTML +
                this.quadro[3].innerHTML +
                this.quadro[6].innerHTML,
            this.quadro[1].innerHTML +
                this.quadro[4].innerHTML +
                this.quadro[7].innerHTML,
            this.quadro[2].innerHTML +
                this.quadro[5].innerHTML +
                this.quadro[8].innerHTML,
            this.quadro[0].innerHTML +
                this.quadro[4].innerHTML +
                this.quadro[8].innerHTML,
            this.quadro[2].innerHTML +
                this.quadro[4].innerHTML +
                this.quadro[6].innerHTML,
        ];
        console.log(this.result);
        for (let j = 0; j < this.result.length; j++) {
            if (this.result[j] === "XXX") {
                this.mensagenDoResultado = `${this.playerOne} Venceu!`;
                this.pontosP1++;
                this.redPosition = j;
                setTimeout(() => {
                    this.sound(this.swordMusic);
                    this.criarRedLine();
                    setTimeout(() => {
                        this.telaFinal();
                    }, 200);
                }, 10);
                return true;
            }
            if (this.result[j] === "OOO") {
                this.mensagenDoResultado = `${this.playerTwo} Venceu!`;
                this.pontosP2++;
                this.redPosition = j;
                setTimeout(() => {
                    this.sound(this.swordMusic);
                    this.criarRedLine();
                    setTimeout(() => {
                        this.telaFinal();
                    }, 200);
                }, 10);
                return true;
            }
            if (this.contaClick === 9 &&
                this.result[j] !== "XXX" &&
                this.result[j] !== "OOO") {
                this.mensagenDoResultado = `Empate!`;
                setTimeout(() => {
                    this.telaFinal();
                }, 200);
                return true;
            }
        }
        return false;
    }
    jogando() {
        document.addEventListener("click", (e) => {
            this.mostraMensagem();
            if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains("quadro") && !e.target.innerHTML) {
                    if (this.mudaJogador === 1) {
                        this.sound(this.waterMusic);
                        e.target.innerHTML = "X";
                        this.contaClick++;
                        if (this.contaClick > 4) {
                            this.vencedorOuEmpate = this.avaliaVencedor();
                        }
                        if (this.vencedorOuEmpate) {
                            this.vencedorOuEmpate = !this.vencedorOuEmpate;
                            return;
                        }
                        this.mudaJogador = 2;
                        this.mostraMensagem();
                        return;
                    }
                    if (this.mudaJogador === 2) {
                        this.sound(this.waterMusic);
                        e.target.innerHTML = "O";
                        this.contaClick++;
                        if (this.contaClick > 4) {
                            this.vencedorOuEmpate = this.avaliaVencedor();
                        }
                        if (this.vencedorOuEmpate) {
                            this.vencedorOuEmpate = !this.vencedorOuEmpate;
                            return;
                        }
                        this.mudaJogador = 1;
                        this.mostraMensagem();
                        return;
                    }
                }
            }
        });
    }
}
const game = new Game();
game.playBgMusic();
game.criaTelaInput();
