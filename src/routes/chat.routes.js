import express from 'express';
import { getMessages, deleteMessage } from '../services/chat.services.js';

const router = express.Router();

// Route pour obtenir tous les messages
router.get('/', getMessages);

// Route pour supprimer un message par ID
router.delete('/:id', deleteMessage);

export default router;