import { useIsMobile } from "@/hooks/useIsMobile";
import React from "react";

type Props = {
  index: number;
  updateBoard: (index: number) => void;
  children?: React.ReactNode;
};

export const Square: React.FC<Props> = ({ index, updateBoard, children }) => {
  const isMobile = useIsMobile();

  return (
    <div
      key={index}
      className="d-flex align-items-center justify-content-center border border-gray500 rounded-4 bg-white cursor-pointer"
      style={{
        width: isMobile ? 75 : 150,
        height: isMobile ? 75 : 150,
        fontSize: isMobile ? "1.5rem" : "3rem",
      }}
      onClick={() => updateBoard(index)}
    >
      {children}
    </div>
  );
};
