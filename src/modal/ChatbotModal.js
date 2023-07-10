import React, { useState } from 'react';
import styled from 'styled-components';
import Chatbot from '../pages/Chatbot';

const Container = styled.div`
  position: relative;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #ffffff;
  color: #000000;
  font-size: 2rem;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 9998;
`;

const ModalContent = styled.div`
  width: 400px;
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: transparent;
  color: #000000;
  font-size: 1.5rem;
  cursor: pointer;
`;

function ChatbotModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Container>
        <>
          <ModalBackground />
          <ModalContent>
            <CloseButton onClick={toggleModal}>X</CloseButton>
            <Chatbot />
          </ModalContent>
        </>
    </Container>
  );
}

export default ChatbotModal;
