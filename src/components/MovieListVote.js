import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from '../category/MovieItem';
import styled from 'styled-components';

const MovieListBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #000;
    padding: 1rem;
    border-bottom: 0.2rem solid ${props => props.theme.main};
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
    /* padding: 1rem; */
    /* margin: 1rem; */
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
  .see-All,
  .see-NotAll {
    text-align: center;
  }

  .see-All button,
  .see-NotAll button {
    padding: 0.5rem 1rem;
    background: none;
    color: ${props => props.theme.main};
    border: 0.2rem solid ${props => props.theme.main};
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;


      &:hover {
        background: ${props => props.theme.main};
        color: #fff;
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

function MovieListVoteContainer() {
  const targetVotes = [8, 7, 6];

  return (
    <div>
      {targetVotes.map((vote) => (
        <MovieListVote key={vote} targetVote={vote} />
      ))}
    </div>
  );
}

export default MovieListVoteContainer;