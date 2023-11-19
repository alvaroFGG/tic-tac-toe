import { Match } from "@/backend/models/interfaces/match";

export interface Clasification {
  XMatches: Match[];
  OMatches: Match[];
  drawMatches: Match[];
}

export * from "./enums";
