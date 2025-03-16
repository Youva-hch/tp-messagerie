import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    // Connexion WebSocket
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && name.trim()) {
      const message = {
        name: name,
        message: input,
      };
      ws.current.send(JSON.stringify(message));
      setInput("");
    }
  };

  return (
    <div>
      <h1>Chat en temps réel</h1>
      <div>
        <input
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Écrivez un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.name}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;