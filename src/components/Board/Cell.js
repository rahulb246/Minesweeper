// Author : Rahul Bojanapally

import React from "react";
import PropTypes from "prop-types";
import Mine from "./Mine";
import "../../App.css";

/**
 * A basic component for selecting value from options in dropdwon
 * @param {object} props Component props
 * @param {object} props.cellInfo board cell object
 * @param {function} props.onClick callback handler when we click on cell
 */
const Cell = (props) => {
  const { cellInfo, onClick } = props;

  const cellStyle = {
    background: cellInfo.clicked
      ? cellInfo.value === "M"
        ? "red"
        : "yellow"
      : "grey",
    color: "black"
  };

  return (
    <div
      onClick={() => onClick(cellInfo.x, cellInfo.y)}
      style={cellStyle}
      className="cellStyle"
    >
      {cellInfo.clicked && cellInfo.value !== 0 ? (
        cellInfo.value === "M" ? (
          <Mine />
        ) : (
          cellInfo.value
        )
      ) : (
        ""
      )}
    </div>
  );
};

Cell.propTypes = {
  cellInfo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

Cell.defaultProps = {
  cellInfo: {},
  onClick: () => {}
};

export default Cell;
