// Travail efféctué avec Yassin

const readline = require("readline");
const { playGame, game } = require("./utils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Choisissez pierre, feuille ou ciseaux ('q' pour quitter) > ");
rl.prompt();

let end = false; // to know if the game is over
let scores = { playerScore: 0, computerScore: 0 }; // to store the scores

// check if the input is valid and
const playAgain = (input) => {
  if (end && input.toLowerCase() === "y") {
    end = false;
    rl.setPrompt("Choisissez pierre, feuille ou ciseaux ('q' pour quitter) > ");
    rl.prompt();
  } else if (end && input.toLowerCase() === "n") {
    rl.close();
  } else {
    console.log("choix invalide. Réessayez");
    rl.prompt();
  }
};

// check if the input is valid and play the game
const gamePrompt = (input) => {
  if (input.toLowerCase() === "q") {
    rl.close();
  } else if (game.includes(input)) {
    scores = playGame(input);
    rl.prompt();
  } else {
    console.log("choix invalide. Réessayez");
    rl.prompt();
  }
};

const checkInput = (input) => {
  if (end) {
    playAgain(input);
  } else {
    gamePrompt(input);
  }
  // check if the game is over
  if (scores.computerScore === 3) {
    console.log("Vous avez perdu la partie");
    end = true;
    rl.setPrompt("Voulez vous rejouer ? (y/n) >");
    rl.prompt();
  } else if (scores.playerScore === 3) {
    console.log("Vous avez gagné la partie");
    end = true;
    rl.setPrompt("Voulez vous rejouer ? (y/n) >");
    rl.prompt();
  }
};

rl.on("line", (input) => checkInput(input)).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
