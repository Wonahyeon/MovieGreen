import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import MovieItem from "../category/MovieItem";
const RecommendationsWrapper = styled.div`
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
    width: 60rem;
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem;
    border-bottom: 0.2rem solid ${props => props.theme.main};
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
    width: fit-content;
    margin: 0 auto;
  }
  .see-All,
  .see-NotAll {
    text-align: center;
    margin-top: 2rem;
  }

  .see-All button,
  .see-NotAll button {
    padding: 0.5rem 1rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin: 0 auto;
  width: fit-content;

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
      background: ${props => props.theme.main};
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
        <div className="see-All">
          <button onClick={handleSeeMore}>더보기</button>
        </div>
      )}

      {showSeeLess && (
        <div className="see-NotAll">
          <button onClick={handleSeeLess}>접기</button>
        </div>
      )}
      </ButtonWrapper>
    </RecommendationsWrapper>
  );
}

export default Recommendations;