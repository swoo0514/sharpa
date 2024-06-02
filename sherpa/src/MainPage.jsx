import React, { useState } from 'react';
import axios from 'axios';

function MainPage() {
  const [message, setMessage] = useState('');
  const [botReplies, setBotReplies] = useState([]);

  const handleChat = async () => {
    if (!message) return;
    try {
      const response = await axios.post('http://localhost:3001/chat', {
        userPrompt: message,
      });

      // 서버로부터 받은 응답을 배열에 추가
      const tokens = response.data.split('');
      console.log(tokens);
      setBotReplies((botReplies) => [...botReplies, ...tokens]);

      setMessage('');
    } catch (error) {
      console.error('Error during the chat request:', error);
      setBotReplies((botReplies) => [
        ...botReplies,
        'Sorry, an error occurred while trying to get a response. ',
      ]);
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
        {/* 각 토큰을 하나씩 출력 */}
        {botReplies.map((token, index) => (
          <span key={index}>{token}</span>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
