import React from 'react';
import { MdLink } from 'react-icons/md';

import styled from 'styled-components';

const Button = styled.div`


    button {
    padding: 0.5rem 1rem;
    color: ${props => props.theme.main};
    border: 0.2rem solid ${props => props.theme.main};
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;

   :hover {
      background: ${props => props.theme.main};
      color: #fff;
    }
  }
  
`


function OTTLinks({ movie }) {
  const generateOTTLinks = (movie) => {
    const ottLinks = {
      Netflix: `https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`,
      Amazon: `https://www.amazon.com/s?k=${encodeURIComponent(movie.title)}`,
      Wavve: `https://www.wavve.com/search?searchWord=${encodeURIComponent(movie.title)}`,
      Watcha: `https://watcha.com/ko-KR/search?query=${encodeURIComponent(movie.title)}`,
      Disney: `https://www.disneyplus.com/search?q=${encodeURIComponent(movie.title)}`,
    };

    return ottLinks;
  };

  const handleOTTClick = (platform) => {
    const ottLinks = generateOTTLinks(movie);
    const link = ottLinks[platform];
    window.open(link, '_blank');
  };

  return (
    <Button>

      <button onClick={() => handleOTTClick('Netflix')}>
        넷플릭스 <MdLink />
      </button>
      <button onClick={() => handleOTTClick('Amazon')}>
        아마존 <MdLink />
      </button>
      <button onClick={() => handleOTTClick('Wavve')}>
        웨이브 <MdLink />
      </button>
      <button onClick={() => handleOTTClick('Watcha')}>
        왓챠 <MdLink />
      </button>

    </Button>
  );
}

export default OTTLinks;