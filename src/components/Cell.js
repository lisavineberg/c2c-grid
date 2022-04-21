import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { GeneralContext } from "./../App";

const StyledCell = styled.span`
  background-color: ${props => props.bgColor};
  outline: 1px solid black;
`;

const Cell = ({ index }) => {
  const [cellColor, setCellColor] = useState();
  const { cells, setCells, selectedColor } = useContext(GeneralContext);

  useEffect(() => {
    setCellColor(cells[index].color);
  }, [cells]);

  const changeCellColor = () => {
    setCellColor(selectedColor);

    let allCells = [...cells];
    let changedCell = {...cells[index]};
    changedCell.color = selectedColor;
    allCells[index] = changedCell;
    setCells(allCells);
  }

  return (
    <StyledCell bgColor={cellColor} onClick={changeCellColor} index={index} />
  )
}

export default Cell;
