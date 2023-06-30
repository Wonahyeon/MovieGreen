import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import styled from 'styled-components';

const MovieListBlock = styled.div`
  background: #aabb93;
  color: #ffffff;
  width: fit-content;
  margin: 0 auto;
  .title {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
    border-bottom: 0.2rem solid;
    span {
      margin-left: 0.5rem;
      font-size: 1rem;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 1rem;
    margin: 1rem;
    width: 1280px;
    margin: 0 auto;
  }
  .see-more {
    text-align: center;
    margin-top: 1rem;
    button {
      padding: 0.5rem 1rem;
      background: none;
      color: #000;
      border: 0.1rem solid #000;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
  .more {
  font-size: 30px;
  margin-top: 260%;
  }
  .less {
    font-size: 30px;
  }
  .movies-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    grid-gap: 20px;
  }

  .movies-grid .movie-poster {
    width: 100%;
  }
`;

function MovieListCountry({ targetCountry }) {
  const [movies, setMovies] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [showSeeLess, setShowSeeLess] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: '43af09871fd391abc84a35b271386b01',
              
              language: 'ko-KR',
              without_genres: '18,10749,',
              with_original_language: targetCountry === '한국' ? 'ko' : 'en',
            },
          }
        );
        const movies = response.data.results.filter(movie => movie.genre_ids.length > 0);

        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [targetCountry]);

  const handleSeeMore = () => {
    setVisibleMovies(movies.length);
    setShowSeeMore(false);
    setShowSeeLess(true);
  };

  const handleSeeLess = () => {
    setVisibleMovies(4);
    setShowSeeMore(true);
    setShowSeeLess(false);
  };
  console.log('mmmmmmmmmovies', movies);
  return (
    <MovieListBlock>
      <div className="title">
        {targetCountry} 영화
      </div>
      <div className="content">
        <div className="movies-grid">
          {movies &&
            movies.slice(0, visibleMovies).map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>

        {showSeeMore && (
          <div className="see-more">
            <button onClick={handleSeeMore} className="more">
              ➤
            </button>
          </div>
        )}
      </div>
      {showSeeLess && (
        <div className="see-more">
          <button onClick={handleSeeLess} className="less">
            ✕
          </button>
        </div>
      )}
    </MovieListBlock>
  );
}


function MovieListCountryContainer() {
  return (
    <div>
      <MovieListCountry targetCountry="한국" />
      <MovieListCountry targetCountry="외국" />
    </div>
  );
}

    export default MovieListCountryContainer;