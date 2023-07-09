import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import styled from 'styled-components';

const MovieListBlock = styled.div`
  background: linear-gradient(to bottom, #B8F3B8, #FFADC5, #B8F3B8);
  color: #ffffff;
  padding: 2rem;

  .title {
    font-size: 2rem;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 2px solid #ffffff;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .content {
    display: flex;
    flex-wrap: wrap; 
    gap: 1rem;
  }

  .see-All,
  .see-NotAll {
    text-align: center;
    margin-top: 2rem;
  }

  .see-All button,
  .see-NotAll button {
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    background: #ffffff;
    color: #000000;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #cccccc;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;

  select {
    font-size: 1.2rem;
    width: 200px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    background: rgba(255, 255, 255, 0.9);
    color: #000000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;

&:hover {
  background-color: rgba(0, 0, 0, 0.1);
}


&:focus {
  border-color: #00bfff;
  box-shadow: 0 0 0.5rem rgba(0, 191, 255, 0.5);
}


&::-ms-expand {
  display: none;
}


&::after {
  content: "\\25BC";
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
}
  }
`;

const targetGenres = [
  { id: '28', name: '액션' },
  { id: '12', name: '어드벤쳐' },
  { id: '16', name: '애니메이션' },
  { id: '35', name: '코미디' },
  { id: '80', name: '범죄' },
  { id: '99', name: '다큐멘터리' },
  { id: '10751', name: '가족' },
  { id: '14', name: '판타지' },
  { id: '36', name: '역사' },
  { id: '27', name: '공포' },
  { id: '10402', name: '음악' },
  { id: '9648', name: '미스테리' },
  { id: '878', name: 'SF(Science Fiction)' },
  { id: '10770', name: 'TV 영화' },
  { id: '53', name: '스릴러' },
  { id: '10752', name: '전쟁' },
  { id: '37', name: '서부' },
];

const DecoratedMovieItem = styled(MovieItem)`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

function MovieListCountry({ targetCountry, selectedGenre }) {
  const [movies, setMovies] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(8);
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
              without_genres: '18,10749',
              with_genres: selectedGenre,
              with_original_language: targetCountry === '한국' ? 'ko' : 'en',
            },
          }
        );
        const movies = response.data.results.filter(
          (movie) => movie.genre_ids.length > 0
        );

        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [targetCountry, selectedGenre]);

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
      <div className="title">{targetCountry} 영화</div>
      <div className="content">
        {movies &&
          movies
            .filter((movie) => movie.vote_count > 0)
            .slice(0, visibleMovies)
            .map((movie) => (
              <DecoratedMovieItem key={movie.id} movie={movie} />
            ))}
      </div>

      {showSeeMore && (
        <div className="see-All">
          <button onClick={handleSeeMore}>더보기</button>
        </div>
      )}

      {showSeeLess && (
        <div className="see-NotAll">
          <button onClick={handleSeeLess}>접기</button>
        </div>
      )}
    </MovieListBlock>
  );
}

function MovieListCountryContainer() {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <>
      <ButtonContainer>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="selectGenre"
        >
          <option value="">모든 장르</option>
          {targetGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </ButtonContainer>
      <div>
        <MovieListCountry targetCountry="한국" selectedGenre={selectedGenre} />
        <MovieListCountry targetCountry="외국" selectedGenre={selectedGenre} />
      </div>
    </>
  );
}

export default MovieListCountryContainer;
