import React from "react";

const Library = ({ storedImages }) => {

  const applyStoredImage = (event) => {
    const animal = Object.values(storedImages.filter((image) => {
        return Object.keys(image)[0] === event.target.value;
    })[0])[0];
    let { cells, storedColors, rows, columns } = animal;
    rows = rows || 23;
    columns = columns || 23;
    this.setState({ cells: cells, storedColors: storedColors, rows: rows, columns: columns })
  }

  return (
    <div>
      <h2>Library</h2>
      <p>Animals with a star denote animals originally from ChiWei's pattern</p>
      <select onChange={applyStoredImage}>
        <option value="">Choose an animal</option>
        {storedImages.sort(function(a, b) {
          if(Object.keys(a)[0] < Object.keys(b)[0]) { return -1 };
          if(Object.keys(a)[0] > Object.keys(b)[0]) { return 1 };
          return 0;
        }).map((image, index) => 
          <option key={index} value={Object.keys(image)[0]}>{Object.keys(image)[0]}</option>
        )}
      </select>
    </div>
  )
}

export default Library;
