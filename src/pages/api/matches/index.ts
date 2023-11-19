import { MatchModel } from "@/backend/models/match";
import { NextApiRequest, NextApiResponse } from "next";
import DatabaseProvider from "@/backend/providers/database";
import { createMatch, updateMatch } from "@/backend/modules/matches";

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

const deleteMatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { matchId } = query;

  if (!matchId) {
    res.status(400).json({ message: "Match ID is required" });
    return;
  }

  await MatchModel.deleteOne({ _id: matchId });

  res.status(200).json({ message: "Match deleted" });
};

const createEndpoints = async (req: NextApiRequest, res: NextApiResponse) => {
  DatabaseProvider.connect();

  const { method } = req;

  switch (method) {
    case "PUT":
      await createOrUpdateMatch(req, res);
      break;
    case "DELETE":
      await deleteMatch(req, res);
      break;
  }
};

export default createEndpoints;
