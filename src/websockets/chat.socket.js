import Message from '../models/chat.model.js';

// Fonction pour configurer les WebSockets
export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('chatMessage', (msg) => {
      const date = new Date();

      const newMessage = new Message({
        id: String(Date.now()),
        name: msg.name,
        message: msg.message,
        date: date.toLocaleDateString(),
        heure: date.toLocaleTimeString(),
      });

      newMessage.save()
        .then(() => {
          io.emit('chatMessage', msg);
        })
        .catch((err) => console.log(err));
    });

    socket.on('disconnect', () => {
      console.log('Un utilisateur s\'est déconnecté');
    });
  });
};