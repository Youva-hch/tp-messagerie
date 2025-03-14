import Message from '../models/chat.model.js';

// Fonction pour récupérer tous les messages
export const getMessages = async (req, res) => {
  try {
    const logs = await Message.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages', error: err });
  }
};

// Fonction pour supprimer un message par ID
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await Message.deleteOne({ id });
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du message', error: err });
  }
};
