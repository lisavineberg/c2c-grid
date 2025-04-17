import React from "react";
import styled from "styled-components";

import Cell from "./Cell";

const StyledGrid = styled.div`
  display: grid;
  flex: 1 0 100%;
  grid-template-columns: repeat(${(props) => props.cols}, 20px);
  grid-template-rows: repeat(${(props) => props.rows}, 20px);
  margin-top: 20px;
`;

interface GridProps {
  cells: { color: string }[];
  rows: number;
  cols: number;
  showVerticalCenter: boolean;
  showHorizontalCenter: boolean;
}

const Grid: React.FC<GridProps> = ({
  cells,
  rows,
  cols,
  showVerticalCenter,
  showHorizontalCenter,
}) => {
  return (
    <StyledGrid rows={rows} cols={cols}>
      {cells.map((el, index) => {
        return (
          <Cell
            key={index}
            color={el.color}
            index={index}
            showVerticalCenter={showVerticalCenter}
            showHorizontalCenter={showHorizontalCenter}
          />
        );
      })}
    </StyledGrid>
  );
};

export default Grid;
