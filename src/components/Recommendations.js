import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import MovieItem from "../category/MovieItem";
const RecommendationsWrapper = styled.div`
background: #fff;
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
.see-All , .see-NotAll {
  text-align: center;
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  .all,
  .notALL {
    font-size: 30px;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    background: none;
    color: #000;
    border: 0.1rem solid #000;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background: #000;
      color: #fff;
    }
  }
}

  
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem;
    border-bottom: 0.2rem solid;
    span {
      margin-left: 0.5rem;
      font-size: 1rem;
    }
  }
  
  .recommendation-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 1rem;
    margin: 1rem;
    width: 1280px;
    margin: 0 auto;
  }
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
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
`;

function Recommendations({ movieId }) {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [showSeeLess, setShowSeeLess] = useState(false);

  const handleSeeMore = () => {
    setVisibleMovies(recommendedMovies.length);
    setShowSeeMore(false);
    setShowSeeLess(true);
  };

  const handleSeeLess = () => {
    setVisibleMovies(4);
    setShowSeeMore(true);
    setShowSeeLess(false);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=43af09871fd391abc84a35b271386b01&language=ko-KR`
        );
        setRecommendedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return (
    <RecommendationsWrapper>
      <h3>추천 영화</h3>
      <div className="recommendation-list">
        {recommendedMovies
          .filter((movie) => movie.vote_count > 0 && movie.backdrop_path !== null)
          .slice(0, visibleMovies)
          .map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
      </div>
      <ButtonWrapper>
        {showSeeMore && (
          <button onClick={handleSeeMore} className="more">
            ↓
          </button>
        )}
        {showSeeLess && (
          <button onClick={handleSeeLess} className="less">
            ✕
          </button>
        )}
      </ButtonWrapper>
    </RecommendationsWrapper>
  );
}

export default Recommendations;