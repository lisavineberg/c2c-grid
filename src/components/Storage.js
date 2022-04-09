import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  button {
    margin-bottom: 20px;
  }
`;

const Storage = () => {
  const addName = (event) => {
    // this.setState({ name: event.target.value })
  }

  const addImage = () => {
    // if (this.state.name) {
    //   let images = [...this.state.storedImages];
    //   const name = this.state.name;
    //   const cells = this.state.cells;
    //   const colors = this.state.storedColors
    //   let newImage = {}
    //   newImage[name] = {cells: cells, storedColors: colors};
    //   images = images.concat(newImage);
    //   this.setState({ storedImages: images });
    // }
  }

  return (
    <Container>
      <h2>Storage</h2>
      <label htmlFor="name">Name your image</label>
      <input id="name" type="text" onChange={addName} />
      <button onClick={addImage}>Add image</button>
    </Container>
  )
}

export default Storage;
