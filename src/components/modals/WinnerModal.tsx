import React from "react";
import { T } from "@/text";
import { TURNS } from "@/types";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  winner: TURNS;
  setBoard: (value: TURNS[]) => void;
  setMatchId: (value: string) => void;
  setTurn: (value: TURNS) => void;
}

export const WinnerModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  winner,
  setBoard,
  setMatchId,
  setTurn,
}) => {
  const router = useRouter();

  return (
    <Modal
      show={isModalOpen}
      onHide={() => {
        setIsModalOpen(false);
      }}
    >
      <Modal.Header>
        <Modal.Title>{T.MATCH_FINISHED}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {T.WINNER} {winner}
        </p>

        <div className="d-flex justify-content-end gap-3">
          <Button
            className="text-white bg-success600 border-0"
            onClick={() => {
              setBoard(Array(9).fill(TURNS.EMPTY));
              setMatchId("");
              setTurn(TURNS.X);
              setIsModalOpen(false);
            }}
          >
            {T.PLAY_AGAIN}
          </Button>

          <Button
            className="text-white bg-primary border-0"
            onClick={() => {
              router.push("/board");
            }}
          >
            {T.SEE_CLASIFICATION}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
