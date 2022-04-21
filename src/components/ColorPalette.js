import React, { useContext } from "react";
import styled from "styled-components";

import { GeneralContext } from "./../App";

const StyledColorPalette = styled.ul`
  padding: 0;
`;

const ColorPaletteItem = styled.li`
  align-items: center;
  display: flex;
  margin-bottom: 4px;

  button {
    margin-right: 10px;
  }
`;

const Swatch = styled.span`
  background-color: ${props => props.bgColor};
  border: 1px solid black;
  display: inline-block;
  height: 20px;
  margin: 0 10px;
  width: 20px;
`;

const ColorPalette = ({ storedColors, setStored }) => {
  const { cells, setCells, selectedColor, setSelectedColor } = useContext(GeneralContext);

  // const updateColor = (color) => {
  //   const newColor = selectedColor;
  //   const newCells = cells.forEach(cell => {
  //     if (cell.color === color) {
  //       cell.color = newColor;
  //     }
  //   })
  //   setCells(newCells);

  //   const index = storedColors.indexOf(color);
  //   if (index > -1) {
  //     storedColors[index] = newColor;
  //     // setStored(storedColors);
  //   }
  // }

  return (
    <div>
      <h2>Color Palette</h2>
      <StyledColorPalette>
        {storedColors.map((color, index) => 
            <ColorPaletteItem key={`color-palette-${index}`}>
              Color {index + 1}
              <Swatch bgColor={color} />
              <button onClick={() => setSelectedColor(color)}>Use this color</button>
              {/* <button onClick={() => updateColor(color)}>Update this color</button> */}
            </ColorPaletteItem>
        )}
      </StyledColorPalette>
    </div>
  )
}

export default ColorPalette;