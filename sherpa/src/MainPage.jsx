import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/style.css';
import SlowDisplay from './components/SlowDisplay';

function MainPage() {
  const [message, setMessage] = useState('');
  const [Replies, setReplies] = useState([]);
  const [userInput, setInput] = useState([]);
  const [conversations, setConversations] = useState([]);

  const handleChat = async () => {
    if (!message) return;
    try {
      const response = await axios.post('http://localhost:3001/chat', {
        userPrompt: message,
      });

      setReplies((Replies) => [...Replies, response.data]);
      setInput([...userInput, message]);
      setMessage('');
      //add
      const newConversation = { question: message, answer: response.data };
      setConversations((conversations) => [...conversations, newConversation]);
    } catch (error) {
      console.error('Error during the chat request:', error);
      setReplies(
        (Replies = [
          ...Replies,
          'Sorry, an error occurred while trying to get a response. ',
        ])
      );
      const newConversation = {
        question: message,
        answer: 'Sorry, an error occurred while',
      };
      setConversations((conversations) => [...conversations, newConversation]);
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
        {conversations.map((conversation, index) => (
          <div key={index}>
            {conversation.question}
            <br />
            <div>
              <div key={index}>
                <div
                  className="test2"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid black',
                  }}
                >
                  <SlowDisplay
                    key={index}
                    text={conversation.answer}
                    speed={100}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MainPage;
