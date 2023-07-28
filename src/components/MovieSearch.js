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
  width: 60rem;
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
  .search-result > div {
    width: 40%;
    margin: 0 auto;
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
          searchResults.map((movie) => (
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
