import React from 'react';
import './App.css';
import ColorPalette from './ColorPalette';
// import Cell from './Cell';
import { create, fetchAll } from './api';

/* 
  TODO
  * clean up
  * save whole image/print
  * styled components?
  * random animal generator
  * be able to select all spans of a certain color on the page (to change them to another color?)
  * styling
  * map colors to names of color https://sampleapis.com/api-list/css-color-names
  * count of how many squares of each color (next to the list of stored colors?)
  * be able to calculate length/weight of wool you need
  * stitch together sqaures of the blanket
  * highlight center row/column (change opacity)
  * be able to store saved animals on a server???
  * be able to minimize inputs
*/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        rows: 23,
        columns: 23,
        selectedColor: "#ffffff",
        cells: [],
        storedColors: [],
        storedImages: [
        ]
      }
    }

  updateGrid = (param) => {
    let color = this.state.color || "#fff";
    let rows = this.state.rows;
    let columns = this.state.columns;
    if (param) {
      switch(Object.keys(param)[0]) {
        case "color":
          color = Object.values(param)[0];
          break;
        case "rows":
          rows = Object.values(param)[0];
          break;
        case "columns":
          columns = Object.values(param)[0];
          break;
        default:
          break;
      }
    }

    let grid = [];
    for (let i=0; i < rows; i++) {
      for (let j=0; j < columns; j++) {
        grid.push({ color: color });
      }
    }
    this.setState({ cells: grid })
  }

  componentDidMount = () => {
    // this.updateGrid();
    const animals = fetchAll();
    console.log("animals", animals)
  }

  handleRowOrColChange = (event) => {
   const {name, value} = event.target;
   this.setState({ [name]: parseInt(value) });
   this.updateGrid({ [name]: parseInt(value) });
  }

  handleColorInputChange = (event) => {
    this.setState({ selectedColor: event.target.value })
  }

  changeCellColor = (i) => {
    let cells = [...this.state.cells];
    let changedCell = {...cells[i]};
    changedCell.color = this.state.selectedColor;
    cells[i] = changedCell;
    this.setState({ cells: cells })
  }

  applyToAll = (color) => {
    this.updateGrid({ "color": color });
  }

  storeColor = () => {
    const selectedColor = this.state.selectedColor;
    let listOfStored = [...this.state.storedColors];
    listOfStored = listOfStored.concat(selectedColor);
    this.setState({ storedColors: listOfStored })
  }

  setColor = (color) => {
    this.setState({ selectedColor: color })
  }

  applyStoredImage = (event) => {
        const animal = Object.values(this.state.storedImages.filter((image) => {
            return Object.keys(image)[0] === event.target.value;
        })[0])[0];
        let { cells, storedColors, rows, columns } = animal;
        rows = rows || 23;
        columns = columns || 23;
        this.setState({ cells: cells, storedColors: storedColors, rows: rows, columns: columns })
  }

  addName = (event) => {
    this.setState({ name: event.target.value })
    }

  addImage = () => {
    const grid = {
      name: this.state.name,
      rows: this.state.rows,
      columns: this.state.columns,
      colors: this.state.storedColors,
      cells: this.state.cells
    }

    create(grid);
    // if (this.state.name) {
    //   let images = [...this.state.storedImages];
    //   const name = this.state.name;
    //   const cells = this.state.cells;
    //   const colors = this.state.storedColors
    //   let newImage = {}
    //   newImage[name] = {cells: cells, storedColors: colors};
    //   images = images.concat(newImage);
    //   this.setState({ storedImages: images });
    // }
  }

  minimizeLayout = () => {
    this.setState({ showLayout: !this.state.showLayout })
  }

  minimizeColors = () => {
    this.setState({ showColors: !this.state.showColors })
  }


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

  render = () => {
    return (
      <div className="App">
       <h1>C2C blanket guide</h1>
        <p>Create custom corner-to-corner blankets based on ChiWei's <a href="https://www.1dogwoof.com/zoodiacs-c2c-crochet-afghan/">"zoodiac" afghan</a>. Create your own pattern, or modify one from the library.</p>
        <div className="content">
          <div>
            {/* Colors */}
            <div className="flex">
              <div className="inputs">
                <h2>Colors 
                  {/* <button onClick={this.minimizeColors}>Minimize</button> */}
                </h2>
                <div className="color-picker flex">
                  <input id="color" type="color" value={this.state.selectedColor} onChange={this.handleColorInputChange}></input>
                  <label htmlFor="color">Pick a color</label>
                </div>
                <button onClick={() => this.applyToAll("#fff")}>Clear whole grid</button>
                <button onClick={() => this.applyToAll(this.state.selectedColor)}>Apply color to whole grid</button>
                <button onClick={this.storeColor}>Add to color palette</button>
              </div>

              {this.state.storedColors.length &&
                <div>
                  <h2>Color Palette</h2>
                  <ColorPalette
                    updateColor={this.updateColor}
                    setColor={this.setColor}
                    storedColors={this.state.storedColors}
                  ></ColorPalette>
                </div>}
            </div>

            
          {/* Library */}
            <div>
              <h2>Library</h2>
              <p>Animals with a star denote animals originally from ChiWei's pattern</p>
              <select className="" onChange={this.applyStoredImage}>
                <option value="">Choose an animal</option>
                {this.state.storedImages.sort(function(a, b) {
                  if(Object.keys(a)[0] < Object.keys(b)[0]) { return -1 };
                  if(Object.keys(a)[0] > Object.keys(b)[0]) { return 1 };
                  return 0;
                }).map((image, index) => 
                  <option key={index} value={Object.keys(image)[0]}>{Object.keys(image)[0]}</option>
                )}
              </select>
            </div>

            {/* Layout */}
            <div>
              <h2>Layout
                {/* <button onClick={this.minimizeLayout}>Minimize</button> */}
              </h2>
              {/* {this.state.showLayout &&  */}
                <div className="inputs">
                  <label htmlFor="rows">How many rows?</label>
                  <input id="rows" name="rows" type="number" value={this.state.rows} onChange={this.handleRowOrColChange}></input>
                  <label htmlFor="columns">How many columns?</label>
                  <input id="columns" name="columns" type="number" value={this.state.columns} onChange={this.handleRowOrColChange}></input>
                </div>
              {/* } */}
            </div>

            {/* Storage */}
            <div className="inputs">
              <h2>Storage</h2>
              <label htmlFor="name">Name your image</label>
              <input id="name" type="text" onChange={this.addName}></input>
              <button onClick={this.addImage}>Add image</button>
            </div>
          </div>

          <div className="grid" style={{"--rows": this.state.rows, "--cols": this.state.columns}}>
            {this.state.cells.map((item, index) => 
              <span className="cell" key={index} style={{ backgroundColor: item.color }} onClick={() => this.changeCellColor(index)}></span>
            )}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
