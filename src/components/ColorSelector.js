import React, { useState, useContext } from "react";
import styled from "styled-components";

import { GeneralContext } from "./../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  button {
    margin-bottom: 20px;
  }
`;

const ColorPickerContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ColorPicker = styled.input`
  margin-bottom: 0;
  margin-right: 5px;
  width: 30px;
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

const ColorSelector = ({ storedColors, setStoredColors }) => {
  const { cells, setCells, selectedColor, setSelectedColor } = useContext(GeneralContext);

  const handleChange = (e) => {
    setSelectedColor(e.target.value);
  }

  const applyToAll = (color) => {
    const mapped = cells.map(cell => {
      return { color: color}
    });
    setCells(mapped);
  }

  const storeColor = () => {
    let listOfColors = [...storedColors];
    listOfColors.push(selectedColor);
    setStoredColors(listOfColors);
  }

  return (
    <Container>
      <h2>Colors 
        {/* <button onClick={this.minimizeColors}>Minimize</button> */}
      </h2>
      <ColorPickerContainer>
        <ColorPicker id="color-picker" type="color" value={selectedColor} onChange={handleChange} />
        <label htmlFor="color-picker">Pick a color</label>
      </ColorPickerContainer>
      <Button onClick={() => applyToAll("#fff")}>Clear whole grid</Button>
      <Button onClick={() => applyToAll(selectedColor)}>Apply color to whole grid</Button>
      <Button onClick={storeColor}>Add to color palette</Button>
    </Container>
  )
}

export default ColorSelector;
