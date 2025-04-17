import React from "react";

const Library = ({ storedImages, applyImage }) => {
  const applyStoredImage = (event) => {
    applyImage(event.target.value);
  };

  return (
    <div>
      <h2>Library</h2>
      <p>Animals with a star denote animals originally from ChiWei's pattern</p>
      <select onChange={applyStoredImage}>
        <option value="">Choose an animal</option>
        {storedImages
          ?.map((item) => item.name)
          .sort()
          .map((image, index) => (
            <option key={`library-option-${index}`} value={image}>
              {image}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Library;
