const fs = require('fs');

// Méthode asynchrone
/*fs.readFile('demo3.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
})*/

// Méthode synchrone
try {
    const data = fs.readFileSync('demo3.txt', 'utf8')
    console.log(data);
} catch (err){
    console.error(err);
}


/*const {writeFile} = fs;
const data = "pigeon et cacahuete";
writeFile('demo3.txt', data, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('update file')
})*/

const data2 = ' poulet et epinards'
fs.appendFile('demo3.txt', data2, (err) => {
    if (err) throw err;
    console.log('update !!');
})