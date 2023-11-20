import React from "react";
import HomePage from "@/pages";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("HomePage", () => {
  it("should render the Home page", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Haz click en un cuadrado para empezar una partida")
    ).toBeInTheDocument();
  });
});
