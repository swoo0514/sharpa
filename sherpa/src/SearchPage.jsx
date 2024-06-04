import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../src/style.css';
import SlowDisplay from './components/SlowDisplay';
//image import
import arrow from '../src/images/arrow.png';
import file from '../src/images/file-blank.png';
import pen from '../src/images/pen.png';
import redo from '../src/images/redo.png';

function SearchPage() {
  const [message, setMessage] = useState('');
  const [Replies, setReplies] = useState([]);
  const [userInput, setInput] = useState([]);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

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

  // Scroll to bottom when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations]);

  return (
    <div>
      <div>
        {conversations.map((conversation, index) => (
          <div key={index}>
            <div className="q_box">
              <span className="user_prof"></span>
              <div>{conversation.question}</div>
              <img className="pen" src={pen} alt="pen" />
            </div>
            <br />
            <div>
              <div key={index}>
                <div className="a_box">
                  <span className="sherpa_prof"></span>
                  <SlowDisplay
                    key={index}
                    text={conversation.answer}
                    speed={100}
                  />
                  <img className="file" src={file} alt="file" />
                  <img className="redo" src={redo} alt="file" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
            <img src={arrow} alt="img" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
