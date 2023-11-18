import { TURNS } from "@/types";
import { Schema, model, models } from "mongoose";

const MathSchema = new Schema(
  {
    board: {
      type: [String],
      required: true,
      enum: [TURNS.X, TURNS.O, ""],
      default: ["", "", "", "", "", "", "", "", ""],
    },
    turn: {
      type: String,
      required: true,
      enum: [TURNS.X, TURNS.O],
      default: TURNS.O,
    },
    winner: {
      type: String,
      enum: [TURNS.X, TURNS.O],
    },
  },
  {
    timestamps: true,
  }
);

export const MatchModel = models.Match || model("Match", MathSchema, "matches");
