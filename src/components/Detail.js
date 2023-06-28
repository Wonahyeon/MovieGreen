import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import test from "../detail-test.json";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectMovie } from '../feature/movie/movieSlice';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: 50rem;
  img {
    border-radius: 0.5rem;
  }
  .up {
    display: flex;
    justify-content: space-around;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  span {
    font-weight: 400;
  }
`;

const Pick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: pink;
    cursor: pointer;
  }
`;

const Intro = styled.div`
  margin:  2rem 3rem;
  font-weight: bold;
  span {
    font-weight: 400;
  }
`;

function Detail(props) {
  const [pick, setPick] = useState(false);
  const [movieList, setMovieList] = useState(null);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);


  const handlePick = () => {
    setPick(!pick);
  };

  // 이미지 경로를 절대 경로로 변환하는 함수
  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };


  return (
      <DetailWrapper>
        <div className='up'>
          <img src={getImageUrl(selectedMovie.poster_path)}/>
          <Content>
            <h3 style={{fontSize: '1.5rem'}}>{selectedMovie.title}</h3>
            <h3>감독 : <span>{undefined}</span></h3>
            <h3>출연 : <span>{undefined}</span></h3>
            <h3>장르 : <span>{undefined}</span></h3>
            <h3>국가 : <span>{undefined}</span></h3>
          </Content>
          <Pick>
            {!pick && <MdFavoriteBorder onClick={handlePick}/>}
            {pick && <MdFavorite onClick={handlePick}/>}
            <p>찜하기</p>
          </Pick>
        </div>
        <Intro>소개 : <span>{selectedMovie.overview}</span></Intro>
      </DetailWrapper>
  );
}

export default Detail;