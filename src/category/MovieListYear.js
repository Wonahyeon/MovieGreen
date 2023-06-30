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

button {
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
    background: #000;
    color: #fff;
  }
}
`;

function MovieListYear({ targetDate }) {
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
              region: 'KR',
              without_genres: '10749, 18',
              year: targetDate,
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

    fetchMovie();
  }, [targetDate]);

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
          movies.slice(0, visibleMovies).map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
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
function MovieListYearContainer() {
  const today_year = String(new Date().getFullYear());
  const today_month = String(new Date().getMonth() + 1).padStart(2, '0');
  const today_date = String(new Date().getDate()).padStart(2, '0');
  const today = today_year + today_month + today_date;
  const [inputValue, setInputValue] = useState('');
  const [targetDates, setTargetDates] = useState(['2005', '2010', '2015', today_year]);
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
    const confirmDelete = window.confirm(' 추가한 연도를 정말로 모두 삭제하시겠습니까? ');
  if (confirmDelete) {
      const targetDatess = ['2005', '2010', '2015', today_year]
      setTargetDates([...targetDatess])
    }
  }
  return (
    <>
        <ButtonContainer>
      <input type="text" value={inputValue} onChange={handleInputChange}  onKeyUp={(e) => {
          if (e.key === 'Enter') {
            addItem()
          }
        }}/>년
      <button onClick={addItem} className='addItem'>추가</button> 
      <button onClick={deleteItem} className='deleteItem'>모두 삭제</button> 
        </ButtonContainer>
      
      <div>
        {targetDates.map((date) => (
          <MovieListYear key={date} targetDate={date} />
        ))}
      </div>
    </>
  );
}

export default MovieListYearContainer;