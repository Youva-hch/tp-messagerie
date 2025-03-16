import express from 'express';
import { getMessage, deleteMessage } from '../services/chat.services.js';

const router = express.Router();

// Route pour obtenir tous les messages
router.get('/', getMessage);

// Route pour supprimer un message par ID
router.delete('/:id', deleteMessage);

export default router;