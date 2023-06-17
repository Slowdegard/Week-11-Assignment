document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const turnDisplay = document.getElementById('turn');
  const resetButton = document.getElementById('reset');
  const alert = document.createElement('div');
  const alertMessage = document.createElement('div');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameOver = false;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleClick = (event) => {
    const cell = event.target;
    const index = parseInt(cell.id.split('-')[1]);

    if (gameBoard[index] === '' && !gameOver) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(`player-${currentPlayer}`);
      checkGameStatus();
      togglePlayer();
    }
  };

  const togglePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `It's ${currentPlayer}'s turn`;
  };

  const checkGameStatus = () => {
    if (checkWin()) {
      endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
      endGame("It's a draw!");
    }
  };

  const checkWin = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] === currentPlayer &&
        gameBoard[b] === currentPlayer &&
        gameBoard[c] === currentPlayer
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => {
    return gameBoard.every((cell) => cell !== '');
  };

  const endGame = (message) => {
    gameOver = true;
    alertMessage.textContent = message;
    alert.classList.add('alert');
    alertMessage.classList.add('alert-message');
    alert.appendChild(alertMessage);
    document.body.appendChild(alert);
  };

  const resetGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    turnDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('player-X', 'player-O');
    });
    alert.remove();
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
  });

  resetButton.addEventListener('click', resetGame);
});

