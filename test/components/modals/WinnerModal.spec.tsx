import React, { useState } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { WinnerModal } from "@/components/modals/WinnerModal";
import { TURNS } from "@/types";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("WinnerModal", () => {
  it("should render the WinnerModal component", () => {
    render(
      <WinnerModal
        isModalOpen={true}
        setIsModalOpen={() => {}}
        setBoard={() => {}}
        setMatchId={() => {}}
        setTurn={() => {}}
      />
    );
    expect(
      screen.getByText("La partida ha terminado!! 🎉")
    ).toBeInTheDocument();
  });

  it("should say winner is X if winner prop is X", () => {
    render(
      <WinnerModal
        isModalOpen={true}
        setIsModalOpen={() => {}}
        setBoard={() => {}}
        setMatchId={() => {}}
        setTurn={() => {}}
        winner={TURNS.X}
      />
    );
    expect(screen.getByText(`Ganador: ${TURNS.X}`)).toBeInTheDocument();
  });

  it("should say winner is O if winner prop is O", () => {
    render(
      <WinnerModal
        isModalOpen={true}
        setIsModalOpen={() => {}}
        setBoard={() => {}}
        setMatchId={() => {}}
        setTurn={() => {}}
        winner={TURNS.O}
      />
    );
    expect(screen.getByText(`Ganador: ${TURNS.O}`)).toBeInTheDocument();
  });

  it("should say draw is if winner prop is undefined", () => {
    render(
      <WinnerModal
        isModalOpen={true}
        setIsModalOpen={() => {}}
        setBoard={() => {}}
        setMatchId={() => {}}
        setTurn={() => {}}
      />
    );
    expect(screen.getByText("Empate")).toBeInTheDocument();
  });
});
