// We store our game status elements here to allow us to more easily use it later on

const statusDisplay = document.querySelector('.game--status');

// Declare variables to track the game state throughout the game
let gameActive = true;
// Storing our current player
let currentPlayer = "X";
// Storing our current game state, the form of empty strings in
// will allow us to easily track played cells and validate game state
let gameState = ["", "", "", "", "", "", "", "", ""];

/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with
current data every time we need it.
*/
const winningMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

// We set the initial message to let player know whose turn it is

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // We update our internal game state to reflect the played move, as well as update the UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    // Checking wether there are any values in our game state array that are still not populated with a player sign
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    // If we get here we know that nobody won the game yet, and we got more moves so we continue by changing the player
    handlePlayerChange();
}
function handleCellClick(clickedCallEvent) {
    // We save the clicked html element in a var for easier further use
    const clickedCall = clickedCallEvent.target;
    /*
    Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid.
    Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an
    integer(number)
    */
    const clickedCellIndex = parseInt(clickedCall.getAttribute('data-cell-index'));
    /*
    Next we need to check whether the cell has already been played, or if the game is paused. If either of those is
    true we will simply ignore the click
     */
    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }
    // If everything is in order we will proceed with the game flow.
    handleCellPlayed(clickedCall, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Our event listeners

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);