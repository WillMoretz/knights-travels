const chessBoard = (() => {
  function generateBoard() {
    const array = [];
    for (let i = 0; i < 8; i += 1) {
      const column = [];
      for (let j = 0; j < 8; j += 1) {
        column.push([i, j]);
      }
      array.push(column);
    }
    return array;
  }
  const board = generateBoard();

  function getBoard() {
    return board;
  }

  function print() {
    board.forEach((row) => {
      let strRow = "";
      row.forEach((square) => {
        strRow += `[${square[0]} ${square[1]}]`;
      });
      console.log(strRow);
    });
  }

  return { getBoard, print };
})();

chessBoard.print();
