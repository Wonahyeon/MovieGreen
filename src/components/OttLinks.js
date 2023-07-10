import React from 'react';
// import { MdLink } from 'react-icons/md';
import styled from 'styled-components';

import netflixImage from './image/netflix.png';
import amazonImage from './image/아마존.png';
import wavveImage from './image/웨이브.png';
import watchaImage from './image/왓챠.png';

const Button = styled.div`
  button {
    padding: 0.5rem 1rem;
    margin: 10px;
    color: ${props => props.theme.main};
    border: 0.2rem solid ${props => props.theme.main};
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.4);
    }
  }
`;

function OTTLinks({ movie }) {
  const generateOTTLinks = movie => {
    const ottLinks = {
      Netflix: `https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`,
      Amazon: `https://www.amazon.com/s?k=${encodeURIComponent(movie.title)}`,
      Wavve: `https://www.wavve.com/search?searchWord=${encodeURIComponent(movie.title)}`,
      Watcha: `https://watcha.com/ko-KR/search?query=${encodeURIComponent(movie.title)}`,
      Disney: `https://www.disneyplus.com/search?q=${encodeURIComponent(movie.title)}`
    };

    return ottLinks;
  };

  const handleOTTClick = platform => {
    const ottLinks = generateOTTLinks(movie);
    const link = ottLinks[platform];
    window.open(link, '_blank');
  };

  return (
    <Button>
      <button onClick={() => handleOTTClick('Netflix')} style={{ backgroundImage: `url(${netflixImage})` }}>
      </button>
      <button onClick={() => handleOTTClick('Amazon')} style={{ backgroundImage: `url(${amazonImage})` }}>
      </button>
      <button onClick={() => handleOTTClick('Wavve')} style={{ backgroundImage: `url(${wavveImage})` }}>
      </button>
      <button onClick={() => handleOTTClick('Watcha')} style={{ backgroundImage: `url(${watchaImage})` }}>
      </button>
    </Button>
  );
}

export default OTTLinks;
