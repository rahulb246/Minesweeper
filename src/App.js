// Author : Rahul Bojanapally

import React from "react";
import "./App.css";
import Board from "./components/Board/Board";

export default function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Board />
    </div>
  );
}
