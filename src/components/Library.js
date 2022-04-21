import React from "react";

const Library = ({ storedImages, applyImage }) => {

  const applyStoredImage = (event) => {
    applyImage(event.target.value);
  }

  return (
    <div>
      <h2>Library</h2>
      <p>Animals with a star denote animals originally from ChiWei's pattern</p>
      <select onChange={applyStoredImage}>
        <option value="">Choose an animal</option>
        {storedImages.sort(function(a, b) {
          return a.name > b.name
        }).map((image, index) => 
          <option key={`library-option-${index}`} value={image.name}>{image.name}</option>
        )}
      </select>
    </div>
  )
}

export default Library;
