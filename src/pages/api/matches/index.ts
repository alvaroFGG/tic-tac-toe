import { TURNS } from "@/types";
import { MatchModel } from "@/backend/models/match";
import { NextApiRequest, NextApiResponse } from "next";
import DatabaseProvider from "@/backend/providers/database";

const createMatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { board, turn } = req.body;

  const match = new MatchModel({
    board,
    turn,
  });

  await match.save();

  res.status(200).json({ message: "Match created", matchId: match._id });
};

const createOrUpdateMatch = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { matchId } = req.query;

  const match = await MatchModel.findById(matchId);

  if (!match) {
    createMatch(req, res);
    return;
  }

  const board = match.board;
  const turn = match.turn;

  if (turn !== TURNS.O) {
    res.status(400).json({ message: "It's not your turn" });
    return;
  }

  let nextMove = board.indexOf("") + 1;

  while (board[nextMove] !== "") {
    nextMove = board.indexOf("", nextMove) + 1;
  }

  board[nextMove] = turn;

  match.board = board;
  match.turn = turn === TURNS.X ? TURNS.O : TURNS.X;

  await match.save();

  res.status(200).json({ boardId: match._id, newBoard: match.board });
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
