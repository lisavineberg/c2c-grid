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

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  font-family: 'Open Sans';
  max-width: 200px;
  padding: 5px;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const ColorPalette = ({ storedColors, setStored }) => {
  const { cells, setCells, selectedColor, setSelectedColor } = useContext(GeneralContext);

  const updateColor = (color) => {
    const newColor = selectedColor;
    const newCells = cells.map(cell => {
      if (cell.color === color) {
        cell.color = newColor;
      }
      return cell;
    })
    setCells(newCells);

    const newStoredColors = storedColors.map(item => {
      if (item === color) {
        item = selectedColor;
      }
      return item;
    })
    setStored(newStoredColors);
  }

  return (
    <div>
      <h2>Color Palette</h2>
      <StyledColorPalette>
        {storedColors.map((color, index) => 
            <ColorPaletteItem key={`color-palette-${index}`}>
              Color {index + 1}
              <Swatch bgColor={color} />
              <Button onClick={() => setSelectedColor(color)}>Use this color</Button>
              <Button onClick={() => updateColor(color)}>Update this color</Button>
            </ColorPaletteItem>
        )}
      </StyledColorPalette>
    </div>
  )
}

export default ColorPalette;