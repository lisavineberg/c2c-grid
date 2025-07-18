import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ColorSelector from "./components/ColorSelector";
import ColorPalette from "./components/ColorPalette";
import Library from "./components/Library";
import Layout from "./components/Layout";
import Storage from "./components/Storage";
import Grid from "./components/Grid";
import { readAnimalData, getUser } from "./api";

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

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  font-family: "Open Sans";
  max-width: 200px;
  padding: 5px;

  &:hover {
    background-color: black;
    color: white;
  }
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
  id: string;
  is_public: boolean;
};

const App = () => {
  const [rows, setRows] = useState(23);
  const [columns, setColumns] = useState(23);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [patternId, setPatternId] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(); // Wait for the promise to resolve
      console.log("User:", user);
      setIsLoggedIn(user?.id); // Set the state based on whether a user exists
    };

    fetchUser();
  }, []);

  const [cells, setCells] = useState(
    Array.from({ length: 23 * 23 }, () => ({ color: "#ffffff" }))
  );

  const [storedColors, setStoredColors] = useState<string[]>([]);
  const [storedImages, setStoredImages] = useState<AnimalGrid[]>([]);

  const [showVerticalCenter, setShowVerticalCenter] = useState(false);
  const [showHorizontalCenter, setShowHorizontalCenter] = useState(false);

  useEffect(() => {
    readAnimalData(isLoggedIn).then((resp) => {
      setStoredImages(resp);
    });
  }, [isLoggedIn]);

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
    setName(info.name);
    setPatternId(info.id);
    setIsPublic(info.is_public);
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
          <Button onClick={showGridline}>Show grid lines</Button>
          <Library storedImages={storedImages} applyImage={applyStoredImage} />
          <Layout rows={rows} cols={columns} updateGridSize={updateGridSize} />
          {isLoggedIn ? (
            <Storage
              storedColors={storedColors}
              rows={rows}
              columns={columns}
              cells={cells}
              name={name}
              setName={setName}
              isLoggedIn={isLoggedIn}
              patternId={patternId}
              isPublic={isPublic}
            />
          ) : null}
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
