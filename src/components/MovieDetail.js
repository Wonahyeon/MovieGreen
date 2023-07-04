import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, fetchMovieDetails, selectMovie } from '../feature/movie/movieSlice';
import { deletePickMovie, pickMovie, selectUser } from "../feature/user/userSlice";

const DetailWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  margin: 2rem auto;
  width: 60rem;
  img {
    border-radius: 0.5rem;
    width: 15rem;
    height: 22.5rem;
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

function MovieDetail(props) {
  const [pick, setPick] = useState(false);
  const [showMoreCast, setShowMoreCast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCredits = useSelector((state) => state.movie.movieCredits);
  const userName = useSelector(selectUser);
  const { movieId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieCredits(movieId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
  }, [dispatch, movieId]);

  // 하트 클릭 시
  const handlePick = () => {
    setPick(!pick);
    if (!pick) { //  pick true
      dispatch(pickMovie(movieDetails));
    } else { // pick false
      dispatch(deletePickMovie(movieId));
    }
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
        <img src={getImageUrl(movieDetails.poster_path)} alt={movieDetails.title} />
        <div className='content'>
          <Content>
            <h1>{movieDetails.title}</h1>
            <h3>
              장르{' '}
              <span>
                {movieDetails.genres.map((genre) => genre.name).join(', ')}
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
          </Content>
          <Pick>
            {pick?
              <MdFavorite onClick={handlePick}/> :
              <MdFavoriteBorder onClick={handlePick}/>
            }
          </Pick>
        </div>

      </DetailWrapper>
      </>
  );
}

export default MovieDetail;