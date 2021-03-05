import React from 'react';
import './App.css';
// import Cell from './Cell';

/* 
    TODO
    * clean up
    * save whole image/print
    * have some on the site to be able to modify
    * styling (allow to a grid greater than 23x23)
*/

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: 23,
            columns: 23,
            color: "#ffffff",
            cells: [],
            storedColors: [],
        }

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleColChange = this.handleColChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.updateCells = this.updateCells.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.applyToAll = this.applyToAll.bind(this);
        this.storeColor = this.storeColor.bind(this);
        this.setColor = this.setColor.bind(this);
    }

    updateCells(color) {
        if(!color) {
            color = "#fff";
        }
        let grid = [];
        for (let i=0; i < this.state.rows; i++) {
            for (let j=0; j< this.state.columns; j++) {
                grid.push({ color: color});
            }
        }
        this.setState({ cells: grid })
    }

    componentDidMount() {
        this.updateCells();
    }

    handleRowChange(event) {
        this.setState({ rows: parseInt(event.target.value) });
        this.updateCells();
    }

    handleColChange(event) {
        this.setState({ columns: parseInt(event.target.value) });
        this.updateCells();
    }

    handleColorChange(event) {
        this.setState({ color: event.target.value })
    }

    changeColor(i) {
        let cells = [...this.state.cells];
        let changedCell = {...cells[i]};
        changedCell.color = this.state.color;
        cells[i] = changedCell;
        this.setState({ cells: cells })
    }

    applyToAll(color) {
        this.updateCells(color);
    }

    storeColor() {
        const selectedColor = this.state.color;
        let listOfStored = [...this.state.storedColors];
        listOfStored = listOfStored.concat(selectedColor);
        this.setState({ storedColors: listOfStored })
    }

    setColor(color) {
        this.setState({ color: color })
    }

    render() {

        return (
            <div className="App">

                <label>How many rows?</label>
                <input type="number" value={this.state.rows} onChange={this.handleRowChange}></input>
                <label>How many columns?</label>
                <input type="number" value={this.state.columns} onChange={this.handleColChange}></input>
                <label>What color?</label>
                <input type="color" value={this.state.color} onChange={this.handleColorChange}></input>
                <button onClick={() => this.applyToAll("#fff")}>Clear all</button>
                <button onClick={() => this.applyToAll(this.state.color)}>Apply to all</button>
                <button onClick={this.storeColor}>Store color</button>

                <ul>
                    {this.state.storedColors.map((color, index) => 
                        <li style={{ color: color }} key={index} onClick={() => this.setColor(color)}>{index}</li>
                    )}
                </ul>


                <div className="grid">
                    {this.state.cells.map((item, index) => 
                        <span className="cell" key={index} style={{ backgroundColor: item.color }} onClick={() => this.changeColor(index)}></span>)
                    }
                </div>
            


            </div>
        );
    }
}

export default App;