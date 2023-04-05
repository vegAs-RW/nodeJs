const http = require('http');
const hostname = 'localhost';
const port = '8000';

const server = http.createServer((req, res) => {

    const url = req.url.replace('/', '')

    if(url === 'favicon.ico') {
        res.writeHead(200, {
            "content-type" : "image/x-icon", // image/x-icon = chemin du favicon
        });
        res.end("hello world"); // res.end() == res.write() + res.end()
        return;
    }

    if (url === 'test') {
        res.end(
            `<!DOCTYPE html>
            <html>
            <head>
                <meta charset = 'utf8'>
                <title>Page test</title
            </head>
            <body>
                <p>Page de test</p>
            </body>
            </html>
            `
        )
    }

    
   //res.end("hello world"); // res.end() == res.write() + res.end()
});

server.listen(port, hostname, () => {
    console.log(`serveur ecoute sur http://${hostname}:${port}`)
})