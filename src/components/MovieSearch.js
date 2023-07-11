import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { searchMovies, selectMovie } from '../feature/movie/movieSlice';
import MovieItemVertical from './MovieItemVertical';

const MovieSearchWrapper = styled.div`
  min-height: 80vh;
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
    justify-content: space-between;
    padding: 3rem;
    width: fit-content;
  }
  .search-result-item {
    width: 24rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .search-result-item img {
    width: 100%;
    border-radius: 1.2rem;
  }
`;

function MovieSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.movie.searchResults);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const status = useSelector((state) => state.movie.status);
  const error = useSelector((state) => state.movie.error);

  useEffect(() => {
    dispatch(searchMovies('')); // 검색어
  }, [dispatch]);

  // 이미지  상대 경로를 절대 경로로 변환하는 함수
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
    return <div>Loading...</div>; // <MovieSearchWrapper>Loading anmation
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <MovieSearchWrapper>
      {searchResults &&
      <div className='search-recent'>
        <h1>최근 검색 기록</h1>
        <h2>{selectedMovie.title}</h2>
      </div>
      }
        <div className='search-result'>
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className='search-result-item'
              onClick={() => {handleMovieClick(movie);}}
            >
              <MovieItemVertical  movie={movie}/>
            </div>
          ))}
        </div>
    </MovieSearchWrapper>
  );
}

export default MovieSearch;
