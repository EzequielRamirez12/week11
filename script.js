const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart-button');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWin();
    if (winner) {
        gameActive = false;
        message.textContent = `${winner} wins!`;
        message.classList.add('alert');
    } else if (checkDraw()) {
        gameActive = false;
        message.textContent = 'It\'s a draw!';
        message.classList.add('alert');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    message.classList.remove('alert');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
