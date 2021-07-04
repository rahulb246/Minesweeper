// Author : Rahul Bojanapally

import React, { useRef, useState } from "react";
import { createBoard, revealCells } from "./utils";
import Cell from "./Cell";
import Message from "../Message/Message";
import Dropdown from "../Dropdown/Dropdown";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMineCellsCount, setNonMineCellsCount] = useState(0);
  const [solved, setSolved] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const minesForlevels = {
    Easy: 10,
    Medium: 15,
    Hard: 20
  };
  const level = useRef(null);

  const SOLVED_MSG =
    "Congratulations, you've completed the game!! Click Restart to try again.";
  const LOSTGAME_MSG = "You've lost the game!! Click Restart to try again.";

  const createNewBoard = () => {
    const minesCount = minesForlevels[level.current || "Easy"];
    const newBoard = createBoard(10, 10, minesCount);
    setNonMineCellsCount(10 * 10 - minesCount);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  const restart = () => {
    createNewBoard();
    setSolved(false);
    setStartGame(true);
  };

  const handleCellClick = (x, y) => {
    if (grid[x][y].clicked || solved) return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "M") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].clicked = true;
      }
      setGrid(newGrid);
      setSolved(false);
      setStartGame(false);
    } else {
      let revealedBoard = revealCells(newGrid, x, y, nonMineCellsCount);
      setGrid(revealedBoard.arr);
      setNonMineCellsCount(revealedBoard.newNonMinesCount);
      if (revealedBoard.newNonMinesCount === 0) {
        setSolved(true);
        setStartGame(false);
      }
    }
  };

  return (
    <div className="boardClass">
      <Dropdown
        label="Choose Level: "
        values={Object.keys(minesForlevels)}
        onChange={(val) => {
          level.current = val;
        }}
        initialValue={minesForlevels[0]}
      />
      <button onClick={restart}>{solved !== null ? "Restart" : "Start"}</button>
      {!startGame && solved !== null && (
        <Message
          text={solved ? SOLVED_MSG : LOSTGAME_MSG}
          textColor={solved ? "green" : "red"}
        />
      )}
      {(startGame || solved !== null) && (
        <div
          style={
            !startGame && solved !== null
              ? { pointerEvents: "none", opacity: "0.4" }
              : {}
          }
        >
          {grid.map((row, rIdx) => {
            return (
              <div style={{ display: "flex" }} key={rIdx}>
                {row.map((col, cIdx) => {
                  return (
                    <Cell key={cIdx} onClick={handleCellClick} cellInfo={col} />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Board;
