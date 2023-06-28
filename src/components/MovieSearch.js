import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { searchMovies, selectMovie } from '../feature/movie/movieSlice';

const MovieSearchWrapper = styled.div`
  margin-top: 1rem;
  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  li {
    display: flex;
    justify-content: space-between;
    margin: 2rem;
  }
  img {
    width: 10rem;
    border-radius: 1.2rem;
  }
  .contents {
  }
`;

function MovieSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.movie.searchResults);
  const status = useSelector((state) => state.movie.status);
  const error = useSelector((state) => state.movie.error);

  

  useEffect(() => {
   dispatch(searchMovies('어벤져스')); // 검색어
  }, [dispatch]);

  // 이미지 경로를 절대 경로로 변환하는 함수
  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const handleMovieClick = (movie) => {
    dispatch(selectMovie(movie));
    navigate("/movie-detail");
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <MovieSearchWrapper>
      <h2>어벤져스 검색 결과</h2>
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id} onClick={() => {handleMovieClick(movie)}}>
            <img src={getImageUrl(movie.poster_path)
} alt={movie.title} />
            <div className='contents'>
              <h3>{movie.title}</h3>
              <h3>{movie.release_date}</h3>
              <h3>{movie.popularity}</h3>
              <h3>{movie.overview}</h3>
            </div>
          </li>
        ))}
      </ul>
    </MovieSearchWrapper>
  );
}

export default MovieSearch;
