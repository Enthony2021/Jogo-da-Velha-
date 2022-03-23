var quadro = document.querySelectorAll('.quadro');
var tela = document.querySelector('.tela');
var mudaJogador = 1;
var contaClick = 0;
var playerOne, playerTwo;
var mensagens = document.querySelector('.mensagens');
var telaInput = document.createElement('div');
var mensagenDoResultado;
var pontosP1 = 0;
var pontosP2 = 0;
var flagContinuar = false;
var gameStart = document.querySelector('.game-start');
var i;


function criaTelaInput(cb) {

    let labelOne = document.createElement('label');
    let labelTwo = document.createElement('label');
    let inputOne = document.createElement('input');
    let inputTwo = document.createElement('input');
    let buttonIniciar = document.createElement('button');

    telaInput.classList.add('tela-input');
    tela.appendChild(telaInput);

    labelOne.innerHTML = 'Jogador 1';
    labelOne.classList.add('label-input');
    telaInput.appendChild(labelOne);
    inputOne.setAttribute('type', Text);
    inputOne.classList.add('input-player');
    telaInput.appendChild(inputOne);

    labelTwo.innerHTML = 'Jogador 2';
    labelTwo.classList.add('label-input');
    telaInput.appendChild(labelTwo);
    inputTwo.setAttribute('type', Text);
    inputTwo.classList.add('input-player');
    telaInput.appendChild(inputTwo);

    telaInput.appendChild(buttonIniciar);
    buttonIniciar.classList.add('button-iniciar');
    buttonIniciar.innerHTML = '&#9654';

    inputOne.addEventListener('focus', function() {
        inputOne.addEventListener('keypress', e => {
            if(e.keyCode === 13 && inputOne.value) {
                inputTwo.focus();
            }
        });
    });

    inputTwo.addEventListener('focus', function(){
        inputTwo.addEventListener('keypress', e => {
            if(e.keyCode === 13 && inputTwo.value) {
                buttonIniciar.focus();
            }
        });
    });

    // Para Iniciar o Jogo
    buttonIniciar.addEventListener('click', () => {
        if (inputOne.value && inputTwo.value) {
            if (inputOne.value === inputTwo.value) return alert('Jogadores com nomes iguais!');
            playerOne = inputOne.value;
            playerTwo = inputTwo.value;
            telaInput.style.display = 'none';
            if (cb) cb();
        } else {
            alert('Nome dos Jogadores Vazio ou Incompleto!');
        }
    });
}

function mostraMensagem() {
    if (telaInput.style.display === 'none') {
        if (mudaJogador === 1) mensagemText = `Vez de ${playerOne}`;
        if (mudaJogador === 2) mensagemText = `Vez de ${playerTwo}`;
        mensagens.innerHTML = mensagemText;
    }
}

function jogando() {
    document.addEventListener('click', (e) => {
        let quadroCliked = e.target;
        let mensagemText;

        mostraMensagem();

        if (quadroCliked.classList.contains('quadro') && !quadroCliked.innerHTML && mudaJogador === 1) {
            quadroCliked.innerHTML = 'X';
            contaClick++;
            if (contaClick > 4) avaliaVencedor();
            mudaJogador = 2;

        }

        if (quadroCliked.classList.contains('quadro') && !quadroCliked.innerHTML && mudaJogador === 2) {
            quadroCliked.innerHTML = 'O';
            contaClick++;
            if (contaClick > 4) avaliaVencedor();
            mudaJogador = 1;

        }
        mostraMensagem();
    });
}

