import React from "react";
import styled from "styled-components";

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
  background-color: ${(props) => props.bgColor};
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
  font-family: "Open Sans";
  max-width: 200px;
  padding: 5px;

  &:hover {
    background-color: black;
    color: white;
  }
`;

interface ColorPaletteProps {
  storedColors: string[];
  setStored: (colors: string[]) => void;
  cells: { color: string }[];
  setCells: React.Dispatch<React.SetStateAction<{ color: string }[]>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  storedColors,
  setStored,
  cells,
  setCells,
  selectedColor,
  setSelectedColor,
}) => {
  const updateColor = (color: string) => {
    const newColor = selectedColor;
    const newCells = cells.map((cell) => {
      if (cell.color === color) {
        return { ...cell, color: newColor };
      }
      return cell;
    });
    setCells(newCells);
    const newStoredColors = storedColors.map((item) => {
      return item === color ? selectedColor : item;
    });
    setStored(newStoredColors);
  };

  const calculateCount = (color: string) => {
    return cells.filter((cell) => cell.color === color).length;
  };

  return (
    <div>
      <h2>Color Palette</h2>
      <StyledColorPalette>
        {storedColors.map((color, index) => (
          <ColorPaletteItem key={`color-palette-${index}`}>
            Color {index + 1} ({calculateCount(color)})
            <Swatch bgColor={color} />
            <Button onClick={() => setSelectedColor(color)}>
              Use this color
            </Button>
            <Button onClick={() => updateColor(color)}>
              Update this color
            </Button>
          </ColorPaletteItem>
        ))}
      </StyledColorPalette>
    </div>
  );
};

export default ColorPalette;
