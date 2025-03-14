import { Server } from 'socket.io';
import Message from '../models/chat.model.js';

// Fonction pour configurer les WebSockets
export const setupSocket = (server) => {
    const io = new Server(server, {
      cors: {
        origin: '*', // Permet les connexions de n'importe où
        methods: ['GET', 'POST']
      }
    });
  
    io.on('connection', (socket) => {
      console.log('Un utilisateur est connecté');
  
      socket.on('chatMessage', async (msg) => {
        try {
          const date = new Date();
          const newMessage = new Message({
            id: String(Date.now()),
            name: msg.name,
            message: msg.message,
            date: date.toLocaleDateString(),
            heure: date.toLocaleTimeString(),
          });
  
          await newMessage.save();
          io.emit('chatMessage', msg);
        } catch (err) {
          console.error('Erreur lors de l’enregistrement du message:', err);
        }
      });
  
      socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté");
      });
    });
  };