import { generateNewMovement, checkWinner } from "@/backend/modules/matches";
import { TURNS } from "@/types";

jest.mock("@/backend/modules/matches", () => ({
  checkWinner: jest.fn(),
  generateNewMovement: jest.fn(() => ({
    turn: TURNS.O,
    board: [
      TURNS.O,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
    ],
    winner: TURNS.O,
  })),
  __esModule: true,
}));

describe("generateNewMovement and check winner", () => {
  it("should generate a new movement correctly", () => {
    const mockCheckWinner = checkWinner as jest.MockedFunction<
      typeof checkWinner
    >;

    const mockBoard = [
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
      TURNS.EMPTY,
    ];
    const mockTurn = TURNS.X;

    mockCheckWinner.mockReturnValueOnce(false).mockReturnValueOnce(true);

    global.Math.random = jest.fn(() => 0);

    const result = generateNewMovement(mockTurn, mockBoard);

    expect(result).not.toBeUndefined();
    expect(result).toEqual({
      turn: TURNS.O,
      board: [
        TURNS.O,
        TURNS.EMPTY,
        TURNS.EMPTY,
        TURNS.EMPTY,
        TURNS.EMPTY,
        TURNS.EMPTY,
        TURNS.EMPTY,
        TURNS.EMPTY,
        TURNS.EMPTY,
      ],
      winner: TURNS.O,
    });
  });
});
