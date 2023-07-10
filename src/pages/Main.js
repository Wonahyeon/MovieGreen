import React, { useState } from 'react';
import Video from '../components/Video';
import MovieTopNumber from '../components/MovieTopNumber';
import MoviePick from '../components/MoviePick';
import MovieListVote from "../components/MovieListVote";
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../feature/user/userSlice';
import ChatbotModal from '../modal/ChatbotModal';
import styled from 'styled-components';

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

function Main(props) {
  const logInStatus = useSelector(selectLoginUser);
  const [modal, setModal] = useState(false);
  return (
    <div>
      <Video />
      <MovieTopNumber />
      {logInStatus && <MoviePick/>}
      <MovieListVote />
      <FloatingButton onClick={() => setModal(true)}>
        📢
      </FloatingButton>
      {modal && <ChatbotModal/>}
    </div>
  );
}

export default Main;