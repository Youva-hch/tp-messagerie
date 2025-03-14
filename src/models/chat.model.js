const MessageSchema = new mongoose.Schema({
    id: String,
    name: String,
    message: String,
    date: Date,
    heure: String,
  });
  
  const Message = mongoose.model('Message', MessageSchema);
  
  export default Message;