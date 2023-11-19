import { Match } from "@/backend/models/interfaces/match";

export interface classification {
  XMatches: Match[];
  OMatches: Match[];
  drawMatches: Match[];
}

export * from "./enums";
