// src/components/ChatButton.jsx
import React, { useState } from 'react';
import ChatBot from '../pages/ChatBot';
import styled from 'styled-components';

// Styled components
const ChatButtonStyled = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #3b82f6;
  color: white;
  padding: 16px;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ChatBoxStyled = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 320px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
`;

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ChatButtonStyled onClick={toggleChat}>
        <span className="text-2xl">💬</span>
      </ChatButtonStyled>

      {isOpen && (
        <ChatBoxStyled>
          <ChatBot />
        </ChatBoxStyled>
      )}
    </div>
  );
};

export default ChatButton;
