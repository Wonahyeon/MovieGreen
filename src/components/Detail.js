import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, fetchMovieDetails } from '../feature/movie/movieSlice';
import MovieSearch from './MovieSearch';


const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  width: 60rem;
  img {
    border-radius: 0.5rem;
  }
  .content {
    display: flex;
    justify-content: space-around;
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  .toggle-button {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  h3 {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  span {
    font-weight: 400;
  }
`;

const Pick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10rem;
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: pink;
    cursor: pointer;
  }
`;

const CastWrapper = styled.div`
  .cast-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

function Detail(props) {
  const [pick, setPick] = useState(false);
  const [showMoreCast, setShowMoreCast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie) || {};
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCredits = useSelector((state) => state.movie.movieCredits);
  const { movieId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieCredits(movieId));
  }, [dispatch, movieId]);

  const handlePick = () => {
    setPick(!pick);
  };

  const handleToggleCast = () => {
    setShowMoreCast(!showMoreCast);
  };

  const handleToggleIntro = () => {
    setIsExpanded(!isExpanded);
  };

  // 이미지 경로를 절대 경로로 변환하는 함수
  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const renderIntroText = () => {
    if (selectedMovie.overview.length <= 100 || isExpanded) {
      return selectedMovie.overview;
    }
    return selectedMovie.overview.slice(0, 100) + '...';
  };
  

  return (
      <>
      <DetailWrapper>
        <img src={getImageUrl(selectedMovie.backdrop_path)} alt={selectedMovie.title} />
        <div className='content'>
          <Content>
            <h1>{selectedMovie.title}</h1>
            <h3>
              장르{' '}
              <span>
                {movieDetails && movieDetails.genres.map((genre) => genre.name).join(', ')}
              </span>
            </h3>
            <h3>
              국가{' '}
              <span>
                {movieDetails &&
                  movieDetails.production_countries
                    .map((country) => country.name)
                    .join(', ')}
              </span>
            </h3>
            <h3>감독 <span>{movieCredits && movieCredits.crew[2].name}</span></h3>
            <h3>출연
              <span>
                {movieCredits && (
                  <CastWrapper>
                    <div className="cast-list">
                      {movieCredits.cast.slice(0, showMoreCast ? movieCredits.cast.length : 3).map((cast) => (
                        <div key={cast.id} className="cast-item">
                          {cast.name},
                        </div>
                      ))}
                    </div>
                    {movieCredits.cast.length > 3 && (
                      <div className="toggle-button" onClick={handleToggleCast}>
                        {showMoreCast ? '간략히 보기' : '자세히 보기'}
                      </div>
                    )}
                  </CastWrapper>
                )}
              </span>
            </h3>
            <h3>소개
              <div>
                <span>{
                  selectedMovie.overview.length <= 100 || isExpanded
                  ? selectedMovie.overview :
                  selectedMovie.overview.slice(0, 100) + '...'
                  }</span>
              </div>
              {selectedMovie.overview.length > 100 && (
                <span className="toggle-button" onClick={handleToggleIntro}>
                  {isExpanded ? '간략히 보기' : '자세히 보기'}
                </span>
              )}
            </h3>
          </Content>
          <Pick>
            {!pick && <MdFavoriteBorder onClick={handlePick}/>}
            {pick && <MdFavorite onClick={handlePick}/>}
            <p>찜하기</p>
          </Pick>
        </div>
      </DetailWrapper>
      </>
  );
}

export default Detail;