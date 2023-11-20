import React from "react";

type Props = {
  player: string;
  victories: number;
};

export const ClassificationRow: React.FC<Props> = ({ player, victories }) => {
  return (
    <div className="d-flex justify-content-between bg-white p-3">
      <span>{player}</span>

      <span>{victories}</span>
    </div>
  );
};
