import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from '../MovieItem';
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

function MovieList() {
  const [movies, setMovies] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [showSeeLess, setShowSeeLess] = useState(false);

  const today_year = String(new Date().getFullYear());
  const today_month = String(new Date().getMonth() + 1);
  const today_date = String(new Date().getDate());
  const today = today_year + (today_month < 10 ? '0' + today_month : today_month) + (today_date < 10 ? '0' + today_date : today_date);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20101231`);
        console.log(response.data.boxOfficeResult.dailyBoxOfficeList);

        setMovies(response.data.boxOfficeResult.dailyBoxOfficeList);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMovie();
  }, []);

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
        2010년<span>20101231</span>
      </div>
      <div className="content">
        {movies &&
          movies.slice(0, visibleMovies).map((movie) => (
            <MovieItem key={movie.movieCd} movie={movie} />
          ))}
      {showSeeMore && (
        <div className="see-more">
          <button onClick={handleSeeMore} className='more'>➤</button>
        </div>
      )}
      </div>
      {showSeeLess && (
        <div className="see-more">
          <button onClick={handleSeeLess} className='less'>✕</button>
        </div>
      )}
    </MovieListBlock>
  );
}

export default MovieList;
