import React from "react";
import styled from "styled-components";

import { insertPatternData, updatePattern } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  button {
    margin-bottom: 20px;
  }
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

const Input = styled.input`
  margin-bottom: 20px;
`;

interface StorageProps {
  storedColors: string[];
  rows: number;
  columns: number;
  cells: { color: string }[];
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: string | null;
  patternId: string | null;
}

const Storage: React.FC<StorageProps> = ({
  storedColors,
  rows,
  columns,
  cells,
  name,
  setName,
  isLoggedIn,
  patternId,
}) => {
  const addName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addImage = () => {
    if (name && isLoggedIn) {
      const grid = {
        name,
        cells,
        storedColors,
        rows,
        columns,
        creatorId: isLoggedIn,
      };
      insertPatternData(grid);
    }
  };

  const editPattern = () => {
    if (isLoggedIn && patternId) {
      const grid = {
        name,
        cells,
        storedColors,
        rows,
        columns,
        creatorId: isLoggedIn,
        patternId,
      };

      updatePattern(grid);
    }
  };

  return (
    <Container>
      <h2>Storage</h2>
      <label htmlFor="name">Name your image</label>
      <Input id="name" type="text" onChange={addName} value={name} />
      <Button onClick={addImage}>Add image</Button>
      <Button onClick={editPattern}>Edit Pattern</Button>
    </Container>
  );
};

export default Storage;
