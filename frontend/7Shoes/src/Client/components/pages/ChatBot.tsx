// src/components/ChatBot.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { sender: 'user', text: inputMessage };
        setMessages(prev => [...prev, userMessage]);

        try {
        const response = await axios.post('https://localhost:7043/api/Chat', {
            message: inputMessage
        });

        const botMessage = { sender: 'bot', text: response.data.reply };
        setMessages(prev => [...prev, botMessage]);
        } catch (error) {
        const errorMessage = { sender: 'bot', text: 'Có lỗi xảy ra khi gửi yêu cầu.' };
        setMessages(prev => [...prev, errorMessage]);
        }

        setInputMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg h-[500px] d-flex flex-column justify-content-between">
          <div className="overflow-auto flex-grow-1 mb-3">
            <div className="list-group">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`list-group-item p-3 rounded mb-2 ${
                    msg.sender === 'user' ? 'bg-primary text-white align-self-end' : 'bg-light text-dark align-self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
    
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control flex-grow-1"
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="btn btn-primary px-4 align-self-center"
            >
              Gửi
            </button>
          </div>
        </div>
      );
    };

export default ChatBot;
