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

  function print(knightLocation) {
    board.forEach((row) => {
      let strRow = "";
      row.forEach((square) => {
        if (square[0] === knightLocation[0] && square[1] === knightLocation[1])
          strRow += "[ N ]";
        else strRow += `[${square[0]} ${square[1]}]`;
      });
      console.log(strRow);
    });
  }

  return { getBoard, print };
})();

const knight = (() => {
  let location = [7, 6];
  function setLocation(newLocation) {
    location = newLocation;
  }
  function getLocation() {
    return location;
  }

  function listPossibleMoves(currentLocation) {
    const possibleMoves = [];

    // Vertical Up
    if (currentLocation[0] - 2 >= 0 && currentLocation[1] - 1 >= 0)
      possibleMoves.push([currentLocation[0] - 2, currentLocation[1] - 1]);
    if (currentLocation[0] - 2 >= 0 && currentLocation[1] + 1 <= 7)
      possibleMoves.push([currentLocation[0] - 2, currentLocation[1] + 1]);

    // Vertical Down
    if (currentLocation[0] + 2 <= 7 && currentLocation[1] - 1 >= 0)
      possibleMoves.push([currentLocation[0] + 2, currentLocation[1] - 1]);
    if (currentLocation[0] + 2 <= 7 && currentLocation[1] + 1 <= 7)
      possibleMoves.push([currentLocation[0] + 2, currentLocation[1] + 1]);

    // Horizontal Right
    if (currentLocation[0] - 1 >= 0 && currentLocation[1] + 2 <= 7)
      possibleMoves.push([currentLocation[0] - 1, currentLocation[1] + 2]);
    if (currentLocation[0] + 1 <= 7 && currentLocation[1] + 2 <= 7)
      possibleMoves.push([currentLocation[0] + 1, currentLocation[1] + 2]);

    // Horizontal Left
    if (currentLocation[0] - 1 >= 0 && currentLocation[1] - 2 >= 0)
      possibleMoves.push([currentLocation[0] - 1, currentLocation[1] - 2]);
    if (currentLocation[0] + 1 <= 7 && currentLocation[1] - 2 >= 0)
      possibleMoves.push([currentLocation[0] + 1, currentLocation[1] - 2]);

    return possibleMoves;
  }

  return { setLocation, getLocation, listPossibleMoves };
})();

chessBoard.print(knight.getLocation());
console.log(knight.listPossibleMoves(knight.getLocation()));
