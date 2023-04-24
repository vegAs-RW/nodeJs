console.table({
    name: "Node.Js",
    gestionnaire_paquet: "npm"
});

console.log('hello Node.js');


// Exemple code synchrone
const showResult = (a,b) => {
    console.log(square(sum(a,b)));
};

const sum = (a,b) => {
    return a + b
};

const square = (a, p=2) => a**p;

showResult (3,7);

// Exemple code asynchrone
console.log('start');
// S'executera 1 seconde plus tard que les deux autres console.log
setTimeout(() => console.log('hello world'), 1000); // Callback tache accomplie aprés l'evenement

console.log('end')

