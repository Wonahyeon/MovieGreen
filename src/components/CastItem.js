import React from 'react';
import styled from 'styled-components';

const CastItemWrapper = styled.div`
display: flex;
align-items: center;
width: 25rem;
margin-bottom: 2rem;
  .profile-img {
    width: 10rem;
    height: 15rem;
  }
  .profile-text {
    width: 30rem;
  }
  .profile-name {
    font-weight: bold;
  }
`;

function CastItem(props) {
  const {cast} = props;

  // 이미지 경로를 절대 경로로 변환하는 함수
  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <CastItemWrapper>
      <img src={getImageUrl(cast.profile_path)} alt={cast.name} className='profile-img' />
      <div className='profile-text'>
        <h3 className='profile-name'>{cast?.name}</h3>
        <h3>{cast?.character}역</h3>
      </div>
    </CastItemWrapper>
  );
}

export default CastItem;