function avaliaVencedor() {
    result = [quadro[0].innerHTML + quadro[1].innerHTML + quadro[2].innerHTML,
    quadro[3].innerHTML + quadro[4].innerHTML + quadro[5].innerHTML,
    quadro[6].innerHTML + quadro[7].innerHTML + quadro[8].innerHTML,
    quadro[0].innerHTML + quadro[3].innerHTML + quadro[6].innerHTML,
    quadro[1].innerHTML + quadro[4].innerHTML + quadro[7].innerHTML,
    quadro[2].innerHTML + quadro[5].innerHTML + quadro[8].innerHTML,
    quadro[0].innerHTML + quadro[4].innerHTML + quadro[8].innerHTML,
    quadro[2].innerHTML + quadro[4].innerHTML + quadro[6].innerHTML];

    for (i = 0; i < result.length; i++) {
        if (result[i] === 'XXX') {
            mensagenDoResultado = `${playerOne} Venceu!`;
            pontosP1++;
            setTimeout(()=> {
                criarRedLine();
            }, 500);
            
            return setTimeout(()=> {
                telaFinal();
            }, 1000);
            
        }

        if (result[i] === 'OOO') {
            mensagenDoResultado = `${playerTwo} Venceu!`;
            pontosP2++;
            setTimeout(()=> {
                criarRedLine();
            }, 500);

            return setTimeout(()=> {
                telaFinal();
            }, 1000)
        }

        if ((contaClick === 9) && (result[i] !== 'XXX' || result[i] !== 'OOO')) {
            mensagenDoResultado = `Empate!`;
            return setTimeout(()=> {
                telaFinal();
            }, 1000)

        }

    }
}

function telaFinal() {
    telaInput.style.display = 'flex';
    telaInput.innerHTML = '';
    let msgResult = document.createElement('p');
    let botaoOutraPartida = document.createElement('button');
    let botaoRestart = document.createElement('button');


    msgResult.classList.add('msg-result');
    msgResult.innerHTML = mensagenDoResultado;

    botaoOutraPartida.classList.add('button-iniciar');
    botaoRestart.classList.add('button-iniciar');

    botaoOutraPartida.innerHTML = 'Continuar';
    botaoRestart.innerHTML = 'Restart';

    telaInput.appendChild(msgResult);
    telaInput.appendChild(botaoOutraPartida);
    telaInput.appendChild(botaoRestart);
    mensagens.innerHTML = `Pontuação ${playerOne}: ${pontosP1} || ${playerTwo}: ${pontosP2}`

    botaoOutraPartida.addEventListener('click', () => {
        let trono;
        trono = playerOne;
        playerOne = playerTwo;
        playerTwo = trono;

        trono = pontosP1;
        pontosP1 = pontosP2;
        pontosP2 = trono;

        telaInput.style.display = 'none';
        for (let caixa of quadro) {
            caixa.innerHTML = '';
        }
        mensagens.innerHTML = '';
        mudaJogador = 1;
        contaClick = 0;
    });

    botaoRestart.addEventListener('click', () => {
        telaInput.innerHTML = '';
        for (let caixa of quadro) {
            caixa.innerHTML = '';
        }
        mensagens.innerHTML = '';
        mudaJogador = 1;
        contaClick = 0;
        criaTelaInput();
    });
}

function criarRedLine() {
    let redLine = document.createElement('div');
    redLine.classList.add('red-line');
    gameStart.appendChild(redLine);

    if(i===0) {
        redLine.style.marginTop = '-66.8%';
    }

    if(i===2) {
        redLine.style.marginTop = '66.8%';
    }

    if(i===3) {
        redLine.style.left = '-27.5%';
        redLine.style.transform = 'rotate(90deg)';
    }

    if(i===4) {
        redLine.style.transform = 'rotate(90deg)';
    }

    if(i===5) {
        redLine.style.right = '-27.5%';
        redLine.style.transform = 'rotate(90deg)';;
    }

    if(i===6) {
        redLine.style.transform ='rotate(45deg)';
        redLine.style.width = '120%';
    }

    if(i===7) {
        redLine.style.transform ='rotate(-45deg)';
        redLine.style.width = '120%';
    }

    setTimeout(() => {
        gameStart.removeChild(redLine);
    }, 1000);
}

{
    
    criaTelaInput(jogando());
}





