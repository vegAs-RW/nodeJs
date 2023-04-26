const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

const io = socketio(server);

let users = [];

io.on("connection", (socket) => {
  console.log("Nouvelle connexion");

  socket.on("new user", (username) => {
    socket.username = username;
    users.push(username);
    console.log(`Salut ${username}, commence a discuter`);
    io.emit("users", users);
  });

  socket.on("chat message", (message) => {
    io.emit("chat message", { username: socket.username, message });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} c'est déco`);
    users = users.filter((user) => user !== socket.username);
    io.emit("users", users);
  });

  socket.on("notifyWritting", () => {
    io.emit("notifyWritting", socket.username);
  });
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
