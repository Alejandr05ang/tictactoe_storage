const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const winConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
]
let options = ['', '', '', '', '', '', '', '', '',]
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Turno de ${currentPlayer}`;
    updateActivePlayerUI();
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cell-index");

    if(options[cellIndex] !== "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = (currentPlayer == "X") ? "#1892EA" : "#A737FF";
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Turno de ${currentPlayer}`;
    updateActivePlayerUI();
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }

    }

    if(roundWon){
        statusText.textContent = `Jugador ${currentPlayer} gana!`;
        running = false;
    } else if(!options.includes("")){
        statusText.textContent = `Empate!`;
    } else {
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ['', '', '', '', '', '', '', '', '',];
    statusText.textContent = `Turno de ${currentPlayer}`;
    cells.forEach(cell => { cell.textContent = ""; cell.style.color = ""; });
    updateActivePlayerUI();
    running = true;
}

function updateActivePlayerUI(){
    if(!xPlayerDisplay || !oPlayerDisplay) return;
    if(currentPlayer === 'X'){
        xPlayerDisplay.classList.add('player-active');
        oPlayerDisplay.classList.remove('player-active');
    } else {
        oPlayerDisplay.classList.add('player-active');
        xPlayerDisplay.classList.remove('player-active');
    }
}