// Author : Rahul Bojanapally

import React from "react";

/**
 * A basic component which returns a colored circle to mimic mine in Minesweeper game
 */
const Mine = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          height: 20,
          width: 20,
          borderRadius: 20,
          background: "rgba(0,0,0,0.5)"
        }}
      ></div>
    </div>
  );
};

export default Mine;
