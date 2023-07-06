import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, fetchMovieDetails } from '../feature/movie/movieSlice';
import StarRatings from 'react-star-ratings';
import { deletePickMovie, pickMovie, selectUserName, userPickMovie } from '../feature/user/userSlice';
import ReviewPage from "../pages/ReviewPage";
import axios from 'axios';


const DetailWrapper = styled.div`
  width: 80rem;
  margin: 0 auto;
  margin-top: 5rem;
  .detail-top {
    display: flex;
  }
  img {
    width: 15rem;
    height: 22.5rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
  }
  .movie-title {
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Black Han Sans',sans-serif;
    margin: 1rem 0;
  }
  h2, h3 {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  span {
    color: black;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
  h3 {
    display: flex;
    margin-bottom: 1rem;
    font-weight: bold;
    justify-content: space-between;
    width: 35rem;
  }
  span {
    font-weight: 400;
    width: 25rem;
  }
`;

const Pick = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  width: 15rem;
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: pink;
  }
`;

const Tab = styled.div`
  margin-top: 3rem;
  .nav-tab {
    height: 2rem;
    display: flex;
    border-bottom: 1px solid black; 
  }
  .nav-item {
    padding: .5rem;
    :hover {
      border-bottom: 2px solid lightgray;
      font-weight: bold;
    }
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
  const [showTab, setShowTab] = useState('detail'); // 탭 상태
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCredits = useSelector((state) => state.movie.movieCredits);
  const userName = useSelector(selectUserName);
  const moviePickData = useSelector(userPickMovie);
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

  console.log(movieDetails.certifications[0].release_dates[0].certification);

  return (
      <>
      <DetailWrapper>
        <div className='detail-top'>
          <img src={getImageUrl(movieDetails.poster_path)} alt={movieDetails.title} />
            <Content>
              <h1 className='movie-title'>{movieDetails.title}</h1>
              <h2>{movieDetails.original_title}</h2>
              <h3>{movieDetails?.belongs_to_collection?.name}</h3>
              <h3>
                평점{' '}
                <span>
                  <StarRatings
                    rating={movieDetails.vote_average / 2}
                    starRatedColor={ratingColor}
                    starHoverColor={ratingColor}
                    numberOfStars={5}
                    starDimension='1.4rem'
                    starSpacing='.08rem'
                    name={`rating-${movieDetails.title}`}
                    />
                  ({movieDetails.vote_average} / 10)</span>
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
                관람등급{' '}
                <span>
                  {movieDetails.certifications[0].release_dates[0].certificatioㅜ}세
                </span>
              </h3>
            </Content>
            <Pick className='cursor-pointer'>
            {pick ?
            <>
            <MdFavorite onClick={handlePick}/>
            <div>찜한 컨텐츠에 추가되었습니다.</div> 
            </>
            :
            <>
              <MdFavoriteBorder onClick={handlePick}/>
              <div>찜한 컨텐츠에서 삭제되었습니다.</div>
            </>
            }
            
          </Pick>
        </div>
        <Tab>
          <div className='nav-tab cursor-pointer'>
            <div className='nav-item' onClick={() => {
              setShowTab('detail');
            }}>
              주요 정보
            </div>
            <div className='nav-item' onClick={() => {
              setShowTab('credits');
            }}>
              <a>출연/제작</a>
            </div>
            <div className='nav-item' onClick={() => {
              setShowTab('review');
            }}>
              <a>평점</a>
            </div>
          </div>
        </Tab>
        {
          {
            'detail' :
            <div>
            <h3>소개
              <div>
                <span>{
                  movieDetails.overview.length <= 100 || isExpanded
                  ? movieDetails.overview :
                  movieDetails.overview.slice(0, 100) + '...'
                  }</span>
              </div>
              {movieDetails.overview.length > 100 && (
                <span className="cursor-pointer" onClick={handleToggleIntro}>
                  {isExpanded ? '간략히 보기' : '자세히 보기'}
                </span>
              )}
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
                        <div className="cursor-pointer" onClick={handleToggleCast}>
                          {showMoreCast ? '간략히 보기' : '자세히 보기'}
                        </div>
                      )}
                    </CastWrapper>
                </span>
              </h3>
            </div>,
            'review': <ReviewPage/>
          }[showTab]
        }
      </DetailWrapper>
      </>
  );
}

export default MovieDetail;