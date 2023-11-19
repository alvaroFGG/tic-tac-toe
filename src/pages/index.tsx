import { T } from "@/text";
import { TURNS } from "@/types";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Square } from "@/components/board/Square";
import { createOrUpdateMatch, deleteMatch } from "@/services";
import { WinnerModal } from "@/components/modals/WinnerModal";

export default function HomePage() {
  const [board, setBoard] = useState(Array(9).fill(TURNS.EMPTY));
  const [turn, setTurn] = useState<TURNS>(TURNS.X);
  const [matchId, setMatchId] = useState<string>("");
  const [winner, setWinner] = useState<TURNS>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const setMovementByAI = async (newBoard: TURNS[]) => {
    const response = await createOrUpdateMatch(newBoard, turn, matchId);

    if (!response || !response.board) {
      return;
    }

    setBoard(response.board);
    console.log(response);
    if (response.winner) {
      setWinner(response.winner as TURNS);
      setShowModal(true);
      return;
    }
    setMatchId(response._id);
    setTurn(TURNS.X);
  };

  const updateBoard = async (index: number) => {
    if (board[index] !== TURNS.EMPTY) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(TURNS.O);

    await setMovementByAI(newBoard);
  };

  const handleResetGame = async () => {
    await deleteMatch(matchId);

    setBoard(Array(9).fill(TURNS.EMPTY));
    setMatchId("");
    setTurn(TURNS.X);
  };

  return (
    <div className="mt-5 d-flex flex-column gap-2 align-items-center justify-content-center">
      {winner && (
        <WinnerModal
          isModalOpen={showModal}
          setIsModalOpen={setShowModal}
          winner={winner}
          setBoard={setBoard}
          setMatchId={setMatchId}
          setTurn={setTurn}
        />
      )}
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

      {/* La funcionalidad que tiene este botón no la haría en el mismo, sino en un modal que explicase qué pasa si quieres reiniciar la partida */}
      {matchId && (
        <Button
          className="text-white bg-error600 border-0"
          onClick={handleResetGame}
        >
          {T.RESET_GAME}
        </Button>
      )}
    </div>
  );
}
