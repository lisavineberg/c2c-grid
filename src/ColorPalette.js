import React from 'react';

class ColorPalette extends React.Component {

  updateColor = (color) => {
    // incoming color is the stored color
    // take state color
    // in storedColors list, replace color param with state color
    // in grid, if color has color param, replace with state color
    const newColor = this.state.selectedColor;
    let cells = this.state.cells;
    cells.forEach(function(cell) {
        if (cell.color === color) {
            cell.color = newColor;
        }
    })

    let storedColors = this.state.storedColors;
    const index = storedColors.indexOf(color);
    if (index > -1) {
        storedColors[index] = newColor
    }

    this.setState({ cells: cells, storedColors: storedColors })
  }

  render() {
    return (
      <li className="color-palette__item" key={index}>
          Color {index + 1}
          <span className="swatch" style={{ backgroundColor: color }} ></span>
          <button onClick={() => this.setColor(color)}>Use this color</button>
          <button onClick={() => this.updateColor(color)}>Update this color</button>
      </li>
    )
  }
}

export default ColorPalette;