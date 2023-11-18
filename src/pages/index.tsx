import { T } from "@/text";
import { TURNS } from "@/types";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Square } from "@/components/board/Square";

export default function HomePage() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState<TURNS>(TURNS.X);

  const updateBoard = (index: number) => {
    if (board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
  };

  return (
    <div className="mt-5 d-flex flex-column gap-2 align-items-center justify-content-center">
      <span className="text-l fw-bold">
        {T.TURN} {turn}
      </span>

      <section className="board-section">
        {board.map((value, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {value}
          </Square>
        ))}
      </section>

      {/* TODO: Implementar funcionalidad de reiniciar partida */}
      <Button className="text-white bg-error600 border-0">
        {T.RESET_GAME}
      </Button>
    </div>
  );
}
