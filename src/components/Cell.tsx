import React from "react";

interface CellProps {
  color: string;
  onClick: () => void;
  isVerticalCenter?: boolean;
  isHorizontalCenter?: boolean;
}

const Cell: React.FC<CellProps> = ({
  color,
  onClick,
  isVerticalCenter,
  isHorizontalCenter,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: color,
        border: "1px solid black",
        opacity: isVerticalCenter || isHorizontalCenter ? 0.5 : 1,
      }}
    />
  );
};

export default Cell;
