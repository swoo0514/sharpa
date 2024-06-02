import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function MainPage() {
  const [message, setMessage] = useState('');
  const [botReplies, setBotReplies] = useState([]);

  const handleChat = async () => {
    if (!message) return;
    try {
      const response = await axios.post('http://localhost:3001/chat', {
        userprompt: message,
      });

      setBotReplies((botReplies) => [...botReplies, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Error during the chat request:', error);
      setBotReplies(
        (botReplies = [
          ...botReplies,
          'Sorry, an error occurred while trying to get a response. ',
        ])
      );
    }
  };

  return (
    <div>
      <h1>Chat Bot</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleChat}>Send</button>
      </div>
      <div>
        {botReplies.map((reply, index) => (
          <p>{reply}</p>
        ))}
      </div>
    </div>
  );
}
export default MainPage;
