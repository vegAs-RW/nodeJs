const http = require("http");
const fs = require("fs");
const utils = require("./src/utils");
const hostname = 'localhost';
const port = '8000';


const users = ["Alan", "Sophie", "Bernard", "Elie"];


const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erreur interne du serveur");
      } else {
        const html = data.toString().replace("{{users}}", users.join(", "));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      }
    });
  }
  else if (req.url === "/shuffle") {
    fs.readFile("index.html", (err, data) => {
      utils.shuffle(users);
      //console.log(users);
      const html = data.toString().replace("{{users}}", users.join(", "));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  }
});


server.listen(port, hostname, () => {
    console.log(`serveur ecoute sur http://${hostname}:${port}`)
})
