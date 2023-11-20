describe("", () => {
  it("Renders correctly", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);

    cy.get("h1").should("contain", "Tic Tac Toe");
  });

  it("Should play the game and should show modal at the end", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);

    for (let i = 1; i <= 9; i++) {
      cy.wait(1000);

      const gameBoardSquare = cy
        .get(`.board-section > :nth-child(${i})`)
        .then(($square) => {
          if ($square.text() === "") {
            gameBoardSquare.click({ force: true });
          } else {
            return;
          }
        });
    }

    //check if modal is visible
    cy.get(".modal").should("be.visible");
  });
});
