const fs = require("fs");
const readline = require("readline");
const students = JSON.parse(fs.readFileSync("students.json")).students;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Entrez le nom de l'étudiant ou 'exit' pour quitter > ");
rl.prompt();

rl.on("line", (input) => {
  if (input.toLowerCase() === "exit") {
    rl.close();
  } else {
    const name = input.trim().toLowerCase();

    const student = students.find((student) => student.name.toLowerCase() === name);
    if (student) {
      const moyenne = student.notes.reduce((a, b) => a + b) / student.notes.length;
      console.log(`La moyenne de ${student.name} est de : ${moyenne}`);
    } else {
      console.log(`L'étudiant '${input}' n'a pas été trouvé. Réessayer`);
    }
    rl.prompt();
  }
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
  