import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import SlowDisplay from './components/SlowDisplay';

function MainPage() {
  const [message, setMessage] = useState('');
  const [Replies, setReplies] = useState([]);

  const handleChat = async () => {
    if (!message) return;
    try {
      const response = await axios.post('http://localhost:3001/chat', {
        userPrompt: message,
      });

      setReplies((Replies) => [...Replies, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Error during the chat request:', error);
      setReplies(
        (Replies = [
          ...Replies,
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
      {/* <div>
        {Replies.map((reply, index) => (
          <p>{reply}</p>
        ))}
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* {displayReplies.map((reply, index) => ( */}
        {/* // <div key={index}>{reply}</div> */}
        {/* <div style={{ display: 'flex' }}>
          <SlowDisplay Replies={Replies} speed={100} /> */}
        {Replies.map((reply, index) => (
          <SlowDisplay key={index} text={reply} speed={100} />
        ))}
      </div>
    </div>
    // </div>
  );
}

export default MainPage;
