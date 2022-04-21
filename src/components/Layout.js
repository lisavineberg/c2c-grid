import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
`;

const Layout = ({ rows, cols, handleChange }) => {

  const handleRowOrColChange = (event) => {
    const { name, value} = event.target;
    handleChange(name, parseInt(value));
  }

  return (
    <div>
      <h2>Layout
        {/* <button onClick={this.minimizeLayout}>Minimize</button> */}
      </h2>
      {/* {this.state.showLayout &&  */}
        <Container>
          <label htmlFor="rows">How many rows?</label>
          <Input id="rows" name="rows" type="number" value={rows} onChange={handleRowOrColChange} />
          <label htmlFor="columns">How many columns?</label>
          <Input id="columns" name="columns" type="number" value={cols} onChange={handleRowOrColChange} />
        </Container>
      {/* } */}
    </div>
  )
}

export default Layout;
