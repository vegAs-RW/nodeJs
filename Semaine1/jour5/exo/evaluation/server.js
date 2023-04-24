const http = require("http");
const url = require("url");
const dayjs = require("dayjs");
const locale_fr = require("dayjs/locale/fr");
const dotenv = require("dotenv");
const pug = require("pug");
const { formatDate } = require("./utils");
const fs = require("fs");
const path = require("path");

dotenv.config();
dayjs.locale(locale_fr);

const students = [
  { name: "Sonia", birth: "2019-14-05" },
  { name: "Antoine", birth: "2000-12-05" },
  { name: "Alice", birth: "1990-14-09" },
  { name: "Sophie", birth: "2001-10-02" },
  { name: "Bernard", birth: "1980-21-08" },
];

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  // Page accueil
  if (pathname === "/") {
    fs.readFile(
      path.join(__dirname, "view", "home.html"),
      "utf8",
      (err, content) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>Erreur serveur</h1>");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              const [name, birth] = body.split("&");
              const [_, nameValue] = name.split("=");
              const [__, birthValue] = birth.split("=");
              const newStudent = { name: nameValue, birth: birthValue };
              students.push(newStudent);
              console.log(students);
              res.end();
            });
          }
        }
      }
    );
    // CSS
  } else if (pathname === "/css/style.css") {
    fs.readFile(
      path.join(__dirname, "assets", "css", "style.css"),
      "utf-8",
      (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Erreur du serveur");
        } else {
          // Définir les en-têtes de la réponse HTTP
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        }
      }
    );
    // Page utilisateurs
  } else if (pathname === "/users") {
    const html = pug.renderFile("./view/users.pug", { students, formatDate });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } else if (pathname.startsWith("/users/") && req.method === "POST") {
    const index = parseInt(pathname.split("/")[2]);
    students.splice(index, 1);
    res.writeHead(302, { Location: "/users" });
    res.end();
    // route pour suppression user
  } else if (pathname.startsWith("/delete")) {
    const userId = parseInt(pathname.split("/")[2]);
    if (userId >= 0 && userId < students.length) {
      students.splice(userId, 1);
      res.writeHead(302, { Location: "/users" });
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Utilisateur non trouvé</h1>");
    }
    // gestion des erreurs
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

if (process.env.APP_ENV === "dev") {
  const port = process.env.APP_PORT; //|| 8000;
  const localhost = process.env.APP_LOCALHOST; //|| "localhost";

  server.listen(port, () => {
    console.log(`Server listening on http://${localhost}:${port}`);
  });
}
