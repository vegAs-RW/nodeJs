const myModule = require('os');

const {username} = myModule.userInfo();
const cpus = myModule.cpus().length;

console.log(
    `Ce mbp appartien à ${username} et a ${cpus}`
);

/*process.stdin.write('Bonjour \n')
process.stdout.write('Bonjour \n')
process.stderr.write('Error \n')*/

process.stdin.on('data', (chunk) => {
    process.exit(0);
})