// Author : Rahul Bojanapally

const cellNeighbours = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1]
];

const initialiseBoard = (board, row, col) => {
  for (let i = 0; i < row; i++) {
    const subCol = [];
    for (let j = 0; j < col; j++) {
      subCol.push({
        value: 0,
        clicked: false,
        x: i,
        y: j
      });
    }
    board.push(subCol);
  }
};

const placeMines = (board, row, col, noOfMines, mineLocation) => {
  let minesCount = 0;
  while (minesCount < noOfMines) {
    let x = Math.floor(Math.random() * row);
    let y = Math.floor(Math.random() * col);

    if (board[x][y].value === 0) {
      board[x][y].value = "M";
      mineLocation.push([x, y]);
      minesCount++;
    }
  }
};

const isValidCell = (i, j, row, col) => {
  return i >= 0 && i < row && j >= 0 && j < col;
};

const addMinesCountInBoardCells = (board, row, col) => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].value === "M") continue;
      cellNeighbours.forEach((cell) => {
        if (
          isValidCell(i + cell[0], j + cell[1], row, col) &&
          board[i + cell[0]][j + cell[1]].value === "M"
        )
          board[i][j].value++;
      });
    }
  }
};

export const createBoard = (row, col, noOfMines) => {
  const board = [];
  const mineLocation = [];

  initialiseBoard(board, row, col);
  placeMines(board, row, col, noOfMines, mineLocation);
  addMinesCountInBoardCells(board, row, col);

  return { board, mineLocation };
};

export const revealCells = (arr, x, y, newNonMinesCount) => {
  if (arr[x][y].clicked) return;

  let revealed = [];
  revealed.push(arr[x][y]);
  // use BFS to reveal all neighbouring cells with value 0 & which are not clicked yet
  while (revealed.length !== 0) {
    let clickedCell = revealed.pop();

    if (!clickedCell.clicked) {
      newNonMinesCount--;
      clickedCell.clicked = true;
    }
    if (clickedCell.value !== 0) {
      break;
    }

    cellNeighbours.forEach((cell) => {
      if (
        isValidCell(
          clickedCell.x + cell[0],
          clickedCell.y + cell[1],
          arr.length,
          arr[0].length
        ) &&
        !arr[clickedCell.x + cell[0]][clickedCell.y + cell[1]].clicked
      ) {
        if (arr[clickedCell.x + cell[0]][clickedCell.y + cell[1]].value === 0)
          revealed.push(arr[clickedCell.x + cell[0]][clickedCell.y + cell[1]]);

        arr[clickedCell.x + cell[0]][clickedCell.y + cell[1]].clicked = true;
        newNonMinesCount--;
      }
    });
  }

  return { arr, newNonMinesCount };
};
