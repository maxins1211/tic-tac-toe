const gameBoard = function () {
  const board = [],
    row = 3,
    column = 3;

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  const addValueToCell = function (row, column, playerMarker) {
    if (board[row][column].getValue() !== 0) {
      return false;
    } else {
      board[row][column].setValue(playerMarker);
      return true;
    }
  };

  const filledBoard = function () {
    const boardWithValue = board.map((row) => {
      return row.map((cell) => {
        return cell.getValue();
      });
    });
    return boardWithValue;
  };

  return {
    getBoard,
    addValueToCell,
    filledBoard,
  };
};

function cell() {
  let value = 0;
  const setValue = function (playerMarker) {
    value = playerMarker;
  };

  const getValue = () => value;

  return {
    setValue,
    getValue,
  };
}

const gameController = function () {
  let turn = 0;
  const board = gameBoard();

  const players = [
    { name: "Player 1", marker: "X" },
    { name: "Player 2", marker: "O" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = function () {
    activePlayer.name === "Player 1"
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  };

  const playRound = function (row, column) {
    let filledBoard;
    if (board.addValueToCell(row, column, getActivePlayer().marker)) {
      filledBoard = board.filledBoard();
      turn++;
      if (turn === 9 && checkWinner(filledBoard) === false) {
        return "tier";
      }
      if (checkWinner(filledBoard)) {
        return "win";
      } else {
        switchPlayerTurn();
      }
    }
  };

  const checkWinner = function (board) {
    const firstColumn = [],
      secondColumn = [],
      thirdColumn = [],
      firstRow = board[0],
      secondRow = board[1],
      thirdRow = board[2];
    //Left Cross
    const leftCross = [board[0][0], board[1][1], board[2][2]];
    //Right Cross
    const rightCross = [board[2][0], board[1][1], board[0][2]];
    for (let i = 0; i < 3; i++) {
      firstColumn[i] = board[i][0];
      secondColumn[i] = board[i][1];
      thirdColumn[i] = board[i][2];
    }

    if (
      arrayContainSameElement(firstRow) ||
      arrayContainSameElement(secondRow) ||
      arrayContainSameElement(thirdRow) ||
      arrayContainSameElement(firstColumn) ||
      arrayContainSameElement(secondColumn) ||
      arrayContainSameElement(thirdColumn) ||
      arrayContainSameElement(leftCross) ||
      arrayContainSameElement(rightCross)
    ) {
      return true;
    }

    return false;
  };

  function arrayContainSameElement(arr, marker = getActivePlayer().marker) {
    if (arr.filter((e) => e === marker).length === 3) {
      return true;
    } else false;
  }

  return {
    playRound,
    getActivePlayer,
  };
};

const screenDisplay = function () {
  let game = gameController();
  const turnSection = document.querySelector(".turn");
  const cells = document.querySelectorAll(".cell");
  const dialog = document.querySelector("dialog");
  const result = document.querySelector(".result");
  const playAgainBtn = document.querySelector(".play-again");

  playAgainBtn.addEventListener("click", () => {
    resetGame();
    dialog.close();
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.textContent = game.getActivePlayer().marker;
      cell.setAttribute("disabled", "");
      const placeMarkerToCell = game.playRound(
        cell.dataset.row,
        cell.dataset.column
      );

      checkResult(placeMarkerToCell);
      turnSection.textContent = `${game.getActivePlayer().name} turn`;
    });
  });

  function resetGame() {
    game = gameController();
    cells.forEach((cell) => {
      cell.removeAttribute("disabled");
      cell.textContent = "";
    });
    result.textContent = "";
    turnSection.textContent = `${game.getActivePlayer().name} turn`;
  }

  function checkResult(marker) {
    if (marker === "win") {
      result.textContent = `${game.getActivePlayer().name} win!`;
      dialog.showModal();
    }
    if (marker === "tier") {
      result.textContent = "Tier!";
      dialog.showModal();
    }
  }
};

screenDisplay();
