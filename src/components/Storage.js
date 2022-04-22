import React, { useState, useContext } from "react";
import styled from "styled-components";

import { GeneralContext } from "./../App";
import { create } from './../api';

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
  font-family: 'Open Sans';
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

const Storage = ({ storedColors, rows, columns }) => {
  const { cells } = useContext(GeneralContext);

  const [name, setName] = useState("");
  const addName = (event) => {
    setName(event.target.value);
  }

  const addImage = () => {
    if (name) {
      const grid = {
        name,
        cells,
        storedColors,
        rows,
        columns
      }
      create(grid);
    }
  }

  return (
    <Container>
      <h2>Storage</h2>
      <label htmlFor="name">Name your image</label>
      <Input id="name" type="text" onChange={addName} />
      <Button onClick={addImage}>Add image</Button>
    </Container>
  )
}

export default Storage;
