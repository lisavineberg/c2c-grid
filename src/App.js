import React, { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";

import ColorSelector from "./components/ColorSelector";
import ColorPalette from "./components/ColorPalette";
import Library from "./components/Library";
import Layout from "./components/Layout";
import Storage from "./components/Storage";
import Grid from "./components/Grid";
import IMAGES from "./Images";

const StyledApp = styled.div`
  font-family: "Open Sans";
  padding: 40px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

export const GeneralContext = createContext();

const App = () => {
  const [rows, setRows] = useState(23);
  const [columns, setColumns] = useState(23);
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [cells, setCells] = useState([]);
  const [storedColors, setStoredColors] = useState([]);
  const [storedImages, setStoredImages] = useState(IMAGES);

  useEffect(() => {
    let grid = [];
    if (!cells.length) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          grid.push({ color: "#fff"});
        }
      }
    } else {
      grid = cells;
    }

    setCells(grid);
  }, [rows, columns, cells]);

  // useEffect(() => {
  //   setStoredImages(IMAGES);
  // }, [storedImages]);

  const applyStoredImage = (animal) => {
    const info = storedImages.find(image => image.name === animal)
    setStoredColors(info.storedColors);
    setCells(info.cells);
    setRows(info.rows);
    setColumns(info.columns);
  }

  const handleRowOrColChange = (name, value) => {
    name === "rows" ? setRows(value) : setColumns(value);
  }

  return (
    <GeneralContext.Provider value={{ cells, setCells, selectedColor, setSelectedColor }}>
      <StyledApp>
        <h1>C2C blanket guide</h1>
        <p>Create custom corner-to-corner blankets based on ChiWei's <a href="https://www.1dogwoof.com/zoodiacs-c2c-crochet-afghan/">"zoodiac" afghan</a>. Create your own pattern, or modify one from the library.</p>
        <Content>
          <div>
            <Flex>
              <ColorSelector storedColors={storedColors} setStoredColors={setStoredColors} />
              {storedColors && <ColorPalette storedColors={storedColors} setStored={setStoredColors} />}
            </Flex>
            <Library storedImages={storedImages} applyImage={applyStoredImage} />
            <Layout rows={rows} cols={columns} handleChange={handleRowOrColChange} />
            <Storage storedImages={storedImages} storeImage={setStoredImages} storedColors={storedColors} rows={rows} columns={columns} />
          </div>
          <Grid cells={cells} rows={rows} cols={columns} />
        </Content>
      </StyledApp>
    </GeneralContext.Provider>
  )
};

export default App;
