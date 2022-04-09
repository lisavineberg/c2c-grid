import React, { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";

import ColorSelector from "./components/ColorSelector";
import ColorPalette from "./components/ColorPalette";
import Library from "./components/Library";
import Layout from "./components/Layout";
import Storage from "./components/Storage";
import Grid from "./components/Grid";

const StyledApp = styled.div`
  font-family: "Open Sans";
  padding: 40px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
`;

export const GeneralContext = createContext();

const App = () => {
  const [rows, setRows] = useState(23);
  const [columns, setColumns] = useState(23);
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [cells, setCells] = useState([]);
  const [storedColors, setStoredColors] = useState([]);
  const [storedImages, setStoredImages] = useState([]);

  const updateGrid = (param) => {
    const color = selectedColor;
    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        grid.push({ color: color});
      }
    }

    setCells(grid);
  };

  useEffect(() => {
    updateGrid();
  }, []);

  return (
    <GeneralContext.Provider value={{ cells, setCells, selectedColor, setSelectedColor }}>
      <StyledApp>
        <h1>C2C blanket guide</h1>
        <p>Create custom corner-to-corner blankets based on ChiWei's <a href="https://www.1dogwoof.com/zoodiacs-c2c-crochet-afghan/">"zoodiac" afghan</a>. Create your own pattern, or modify one from the library.</p>
        <Content>
          <ColorSelector storedColors={storedColors} setStoredColors={setStoredColors} />
          {storedColors && <ColorPalette storedColors={storedColors} />}
          <Library storedImages={storedImages} />
          <Layout rows={rows} cols={columns} />
          <Grid cells={cells} rows={rows} cols={columns} />
          <Storage />
        </Content>
      </StyledApp>
    </GeneralContext.Provider>
  )
};

export default App;
