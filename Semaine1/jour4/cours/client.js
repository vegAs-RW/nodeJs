const http = require('http');
const hostname = 'localhost';
const port = '8000';

// envoi d'une requete vers le serveur

http.get(`http://${hostname}:${port}`, res => {
    let data ='';

    // recevoir des données par morceaux
    res.on('data', chunk => {
        data += chunk
    })
    res.on('end', () => {
        console.log(data);
    })
})