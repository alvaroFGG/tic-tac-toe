# Next.js Tic Tac Toe

## Instalation

```bash
npm i
then
npm  run  dev

# or

yarn  dev

# or

pnpm  dev

# or

bun  dev
```

## Tech Stack

- Nextjs: For the frontend and API
- Typescript
- Styles
  - Bootstrap: react-bootstrap and bootstrap
  - Sass for global vars and classes
- MongoDB
- Testing - Jest - React Testing Library - Cypress

## Folder Hierarchy

```
📂src
 ┃ ┣ 📂backend
 ┃ ┃ ┗ 📂models
 ┃ ┃ ┗ 📂modules
 ┃ ┃ ┗ 📂providers
 ┃ ┣ 📂components
 ┃ ┣ 📂hooks
 ┃ ┣ 📂pages
 ┃ ┣ 📂services
 ┃ ┣ 📂styles
 ┃ ┣ 📂text
📂test
```

## Functionality

There are two main functionalities in this app

- Playing tic tac toe with a server side algorithm that is the AI
  - _/api/matches_ has a PUT method that creates a match with the first player movement, then it updates the match with each movement.
  - It has an algorithm that generates the next AI movement.
  - It checks if the last player movement has won and checks again after generating a new movement by player 2 (AI).
- See the classification
  - _/api/matches/classification_ has a GET method that retrieves all matches and calculates how many victories each player has and how many draws.

## Testing

### Unit Tests

I used Jest and React testing library to test if both pages and the winner modal component renders well.
Also I did a unit test of the most critical function in the API, that is the _generateNewMovement_ function.
To run the unit tests: `npm run test`
To check the coverage: `npm run coverage`

### End to end tests

I used Cypress to test the principal functionality of the app, that is playing a match against the server side algorithm, this way we can check that the app works correctly pretty fast.

- This test consists of a for loop that does the labor of the player, then it waits for the AI response.
- If the game stops, the tests checks if the modal is displayed.

To open the cypress window: `npx cypress open`
To run cypress tests in terminal: `npx cypress run`
