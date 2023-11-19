import { TURNS } from "@/types";
import { Match } from "@/backend/models/interfaces/match";

export const createOrUpdateMatch = async (
  board: TURNS[],
  turn: TURNS,
  matchId?: string
): Promise<Match> => {
  if (matchId) {
    const response = await fetch(`/api/matches?matchId=${matchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board, turn }),
    });
    const data = await response.json();

    if (!data) {
      throw new Error("Match not found");
    }

    return data;
  }

  const response = await fetch("/api/matches", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ board, turn }),
  });

  const data = await response.json();

  if (!data) {
    throw new Error("Match not found");
  }

  return data;
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  await fetch(`/api/matches?matchId=${matchId}`, {
    method: "DELETE",
  });
};
