const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('messages-list');
const userList = document.getElementById('user-list');
const channelList = document.getElementById('channel-list');
const channels = document.querySelectorAll('.channel-link');

const username = prompt('Quel est votre nom d\'utilisateur ?');

socket.emit('new user', username);

socket.on('users', (users) => {
  userList.innerHTML = '';
  users.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.textContent = user;
    userList.appendChild(userItem);
  });
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit('chat message', message);
  messageInput.value = '';
});

socket.on('chat message', (data) => {
  const messageItem = document.createElement('li');
  messageItem.innerHTML = `<strong>${data.username}</strong>: ${data.message}`;
  messageList.appendChild(messageItem);
});



