import { TURNS } from "@/types";
import { MatchModel } from "@/backend/models/match";
import { NextApiRequest, NextApiResponse } from "next";
import DatabaseProvider from "@/backend/providers/database";

const getMatches = async (req: NextApiRequest, res: NextApiResponse) => {
  const allMatches = await MatchModel.find();

  const XMatches = allMatches.filter((match) => match.winner === TURNS.X);
  const OMatches = allMatches.filter((match) => match.winner === TURNS.O);
  const drawMatches = allMatches.filter((match) => !match.winner);

  res.status(200).json({ XMatches, OMatches, drawMatches });
};

const createEndpoints = async (req: NextApiRequest, res: NextApiResponse) => {
  DatabaseProvider.connect();

  const { method } = req;

  switch (method) {
    case "GET":
      await getMatches(req, res);
      break;
  }
};

export default createEndpoints;
