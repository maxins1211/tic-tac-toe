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

  const printBoard = function () {
    const boardWithValue = board.map((row) => {
      return row.map((cell) => {
        return cell.getValue();
      });
    });
    return boardWithValue;
  };

  return {
    getBoard,
    printBoard,
  };
};

function cell() {
  let value = 0;
  function setValue(playerMarker) {
    value = playerMarker;
  }

  function getValue() {
    return value;
  }

  return {
    setValue,
    getValue,
  };
}
