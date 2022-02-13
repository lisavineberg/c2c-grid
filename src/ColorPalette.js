import React from 'react';

function ColorPalette(props) {
  const {updateColor, setColor, storedColors} = props;

  return (
    <ul className="color-palette">
      {storedColors.map((color, index) => 
          <li className="color-palette__item" key={`color-palette-${index}`}>
            Color {index + 1}
            <span className="swatch" style={{ backgroundColor: color }} ></span>
            <button onClick={() => setColor(color)}>Use this color</button>
            <button onClick={() => updateColor(color)}>Update this color</button>
          </li>
      )}
    </ul>
  )
}

export default ColorPalette;