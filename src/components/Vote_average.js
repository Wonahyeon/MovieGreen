import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from '../category/MovieItem';
import styled from 'styled-components';

const MovieListBlock = styled.div`
  background: #ffffff;
  color: #000;
  width: 100%;
  margin: 0 auto;
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #000;
    padding: 1rem;
    border-bottom: 0.2rem solid #000;
    span {
      margin-left: 0.5rem;
      font-size: 1rem;
    }
  }
  .titlet {
    font-size: 1.4rem;
    text-align: center;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 1rem;
    margin: 1rem;
    /* width: 1280px; */
    margin: 0 auto;

    .movie-item {
      margin-bottom: 10px;
      width: 20%;
    }

    .movie-item:hover .title {
      color: #000000;
    }
  }
  .see-more {
    text-align: center;
    margin-top: 2rem;
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



function MovieListVote({ targetVote }) {
  const [movies, setMovies] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [showSeeLess, setShowSeeLess] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: '43af09871fd391abc84a35b271386b01',
              language: 'ko-KR',
              vote_average_gte: targetVote,
            },
          }
        );
        const movies = response.data.results;
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [targetVote]);

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
      <div className="title">{targetVote}점 이상 평가한 영화</div>  
      <div className="content">
        {movies &&
          movies
            .filter(
              (movie) => movie.vote_average >= targetVote && movie.vote_average < targetVote + 1
            )
            .slice(0, visibleMovies)
            .map((movie) => (
              <div key={movie.id} className="movie-item">
                <MovieItem movie={movie} />
              </div>
            ))}
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

function MovieListVoteContainer() {
  const targetVotes = [8, 7, 6,];

  return (
    <div>
      {targetVotes.map((vote) => (
        <MovieListVote key={vote} targetVote={vote} />
      ))}
    </div>
  );
}

export default MovieListVoteContainer;