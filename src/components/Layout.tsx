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

interface LayoutProps {
  rows: number;
  cols: number;
  updateGridSize: (rows: number, columns: number) => void;
}

const Layout: React.FC<LayoutProps> = ({ rows, cols, updateGridSize }) => {
  return (
    <div>
      <h2>
        Layout
        {/* <button onClick={this.minimizeLayout}>Minimize</button> */}
      </h2>
      {/* {this.state.showLayout &&  */}
      <Container>
        <label htmlFor="rows">How many rows?</label>
        <Input
          id="rows"
          name="rows"
          type="number"
          value={rows}
          onChange={(e) => updateGridSize(parseInt(e.target.value), cols)}
        />
        <label htmlFor="columns">How many columns?</label>
        <Input
          id="columns"
          name="columns"
          type="number"
          value={cols}
          onChange={(e) => updateGridSize(rows, parseInt(e.target.value))}
        />
      </Container>
      {/* } */}
    </div>
  );
};

export default Layout;
