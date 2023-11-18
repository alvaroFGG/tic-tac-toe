import { TURNS } from "@/types";

export interface Match {
  _id: string;
  board: TURNS[] | null[];
  turn: string;
  winner?: string;
  createdAt: Date;
  updatedAt: Date;
}
