import { TURNS } from "@/types";
import { MatchModel } from "@/backend/models/match";
import { NextApiRequest, NextApiResponse } from "next";
import DatabaseProvider from "@/backend/providers/database";
import { Match } from "@/backend/models/interfaces/match";

const generateNewMovement = (turn: TURNS, board: TURNS[]) => {
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

  return {
    turn: newTurn,
    board: newBoard,
  };
};

const createMatch = async (
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

const updateMatch = async (
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

  await MatchModel.updateOne({ _id: match._id }, match);

  res.status(200).json(match);
};

const createOrUpdateMatch = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body, query } = req;
  const { matchId } = query;

  if (!body.board) {
    res.status(400).json({ message: "Board is required" });
    return;
  }

  const match = await MatchModel.findById(matchId);

  if (!match || !matchId) {
    await createMatch(body.turn, body.board, res);
    return;
  }

  await updateMatch(body.turn, body.board, match, res);
};

const createEndpoints = async (req: NextApiRequest, res: NextApiResponse) => {
  DatabaseProvider.connect();

  const { method } = req;

  switch (method) {
    case "PUT":
      await createOrUpdateMatch(req, res);
      break;
  }
};

export default createEndpoints;
