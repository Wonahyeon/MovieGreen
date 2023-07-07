import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import styled from 'styled-components';

const MovieListBlock = styled.div`
  background: #ffffff;
  color: #000;
  width: fit-content;
  margin: 0 auto;
  .title {
    font-size: 1.2rem;
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
    display: flex;
    justify-content: center;

    .more,
    .less {
      font-size: 30px;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      background: none;
      color: #000;
      border: 0.1rem solid #000;
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        background: rgb(200, 228, 122);
        color: #fff;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 50px;
  input {
    font-size: 50px;
    width: 130px;
    text-align: center;
  }

  button , .selectGenre , .selectCountry{
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background: none;
    color: #000;
    border: 0.1rem solid #000;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    outline: none;

    &:hover {
      background: rgb(200, 228, 122);
      color: #fff;
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


function MovieListYear({ targetDate, selectedGenre, targetCountry }) {
  const [movies, setMovies] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [showSeeLess, setShowSeeLess] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: '43af09871fd391abc84a35b271386b01',
              language: 'ko-KR',
              // without_genres: '10749,18',
              year: targetDate,
              // with_genres: selectedGenre,
              // with_original_language: targetCountry === '한국' ? 'ko' : 'en',
            },
          }
        );
        const movies = response.data.results;
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [targetDate, selectedGenre, targetCountry]);


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
        {targetDate.slice(0, 4)}년<span>{targetDate}</span>
      </div>
      <div className="content">
        {movies &&
          movies
            .filter((movie) => movie.vote_count > 0 && movie.backdrop_path !== null)
            .slice(0, visibleMovies)
            .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
      </div>
      {showSeeMore && (
        <div className="see-more">
          <button onClick={handleSeeMore} className="more">
            ↓
          </button>
        </div>
      )}
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

function MovieListYearContainer() {
  const today_year = String(new Date().getFullYear());
  const [inputValue, setInputValue] = useState('');
  const [targetDates, setTargetDates] = useState(['2005', '2010', '2015', today_year]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [targetCountry, setTargetCountry] = useState('한국');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setTargetDates([inputValue, ...targetDates]);
      setInputValue('');
    }
  };

  const deleteItem = () => {
    const confirmDelete = window.confirm('추가한 연도를 정말로 모두 삭제하시겠습니까?');
    if (confirmDelete) {
      const targetDatess = ['2005', '2010', '2015', today_year];
      setTargetDates([...targetDatess]);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleCountryChange = (event) => {
    setTargetCountry(event.target.value);
  };
  return (
    <>
      {/* <ButtonContainer>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              addItem();
            }
          }}
        />
        년
        <button onClick={addItem} className="addItem">
          추가
        </button>
        <button onClick={deleteItem} className="deleteItem"  disabled={targetDates.length === 4}>
          모두 삭제
        </button>
        <select value={selectedGenre} onChange={handleGenreChange} className='selectGenre'>
          <option value="">모든 장르</option>
          {targetGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select value={targetCountry} onChange={handleCountryChange} className='selectCountry'>
          <option value="한국">한국</option>
          <option value="외국">외국</option>
        </select>
        
      </ButtonContainer> */}

      <div>
        {targetDates.map((date) => (
          <MovieListYear key={date} targetDate={date} selectedGenre={selectedGenre} targetCountry={targetCountry} />
        ))}
      </div>
    </>
  );
}

export default MovieListYearContainer; 
