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

  function squaresMatch(square1, square2) {
    if (square1[0] === square2[0] && square1[1] === square2[1]) return true;
    return false;
  }

  function print(knightLocation) {
    board.forEach((row) => {
      let strRow = "";
      row.forEach((square) => {
        if (squaresMatch(square, knightLocation)) strRow += "[ N ]";
        else strRow += `[${square[0]} ${square[1]}]`;
      });
      console.log(strRow);
    });
  }

  return { getBoard, print, squaresMatch };
})();

const knight = (() => {
  let location = [0, 0];
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

const pathFinder = (() => {
  const node = (location, parent) => ({
    location,
    parent,
    addChild(child) {
      this.children.push(child);
    },
  });

  function findPath(start, target) {
    let path = "";
    const baseNode = node(start, null);
    const queue = [baseNode];

    while (true) {
      const currentNode = queue.shift();
      if (chessBoard.squaresMatch(currentNode.location, target)) {
        // eslint-disable-next-line no-inner-declarations
        function recur(retracedNode) {
          if (retracedNode.parent === null)
            return `Path: [${retracedNode.location[0]}, ${retracedNode.location[1]}]`;

          return `${recur(retracedNode.parent)} , [${
            retracedNode.location[0]
          }, ${retracedNode.location[1]}]`;
        }
        path += recur(currentNode);
        break;
      }

      for (const move of knight.listPossibleMoves(currentNode.location)) {
        // console.log(move);
        queue.push(node(move, currentNode));
      }
    }

    return path;
  }

  return { findPath };
})();

knight.setLocation([4, 7]);
chessBoard.print(knight.getLocation());
console.log(pathFinder.findPath(knight.getLocation(), [7, 7]));
