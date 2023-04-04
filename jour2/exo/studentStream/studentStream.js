//## 01 Exercice rechercher un étudiant

//L'utilisateur doit proposer dans le terminal un nom d'étudiant. Dès que l'utilisateur a trouvé un nom dans la liste on arrête le processus d'écoute.

//La recherche sera insensible à la casse et aux espaces.
const readline = require('readline');

const students = ["Alan", "Sonia", "Sophie"];

rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Entrez un étudiant > ');
rl.prompt()

rl.on('line', function(line){
    if (students.includes(line)) {
        console.log(`Bravo, ${line} est dans la liste d'étudiants.`);
        rl.close()
    } else {
        console.log(`${line} n'est pas dans la liste d'étudiants. Réessayez.`);
        rl.prompt();
    }
    
}).on('close', function() {
    console.log('have a great day');
    process.exit(0);
})