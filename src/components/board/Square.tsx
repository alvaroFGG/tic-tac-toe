import React from "react";
import { TURNS } from "@/types";

type Props = {
  index: number;
  updateBoard: (index: number) => void;
  children?: React.ReactNode;
};

export const Square: React.FC<Props> = ({ index, updateBoard, children }) => {
  const getSquareTextColor = () => {
    switch (children) {
      case TURNS.O:
        return "text-blue500";
      case TURNS.X:
        return "text-error600";
      default:
        return "text-gray500";
    }
  };

  return (
    <div
      key={index}
      className={`d-flex align-items-center justify-content-center border border-gray500 rounded-4 bg-white ${getSquareTextColor()}`}
      style={{
        width: "150px",
        height: "150px",
        fontSize: "3rem",
      }}
      onClick={() => updateBoard(index)}
    >
      {children}
    </div>
  );
};
