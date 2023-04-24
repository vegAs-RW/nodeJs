const students = [
    { name : "Sonia"},
    { name : "Antoine"}
];

const http = require('http')
const hostname = 'localhost'
const port = 8000;
const fs = require('fs')

const server = http.createServer((req, res) => {

    const url = req.url.replace('/', '')

    if (url === '') {
        res.writeHead(200, { "Content-Type": "html" });
        const html = fs.readFileSync("./view/home.html");
        res.end(html);
        
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', () => {
                students.push({name : body.split('=')[1]});
                console.log(students);
                res.writeHead(200, {'content-type' : 'application/json'});
                res.end()
            });
          }
        
    } else if (url === "bootstrap") {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync("./assets/css/bootstrap.min.css");
        res.write(css);
        res.end();
        return;
    } else if (url === "users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end("Error route not found")
    }
})

server.listen(port, hostname, () => {
    console.log(`server is running on http://${hostname}:${port}`);
})