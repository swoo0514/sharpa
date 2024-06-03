import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/style.css';
import SlowDisplay from './components/SlowDisplay';

function SearchPage() {
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
      <div>
        {conversations.map((conversation, index) => (
          <div key={index}>
            <div className="q_box">{conversation.question}</div>
            <br />
            <div>
              <div key={index}>
                <div className="a_box">
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

      <div>
        <div className="input_box_wrapper">
          <input
            className="input_box"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="더 알고 싶은 내용이 있나요?"
          />
          <button className="send_btn" onClick={handleChat}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
