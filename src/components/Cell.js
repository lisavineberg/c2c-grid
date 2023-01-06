import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { GeneralContext } from "./../App";

const StyledCell = styled.span`
  background-color: ${props => props.bgColor};
  outline: 1px solid black;
  opacity: ${props => props.opacity};
`;

const Cell = ({ index, showVerticalCenter, showHorizontalCenter }) => {
  const [cellColor, setCellColor] = useState();
  const [opacity, setOpacity] = useState(1);
  const { cells, setCells, selectedColor, rows, columns } = useContext(GeneralContext);

  useEffect(() => {
    setCellColor(cells[index].color);
    const verticalMid = Math.floor(columns / 2);
    const hortizontalMid = Math.floor(rows / 2);

    if (showVerticalCenter) {
      if (((index - verticalMid) % columns) === 0) {
        setOpacity(0.5);
      }
    }

    if (showHorizontalCenter) {
      const min = (hortizontalMid - 0) * rows;
      const max = (hortizontalMid + 1) * rows;
      if (index >= min && index < max) {
        setOpacity(0.5);
      } 
    }
  }, [cells, index, showVerticalCenter, showHorizontalCenter, columns, rows]);

  const changeCellColor = () => {
    setCellColor(selectedColor);

    let allCells = [...cells];
    let changedCell = {...cells[index]};
    changedCell.color = selectedColor;
    allCells[index] = changedCell;
    setCells(allCells);
  }

  return (
    <StyledCell bgColor={cellColor} onClick={changeCellColor} index={index} opacity={opacity} />
  )
}

export default Cell;
