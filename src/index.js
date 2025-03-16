import express from 'express';
import dotenv from "dotenv";
import http from 'http';
import socketIo from 'socket.io';
import mongoose from 'mongoose';
import { connectDB } from './db';  
import { setupSocket } from './websockets';  
import messageRoutes from './routes/chat.routes'; 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connexion à MongoDB
connectDB();

// Middleware pour servir les fichiers front-end
app.use(express.static('public'));

// Routes
app.use('../routes/chat.routes.js', messageRoutes);

// WebSocket
setupSocket(io);

// Démarrer le serveur
server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
