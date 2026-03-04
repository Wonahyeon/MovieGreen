import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { searchMovies, selectMovie } from '../feature/movie/movieSlice';
import MovieItemVertical from './MovieItemVertical';
import Lottie from "lottie-react";
import loadingLottie from "../lottie/animation_lk2i29a8.json";
import errorLottie from "../lottie/animation_lk2j1580.json";

const MovieSearchWrapper = styled.div`
  min-height: 80vh;
  margin: 0 auto;
  width: 100%;
  max-width: 60rem;
  padding: 0 1rem; // 모바일 패딩
  .search-recent {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    width: 60rem;
    margin: 0 auto;
    margin-bottom: 2rem;

    h1 {
      width: fit-content;
      margin-right: 2rem;
    }
  }
  .search-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;  // 중앙 정렬
    gap: 2rem;  // 아이템 간격
    padding: 2rem 1rem;  // 반응형 패딩
    margin: 0 auto;
  }
  .search-result > div {
    width: 40%;
    margin: 0 auto;
  }
  .search-result-item {
    width: 24rem;
  }
  .search-result-item img {
    width: 100%;
    border-radius: 1.2rem;
  }
  /* 태블릿 */
  @media (max-width: 1024px) {
    .search-result-item {
      width: 18rem;
    }
  }
  
  /* 모바일 */
  @media (max-width: 768px) {
    padding: 0 0.5rem;
    
    .search-result {
      padding: 1.5rem 0.5rem;
    }
    
    .search-result-item {
      width: 100% !important; //  한 줄에 하나씩
      max-width: 15rem;  //  최대 너비 제한
      margin: 0 auto;  //  중앙 정렬
    }
  }
  
  /* 초소형 모바일 */
  @media (max-width: 480px) {
    .search-result-item {
      width: 100%;  // 한 줄에 하나씩
      max-width: 15rem;  //  최대 너비 제한
      margin: 0 auto;  // 중앙 정렬
    }
  }
`;

function MovieSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.movie.searchResults);
  const status = useSelector((state) => state.movie.status);

  useEffect(() => {
    dispatch(searchMovies('')); // 검색어
  }, [dispatch]);


  const handleMovieClick = (movie) => {
    dispatch(selectMovie(movie));
    navigate(`/movie-detail/${movie.id}`);
  };

  if (status === 'loading') {
    return (
      <MovieSearchWrapper>
        <Lottie animationData={loadingLottie} />
      </MovieSearchWrapper>
    );
  }

  if (status === 'failed') {
    return (
      <MovieSearchWrapper>
        <Lottie animationData={errorLottie} />
      </MovieSearchWrapper>
    );
  }

  return (
    <MovieSearchWrapper>
      <div className='search-result'>
        {searchResults.length !== 0 ?
          searchResults
          .filter(movie => movie.backdrop_path || movie.poster_path)
          .map((movie) => (
            <div
            key={movie.id}
            className='search-result-item'
            onClick={() => {handleMovieClick(movie);}}
            >
              <MovieItemVertical  movie={movie}/>
            </div>
          ))
        :
          <Lottie animationData={loadingLottie} />
        }
      </div>
    </MovieSearchWrapper>
  );
}

export default MovieSearch;
