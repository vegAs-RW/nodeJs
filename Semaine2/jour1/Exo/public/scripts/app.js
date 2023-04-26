// init socket
const socket = io();

// Get DOM element
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("messages-list");
const userList = document.getElementById("user-list");
const channelList = document.getElementById("channel-list");
const channels = document.querySelectorAll(".channel-link");

// global variable
let activeChannel = "general";
const messages = {};

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
  if (messages[channel]) {
    messages[channel].forEach((data) => {
      const messageItem = document.createElement("li");
      messageItem.className = "msg";
      messageItem.innerHTML = `<div class=header-msg><span class=bold-2rem>${data.username}</span> <span class=italic-1rem>${data.message.formattedDate}</span></div><div>${data.message.message}</div>`;
      messageList.appendChild(messageItem);
    });
  }
}

// Switch to the 'general' channel by default
switchChannel("general");

channels.forEach((link) => {
  link.addEventListener("click", () => {
    const channel = link.dataset.channel;
    switchChannel(channel);
  });
});

const username = prompt("What is your username?") || "Batman";

// ----------------- EVENT ---------------------
// Event for listen on form
messageForm.addEventListener("submit", (event) => {
  const date = new Date();
  const formattedDate = date.toLocaleString("fr-FR");
  event.preventDefault();
  const message = messageInput.value;
  socket.emit("chat message", {
    message,
    channel: activeChannel,
    formattedDate,
  });
  messageInput.value = "";
});

// Event for channel link
channels.forEach((channel) => {
  channel.addEventListener("click", (event) => {
    event.preventDefault();
    const newChannel = event.target.getAttribute("data-channel");
    currentChannel = newChannel;
    //console.log(currentChannel);
    const activeChannel = document.querySelector(".active-channel");
    activeChannel.classList.remove("active-channel");
    event.target.parentNode.classList.add("active-channel");
    //messageList.innerHTML = "";
    socket.emit("change channel", channel.textContent);
  });
});

// Event for typing
messageInput.addEventListener("keypress", () => {
  socket.emit("notifyWritting", { user: socket.username });
});

socket.emit("new user", username);

socket.on("users", (users) => {
  userList.innerHTML = "";
  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.textContent = user;
    userList.appendChild(userItem);
  });
});

socket.on("chat message", (data) => {
  if (!messages[data.message.channel]) {
    messages[data.message.channel] = [];
  }
  messages[data.message.channel].push(data);
  //console.log(messages[data.message.channel]);
  if (data.message.channel === activeChannel) {
    console.log(data);
    const messageItem = document.createElement("li");
    messageItem.className = "msg";
    messageItem.innerHTML = `<div class=header-msg><span class=bold-2rem>${data.username}</span> <span class=italic-1rem>${data.message.formattedDate}</span></div><div>${data.message.message}</div>`;
    messageList.appendChild(messageItem);
  }
});

// Typing
socket.on("notifyWritting", (username) => {
  const writingDiv = document.getElementById("writing");
  writingDiv.innerHTML = `<span class=italic-1rem>${username} est en train d'écrire ...</span>`;
  setTimeout(() => {
    writingDiv.textContent = "";
  }, 3000);
});
