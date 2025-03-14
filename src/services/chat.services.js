import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Setup de mongo DB
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  const Message = mongoose.model('Message', new mongoose.Schema({
    id: String,
    name: String,
    message: String,
    date: Date,
    heure: String,  
  }));

// permet d'utiliser des fichier static pour le front end
app.use(express.static('public'));
// mise en place des web socket pour communiquer en temps reel
io.on('connection', (socket) => {
    console.log('un utlisateur est connecter');
    socket.on('chatMessage', (msg) => {
        const date = new Date();
});
