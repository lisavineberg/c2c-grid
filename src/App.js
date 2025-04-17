import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";

import ColorSelector from "./components/ColorSelector";
import ColorPalette from "./components/ColorPalette";
import Library from "./components/Library";
import Layout from "./components/Layout";
import Storage from "./components/Storage";
import Grid from "./components/Grid";
import { readAnimalData } from "./api";

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
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [cells, setCells] = useState([]);
  const [storedColors, setStoredColors] = useState([]);
  const [storedImages, setStoredImages] = useState([]);

  const [showVerticalCenter, setShowVerticalCenter] = useState(false);
  const [showHorizontalCenter, setShowHorizontalCenter] = useState(false);

  useEffect(() => {
    let grid = [];
    if (!cells.length) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          grid.push({ color: "#fff" });
        }
      }
    } else {
      grid = cells;
    }

    setCells(grid);
  }, [rows, columns, cells]);

  useEffect(() => {
    readAnimalData().then((resp) => {
      setStoredImages(resp);
    });
  }, []);

  const applyStoredImage = (animal) => {
    const info = storedImages.find((image) => image.name === animal);
    setStoredColors(info.storedColors || info.colors);
    setCells(info.cells);
    setRows(info.rows);
    setColumns(info.columns);
  };

  const handleRowOrColChange = (name, value) => {
    name === "rows" ? setRows(value) : setColumns(value);
  };

  const showGridline = () => {
    setShowVerticalCenter(!showVerticalCenter);
    setShowHorizontalCenter(!showHorizontalCenter);
  };

  return (
    <GeneralContext.Provider
      value={{
        cells,
        setCells,
        selectedColor,
        setSelectedColor,
        rows,
        columns,
      }}
    >
      <StyledApp>
        <h1>C2C blanket guide</h1>
        <p>
          Create custom corner-to-corner blankets based on ChiWei's{" "}
          <a href="https://www.1dogwoof.com/zoodiacs-c2c-crochet-afghan/">
            "zoodiac" afghan
          </a>
          . Create your own pattern, or modify one from the library.
        </p>
        <Content>
          <div>
            <Flex>
              <ColorSelector
                storedColors={storedColors}
                setStoredColors={setStoredColors}
              />
              {storedColors && (
                <ColorPalette
                  storedColors={storedColors}
                  setStored={setStoredColors}
                />
              )}
            </Flex>
            <button onClick={showGridline}>Show grid lines</button>
            <Library
              storedImages={storedImages}
              applyImage={applyStoredImage}
            />
            <Layout
              rows={rows}
              cols={columns}
              handleChange={handleRowOrColChange}
            />
            <Storage
              storedImages={storedImages}
              storeImage={setStoredImages}
              storedColors={storedColors}
              rows={rows}
              columns={columns}
            />
          </div>
          <Grid
            cells={cells}
            rows={rows}
            cols={columns}
            showVerticalCenter={showVerticalCenter}
            showHorizontalCenter={showHorizontalCenter}
          />
        </Content>
      </StyledApp>
    </GeneralContext.Provider>
  );
};

export default App;
