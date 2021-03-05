import React from 'react';
import './App.css';
import Cell from './Cell';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: 23,
            columns: 23,
            color: "#fff",
        }

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleColChange = this.handleColChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    handleRowChange(event) {
        this.setState({ rows: parseInt(event.target.value) })
    }

    handleColChange(event) {
        this.setState({ columns: parseInt(event.target.value) })
    }
    handleColorChange(event) {
        this.setState({ color: event.target.value })
    }
    clearAll() {
        this.setState({ color: "#fff" })
    }
  render() {
    let grid=[];

    for (let i=0; i < this.state.rows; i++) {
        for (let j=0; j< this.state.columns; j++) {
            grid.push("*");
        }
    }
  return (
    <div className="App">

        <label>How many rows?</label>
        <input type="number" value={this.state.rows} onChange={this.handleRowChange}></input>
        <label>How many columns?</label>
        <input type="number" value={this.state.columns} onChange={this.handleColChange}></input>
        <label>What color?</label>
        <input type="color" value={this.state.color} onChange={this.handleColorChange}></input>
        <button onClick={this.clearAll}>Clear all</button>

        <div className="grid">
            {grid.map((item, index) => <Cell key={index} color={this.state.color} onClick={this.changeColor}></Cell>)}
        </div>
    


    </div>
  );
}
}

export default App;