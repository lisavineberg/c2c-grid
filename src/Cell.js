import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "#fff"
        }
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor() {
        this.setState({ backgroundColor: this.props.color })
    }

    render() {
        return (
            <span className="cell" style={{ backgroundColor: this.state.backgroundColor }} onClick={this.changeColor}></span>
        )
    }
}

export default Cell;