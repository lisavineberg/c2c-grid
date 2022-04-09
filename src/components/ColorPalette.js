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
  background-color: ${props => props.bgColor};
  border: 1px solid black;
  display: inline-block;
  height: 20px;
  margin: 0 10px;
  width: 20px;
`;

const ColorPalette = ({ storedColors }) => {
  return (
    <div>
      <h2>Color Palette</h2>
      <StyledColorPalette>
        {storedColors.map((color, index) => 
            <ColorPaletteItem key={`color-palette-${index}`}>
              Color {index + 1}
              <Swatch bgColor={color} />
              {/* <button onClick={() => setColor(color)}>Use this color</button> */}
              {/* <button onClick={() => updateColor(color)}>Update this color</button> */}
            </ColorPaletteItem>
        )}
      </StyledColorPalette>
    </div>
  )
}

export default ColorPalette;