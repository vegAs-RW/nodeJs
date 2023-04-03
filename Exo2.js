const fs = require('fs');

// 1/ Méthode asynchrone
fs.readFile('Exo2.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
})

// 1bis/ Méthode synchrone
try {
    const data = fs.readFileSync('Exo2.txt', 'utf8')
    console.log(data);
} catch (err){
    console.error(err);
}

// 2/ Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.
const data = fs.readFileSync('Exo2.txt', 'utf8');
const dataArray = data.split('\n').map(row => row.split(' '));
const filteredData = dataArray.filter(row => parseInt(row[0]) > 17);
//console.log(filteredData);

// 3/ Recherchez dans le tableau l'étudiant qui a eu la meilleur node.

let bestNote = -Infinity;
let bestStudent;

dataArray.forEach(row => {
  const note = parseInt(row[0]);
  if (note > bestNote) {
    bestNote = note;
    bestStudent = row;
  }
});

console.log(`Le meilleur étudiant est ${bestStudent[1]} avec une note de ${bestNote}`);

// 4 Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.
const students = [];

dataArray.forEach(row => {
    const note = parseInt(row[0]);
    const name = row[1].toUpperCase(); 
    const address = row[2].toUpperCase();
    const student = { name, address, note };
    students.push(student);
  });
students.shift();
  console.log(students);

//5 Ordonnez maintenant l'ensemble des données dans le tableau.
function compareNotes(a, b) {
    if (a.note > b.note) {
      return -1;
    } else if (a.note < b.note) {
      return 1;
    } else {
      return 0;
    }
  }
  students.sort(compareNotes);
  console.log(students);

// 6 Ajoutez dans le fichier students.txt les étudiants suivants :
//- 18 Sonia Paris
//- 17 Clarisse Marseille
const newStudents = ['18 Sonia Paris', '17 Clarisse Marseille'];

newStudents.forEach(student => {
    fs.appendFileSync('Exo2.txt', '\n' + student);
});
console.log('Nouveaux étudiants ajouter au fichier');