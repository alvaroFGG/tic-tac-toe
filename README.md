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

## Stack

- Nextjs: For the frontend and API
- Typescript
- Bootstrap: react-bootstrap and bootstrap
- MongoDB
- Testing - Jest - React Testing Library

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

There are two principal functionalities in this app

- Playing tic tac toe with a server side algorithm that is the AI
  - /api/matches has a PUT method that creates a match in the first player movement, then it updates that match with the created match id.
  - It has an algorithm that generates the movement by AI.
  - It checks if the player has won and after generating a new movement it checks again if that new movement has won the match
- See the classification
  - /api/matches/classification has a GET method that retrieves all matches and calculates how many victories has each player and how many draws.
