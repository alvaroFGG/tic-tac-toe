import { TURNS } from "@/types";
import { NextApiResponse } from "next";
import { MatchModel } from "../models/match";
import { Match } from "../models/interfaces/match";

const generateNewMovement = (turn: TURNS, board: TURNS[]) => {
  const hasAWinner = checkWinner(board);

  if (hasAWinner) {
    return {
      turn,
      board,
      winner: turn,
    };
  }

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  const newBoard = [...board];

  const emptyIndexes = newBoard
    .map((item, index) => (item === TURNS.EMPTY ? index : undefined))
    .filter((item) => item !== undefined);

  const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
  const randomEmptyIndex = emptyIndexes[randomIndex];

  if (randomEmptyIndex !== undefined) {
    newBoard[randomEmptyIndex] = newTurn;
  }

  const hasAWinnerAfterMovement = checkWinner(newBoard);

  if (hasAWinnerAfterMovement) {
    return {
      turn: newTurn,
      board: newBoard,
      winner: newTurn,
    };
  }

  return {
    turn: newTurn,
    board: newBoard,
  };
};

const checkWinner = (board: TURNS[]) => {
  const winningCombinations = [
    [0, 1, 2], // Horizontal
    [3, 4, 5], // Horizontal
    [6, 7, 8], // Horizontal
    [0, 3, 6], // Vertical
    [1, 4, 7], // Vertical
    [2, 5, 8], // Vertical
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
  ];

  let hasAWinner = false;

  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;

    if (
      board[a] !== TURNS.EMPTY &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      hasAWinner = true;
    }
  });

  return hasAWinner;
};

export const createMatch = async (
  turn: TURNS,
  board: TURNS[],
  res: NextApiResponse
) => {
  const match = new MatchModel({
    board,
  });

  const newMovement = generateNewMovement(turn, board);

  match.board = newMovement.board;

  await match.save();

  res.status(200).json(match);
};

export const updateMatch = async (
  turn: TURNS,
  board: TURNS[],
  match: Match,
  res: NextApiResponse
) => {
  if (!match) {
    res.status(404).json({ message: "Match not found" });
    return;
  }

  const newMovement = generateNewMovement(turn, board);

  match.board = newMovement.board;
  match.turn = newMovement.turn;
  match.winner = newMovement.winner;

  await MatchModel.updateOne({ _id: match._id }, match);

  res.status(200).json(match);
};
