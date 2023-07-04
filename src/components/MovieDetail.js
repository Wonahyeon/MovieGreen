import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, fetchMovieDetails } from '../feature/movie/movieSlice';
import StarRatings from 'react-star-ratings';


const DetailWrapper = styled.div`
  width: 50rem;
  height: 37.5rem;
  margin: 0 auto;
  .detail-top {
    display: flex;
    justify-content: space-between;
  }
  img {
    width: 15rem;
    height: 22.5rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
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
  span {
    color: black;
  }
  .toggle-button {
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 15rem;
  height: 23.375rem;
  display: flex;
  flex-direction: column;
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
  justify-content: center;
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

function MovieDetail(props) {
  const [pick, setPick] = useState(false);
  const [showMoreCast, setShowMoreCast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCredits = useSelector((state) => state.movie.movieCredits);
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const ratingColor = '#C8E4A7';


  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieCredits(movieId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
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
  
  if (loading) {
    return <div>Loading...</div>; // 로딩 컴포넌트
  }

  if (!movieDetails || !movieCredits) {
    return <div>데이터를 가져오지 못했습니다.</div> // 데이터 못가져오면
  }

  return (
      <>
      <DetailWrapper>
        <div className='detail-top'>
          <img src={getImageUrl(movieDetails.poster_path)} alt={movieDetails.title} />
            <Content>
              <h1>{movieDetails.title}</h1>
              <h2>{movieDetails.original_title}</h2>
              <h3>{movieDetails?.belongs_to_collection?.name}</h3>
              <h3>
                평점{' '}
                  <StarRatings
                    rating={movieDetails.vote_average / 2}
                    starRatedColor={ratingColor}
                    starHoverColor={ratingColor}
                    numberOfStars={5}
                    starDimension='1.4rem'
                    starSpacing='.08rem'
                    name={`rating-${movieDetails.title}`}
                    />
                  <span>({movieDetails.vote_average} / 10)</span>
              </h3>
              <h3>
                장르{' '}
                <span>
                  {movieDetails.genres.map((genre) => genre.name).join('/')}
                </span>
              </h3>
              <h3>
                국가{' '}
                <span>
                  {movieDetails.production_countries
                      .map((country) => country.name)
                      .join(', ')}
                </span>
              </h3>
              <h3>
                개봉{' '}
                <span>
                  {movieDetails.release_date}
                </span>
              </h3>
              <h3>
                러닝타임{' '}
                <span>
                  {movieDetails.runtime}분
                </span>
              </h3>
              <h3>
                누적관객{' '}
                <span>
                  {movieDetails.runtime}분
                </span>
              </h3>
            </Content>
            <Pick>
            {pick ?
            <MdFavorite onClick={handlePick}/> :
            <MdFavoriteBorder onClick={handlePick}/>
            }
          </Pick>
        </div>
        <h3>감독 <span>{movieCredits.crew[2].name}</span></h3>
        <h3>출연
          <span>
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
          </span>
        </h3>
        <h3>소개
          <div>
            <span>{
              movieDetails.overview.length <= 100 || isExpanded
              ? movieDetails.overview :
              movieDetails.overview.slice(0, 100) + '...'
              }</span>
          </div>
          {movieDetails.overview.length > 100 && (
            <span className="toggle-button" onClick={handleToggleIntro}>
              {isExpanded ? '간략히 보기' : '자세히 보기'}
            </span>
          )}
        </h3>
          

      </DetailWrapper>
      </>
  );
}

export default MovieDetail;