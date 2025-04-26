import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ColorSelector from "./components/ColorSelector";
import ColorPalette from "./components/ColorPalette";
import Library from "./components/Library";
import Layout from "./components/Layout";
import Storage from "./components/Storage";
import { SignUp } from "./components/SignUp";
import Grid from "./components/Grid";
import { readAnimalData } from "./api";
import { Login } from "./components/Login";

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

type Cell = {
  color: string;
};

export type AnimalGrid = {
  name: string;
  rows: number;
  columns: number;
  colors: string[];
  cells: Cell[];
  stored_colors?: string[];
};

const App = () => {
  const [rows, setRows] = useState(23);
  const [columns, setColumns] = useState(23);
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const [cells, setCells] = useState(
    Array.from({ length: 23 * 23 }, () => ({ color: "#ffffff" }))
  );

  const [storedColors, setStoredColors] = useState<string[]>([]);
  const [storedImages, setStoredImages] = useState<AnimalGrid[]>([]);

  const [showVerticalCenter, setShowVerticalCenter] = useState(false);
  const [showHorizontalCenter, setShowHorizontalCenter] = useState(false);

  useEffect(() => {
    readAnimalData().then((resp) => {
      setStoredImages(resp);
    });
  }, []);

  const updateCellColor = (row: number, col: number, color: string) => {
    const index = row * columns + col; // Calculate the index in the flat array
    setCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[index] = { ...newCells[index], color }; // Update the specific cell
      return newCells;
    });
  };

  const updateGridSize = (newRows: number, newColumns: number) => {
    setRows(newRows);
    setColumns(newColumns);
    setCells((prevCells) => {
      const newCells = Array.from(
        { length: newRows * newColumns },
        (_, index) => {
          const row = Math.floor(index / newColumns);
          const col = index % newColumns;
          return prevCells[row * newColumns + col] || { color: "#ffffff" };
        }
      );
      return newCells;
    });
  };

  const showGridline = () => {
    setShowVerticalCenter(!showVerticalCenter);
    setShowHorizontalCenter(!showHorizontalCenter);
  };

  const applyStoredImage = (animal: string) => {
    const info = storedImages.find((image) => image.name === animal);
    setStoredColors(info.stored_colors || info.colors);
    setCells(info.cells);
    setRows(info.rows);
    setColumns(info.columns);
  };

  return (
    <StyledApp>
      <h1>C2C blanket guide</h1>
      <p>
        Create custom corner-to-corner blankets based on ChiWei's{" "}
        <a href="https://www.1dogwoof.com/zoodiacs-c2c-crochet-afghan/">
          "zoodiac" afghan
        </a>
        . Create your own pattern, or modify one from the library.
      </p>
      <SignUp />
      <Login />
      <Content>
        <div>
          <Flex>
            <ColorSelector
              storedColors={storedColors}
              setStoredColors={setStoredColors}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              cells={cells}
              setCells={setCells}
            />
            {storedColors?.length > 0 && (
              <ColorPalette
                storedColors={storedColors}
                setStored={setStoredColors}
                cells={cells}
                setCells={setCells}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            )}
          </Flex>
          <button onClick={showGridline}>Show grid lines</button>
          <Library storedImages={storedImages} applyImage={applyStoredImage} />
          <Layout rows={rows} cols={columns} updateGridSize={updateGridSize} />
          <Storage
            storedColors={storedColors}
            rows={rows}
            columns={columns}
            cells={cells}
          />
        </div>
        <Grid
          grid={cells}
          updateCellColor={updateCellColor}
          columns={columns}
          rows={rows}
          selectedColor={selectedColor}
          showVerticalCenter={showVerticalCenter}
          showHorizontalCenter={showHorizontalCenter}
        />
      </Content>
    </StyledApp>
  );
};

export default App;
