const socket = io();

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("messages-list");
const userList = document.getElementById("user-list");
const channelList = document.getElementById("channel-list");
const channels = document.querySelectorAll(".channel-link");

let activeChannel = "general";

// Function to switch channels
function switchChannel(channel) {
  activeChannel = channel;
  channels.forEach((c) => c.parentElement.classList.remove("active-channel"));
  const selectedChannel = document.querySelector(
    `a[data-channel="${channel}"]`
  );
  selectedChannel.parentElement.classList.add("active-channel");
  messageList.innerHTML = "";
  const channelHeading = document.querySelector("h1");
  channelHeading.textContent = `#${channel} channel`;
}

// Switch to the 'general' channel by default
switchChannel("general");

channels.forEach((link) => {
  link.addEventListener("click", () => {
    const channel = link.dataset.channel;
    switchChannel(channel);
  });
});

const username = prompt("What is your username?");

socket.emit("new user", username);

socket.on("users", (users) => {
  userList.innerHTML = "";
  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.textContent = user;
    userList.appendChild(userItem);
  });
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  //console.log( { message, channel: activeChannel });
  socket.emit("chat message", { message, channel: activeChannel });
  messageInput.value = "";
});

socket.on("chat message", (data) => {
  console.log(data);
  if (data.message.channel === activeChannel) {
    const messageItem = document.createElement("li");
    messageItem.innerHTML = `<strong>${data.username}</strong>: ${data.message.message}`;
    messageList.appendChild(messageItem);
  }
});

//Ajouter un gestionnaire d'événements pour chaque lien de channel
channels.forEach((channel) => {
  channel.addEventListener("click", (event) => {
    // Empêcher le comportement par défaut des liens de se déplacer vers une nouvelle page
    event.preventDefault();

    // Récupérer le nom du channel à partir de l'attribut data-channel
    const newChannel = event.target.getAttribute("data-channel");

    // Mettre à jour la valeur de currentChannel
    currentChannel = newChannel;
    console.log(currentChannel);
    // Mettre en surbrillance le lien de channel actif
    const activeChannel = document.querySelector(".active-channel");
    activeChannel.classList.remove("active-channel");
    event.target.parentNode.classList.add("active-channel");

    // Effacer la liste de messages actuelle
    //messageList.innerHTML = "";

    // Envoyer un message au serveur pour changer de channel
    socket.emit("change channel", channel.textContent);
  });
});

// Ecouter l'event d'ecriture
messageInput.addEventListener("keypress", () => {
  socket.emit("notifyWritting", { user: socket.username });
});

// ecriture
socket.on("notifyWritting", (username) => {
  const writingDiv = document.getElementById("writing");
  writingDiv.textContent = username + " is typing...";
  setTimeout(() => {
    writingDiv.textContent = "";
  }, 3000);
});
