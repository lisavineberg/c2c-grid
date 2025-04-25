import React from "react";
import Cell from "./Cell";

interface GridProps {
  grid: { color: string }[];
  updateCellColor: (row: number, col: number, color: string) => void;
  columns: number;
  rows: number;
  selectedColor: string;
  showVerticalCenter?: boolean;
  showHorizontalCenter?: boolean;
}

const Grid: React.FC<GridProps> = ({
  grid,
  updateCellColor,
  columns,
  rows,
  selectedColor,
  showVerticalCenter = false,
  showHorizontalCenter = false,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
      }}
    >
      {grid.map((cell, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        // Calculate the center positions
        const centerRow = Math.floor(rows / 2);
        const centerCol = Math.floor(columns / 2);
        const isVerticalCenter = showVerticalCenter && col === centerCol;
        const isHorizontalCenter = showHorizontalCenter && row === centerRow;
        return (
          <Cell
            key={index}
            color={cell.color}
            onClick={() => updateCellColor(row, col, selectedColor)}
            isVerticalCenter={isVerticalCenter}
            isHorizontalCenter={isHorizontalCenter}
          />
        );
      })}
    </div>
  );
};

export default Grid;
