import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { searchMovies, selectMovie } from '../feature/movie/movieSlice';

const MovieSearchWrapper = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
  h3 {
    font-weight: bold;
  }
  li {
    margin: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 20rem;
    border-radius: 1.2rem;
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
    navigate(`/movie-detail/${movie.id}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <MovieSearchWrapper>
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id} onClick={() => {handleMovieClick(movie);}}>
            <img src={getImageUrl(movie.poster_path)
} alt={movie.title} />
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </MovieSearchWrapper>
  );
}

export default MovieSearch;
