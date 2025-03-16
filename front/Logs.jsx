import React, { useState, useEffect } from "react";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  // Récupérer les logs
  const fetchLogs = async () => {
    const response = await axios.get("http://localhost:8080/logs");
    setLogs(response.data);
  };

  // Supprimer un log par ID
  const deleteLog = async (id) => {
    await axios.delete(`http://localhost:8080/logs/${id}`);
    fetchLogs(); // Rafraîchir la liste après suppression
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Logs des conversations</h1>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            <strong>{log.name}</strong>: {log.message} ({log.date} à {log.heure})
            <button onClick={() => deleteLog(log._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;