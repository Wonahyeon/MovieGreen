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

const MovieList = ({ targetGenre, genreName }) => {
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
              region: 'KR',
              
              with_genres: targetGenre,
            },
          }
        );

        const movies = response.data.results;
        setMovies(movies);
        console.log('movies', movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [targetGenre]);

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

  return (
    <MovieListBlock>
      <div className="title">
        {genreName}
        <span></span>
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
};

function MovieListYearContainer() {
  const targetGenres = [
    { id: '28', name: '액션' },
    { id: '12', name: '어드벤쳐' },
    { id: '16', name: '애니메이션' },
    { id: '35', name: '코미디' },
    { id: '80', name: '범죄' },
    { id: '99', name: '다큐멘터리' },
    { id: '18', name: '드라마' },
    { id: '10751', name: '가족' },
    { id: '14', name: '판타지' },
    { id: '36', name: '역사' },
    { id: '27', name: '공포' },
    { id: '10402', name: '음악' },
    { id: '9648', name: '미스테리' },
    { id: '10749', name: '로맨스' },
    { id: '878', name: 'SF(Science Fiction)' },
    { id: '10770', name: 'TV 영화' },
    { id: '53', name: '스릴러' },
    { id: '10752', name: '전쟁' },
    { id: '37', name: '서부' },
  ];

  return (
    <div>
      {targetGenres.map((genre) => (
        <MovieList
          key={genre.id}
          targetGenre={genre.id}
          genreName={genre.name}
        />
      ))}
    </div>
  );
}

export default MovieListYearContainer; 


