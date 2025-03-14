import Chat from '../models/chat.model.js';

export const createMessage = async (req, res) => {
  const { id, name, message, date, heure } = req.body;
  try {
    const newMessage = new Chat({ id, name, message, date, heure });
    
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du message', error: err });
  }
};

export const getMessage = async (req, res) => {
  try {
    const logs = await Chat.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages', error: err });
  }
};


export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await Chat.deleteOne({ id });
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du message', error: err });
  }
};
