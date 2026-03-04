import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Lottie from "lottie-react";
import loadingLottie from "../lottie/animation_lk2i29a8.json";
import errorLottie from "../lottie/animation_lk2j1580.json";
import { fetchMovieCredits, fetchMovieDetails } from '../feature/movie/movieSlice';
import StarRatings from 'react-star-ratings';
import { selectUserName, togglePick, userPickMovie } from '../feature/user/userSlice';
import MovieTrailer from './MovieTrailer';
import Recommendations from './Recommendations';
import TabContent from './TabContent';
import OTTLinks from './OttLinks';
import PickNotificationModal from '../modal/PickNotificationModal';
import errorImg from '../images/error-img.png';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 0 1rem;

  img {
    border-radius: 1.25rem;
    margin-right: 2rem;
  }

  .detail-top {
    display: flex;
    width: 100%;
    gap: 2rem;
  }

  .movie-poster {
    height: 20rem;
    width: auto;
    flex-shrink: 0;
    border-radius: 1.25rem;
  }

  .movie-title {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .title-name {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .certification-img {
      background-size: contain;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }
  }

  .origin-title, .series-name {
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .series-name {
    color: gray;
    margin-bottom: 2rem;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .bounce-animation {
    animation: bounce 0.5s;
  }

  /* 태블릿 (≤1024px) */
  @media (max-width: 1024px) {
    margin-top: 2rem;
    padding: 0 1.5rem;

    .detail-top {
      flex-direction: column;
      align-items: center;
    }

    img {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }

    .movie-poster {
      height: 18rem;
    }

    .movie-title {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .title-name {
        font-size: 1.8rem;
      }
    }

    .origin-title, .series-name {
      text-align: center;
    }
  }

  /* 모바일 (≤768px) */
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 0 1rem;

    .detail-top {
      gap: 1.5rem;
    }

    .movie-poster {
      height: 15rem;
    }

    .movie-title .title-name {
      font-size: 1.5rem;
    }

    .origin-title, .series-name {
      font-size: 0.9rem;
    }
  }

  /* 초소형 모바일 (≤480px) */
  @media (max-width: 480px) {
    margin-top: 1rem;
    padding: 0 0.75rem;

    .detail-top {
      gap: 1rem;
    }

    .movie-poster {
      height: 12rem;
    }

    .movie-title {
      gap: 0.5rem;

      .title-name {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      .certification-img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .origin-title, .series-name {
      font-size: 0.8rem;
      margin-bottom: 0.8rem;
    }

    .series-name {
      margin-bottom: 1.5rem;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  h3 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  span {
    font-weight: initial;
    flex: 1;
    min-width: 200px;
  }

  /* 태블릿 */
  @media (max-width: 1024px) {
    h3 {
      flex-direction: column;
    }

    span {
      margin-top: 0.5rem;
    }
  }

  /* 모바일 */
  @media (max-width: 768px) {
    h3 {
      font-size: 0.95rem;
    }

    span {
      font-size: 0.9rem;
    }
  }

  /* 초소형 모바일 */
  @media (max-width: 480px) {
    h3 {
      font-size: 0.85rem;
    }

    span {
      font-size: 0.8rem;
    }
  }
`;

const LoginTooltip = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: #333;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  z-index: 100;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @media (max-width: 768px) {
    bottom: 70px;
    font-size: 0.75rem;
    padding: 0.6rem 0.8rem;
  }

  @media (max-width: 480px) {
    bottom: 60px;
    font-size: 0.7rem;
    padding: 0.5rem 0.7rem;
  }
`;

const Pick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  position: relative;

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.pick};
    cursor: pointer;
    transition: transform 0.2s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  svg:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    width: 2.5rem;

    svg {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }

    &.login-required:hover::after {
      font-size: 10px;
      padding: 6px 10px;
      bottom: -35px;
    }
  }

  @media (max-width: 480px) {
    width: 2rem;

    svg {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    &.login-required:hover::after {
      font-size: 9px;
      padding: 5px 8px;
      bottom: -30px;
    }
  }
`;

function MovieDetail(props) {
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPickNotification, setShowPickNotification] = useState(false);
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCredits = useSelector((state) => state.movie.movieCredits);
  const userName = useSelector(selectUserName);
  const userPick = useSelector(userPickMovie);
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const ratingColor = '#F2A341';

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieCredits(movieId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
  }, [dispatch, movieId]);

  // ✅ 찜하기 성공 알림 자동 닫기
  useEffect(() => {
    if (showPickNotification) {
      const timer = setTimeout(() => {
        setShowPickNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPickNotification]);

  const handlePick = () => {
    if (!userName) {
      return;
    }

    const pickData = {
      id: movieId,
      userName,
      movieDetails
    };
    dispatch(togglePick(pickData));
    setShowPickNotification(true);
  };

  const handleClosePickNotification = () => {
    setShowPickNotification(false);
  };

  const getParticle = (text) => {
    const lastChar = text.charCodeAt(text.length - 1);
    const unicode = (lastChar - 0xAC00) % 28;
    return unicode === 0 ? '가' : '이';
  };

  const pick = userPick.filter(pick => pick.userName === userName).find(pick => pick.id === movieId);
  
  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const handleImgError = (e) => {
    e.target.src = errorImg;
  };

  const certification = movieDetails?.certifications[0]?.release_dates[0]?.certification || movieDetails?.certifications[0]?.release_dates[1]?.certification;
  let certificationImg;

  switch (certification) {
    case 'All':
      certificationImg = 'https://i.namu.wiki/i/MyvTzUe8CU4Utl-aB4wt1S2OfdUcKhZuy42T3yDECI8bzGP9XrnwUljYAAwZ7NUuo0upLrtXboukNY7GtX7cM32gmFvtMbBIgCqOH8sysOWYYvADwv61hN5nNxw3CuyuGAIKheM_Zz8sXcLNnSuFng.svg';
      break;
    case '18':
      certificationImg = 'https://i.namu.wiki/i/zZwPEFHiuRY-OkmxWRKy_o2cneH-BU69Fazp8Ur-QWA_bUBlNsKHJpR3q3HL7eQv4TucOMGGDri7R5sM_EDihwHSFGl8YNmZDE4ys1o5K4kate_6q-5wQPuHgh3ByNr234vTSIFGbnGYY6Zz5bq5dg.svg';
      break;
    case '15':
    case '15세 이상 관람가':
      certificationImg = 'https://i.namu.wiki/i/bkeDe_FYXnkoS1UT9WJOr3U1yV9GOarGnh-hF5u6zqF5DwMH8fIrbf7z8i8ijpAhxdTLXTB_OfJrbbECNLsbUD4W7X0TlqdhUlCbXwvLb-Ki2YjMZGYLdKZssX5S4FsMwVi1D9o4PajIIi4E461gKg.svg';
      break;
    case '12':
      certificationImg = 'https://i.namu.wiki/i/SM8udWHcYzJ3O92qcIm_NtYveGa4JULu_1qyqtREQf4b684c_aThkbLH2FPM6Wq0DowKNGzo80rGI-vva2vF8e93lzAjvuutkvxsAqrv0G12eEji0txnwcKB9mUwB384dv9mNdh2jOf6UG8-PqwRUw.svg';
      break;
    case '':
      certificationImg = '';
      break;
    default:
      break;
  }
  
  if (loading) {
    return (
      <DetailWrapper>
        <Lottie animationData={loadingLottie} />
      </DetailWrapper>
    );
  }

  if (!movieDetails || !movieCredits) {
    return (
      <DetailWrapper>
        <Lottie animationData={errorLottie} />
      </DetailWrapper>
    );
  }

  return (
    <>
    <DetailWrapper>
      <div className='detail-top'>
        <img 
          className='movie-poster' 
          src={getImageUrl(movieDetails?.poster_path)} 
          alt={movieDetails.title}
          onError={handleImgError}
        />
        <Content>
          <div className='movie-title'>
            <h1 className='title-name'>{movieDetails.title}</h1>
            <div 
              className='certification-img'
              style={{backgroundImage: `url(${certificationImg})`}}
            />
          </div>
          <h2 className='origin-title'>{movieDetails?.original_title}</h2>
          <h2 className='series-name'>{movieDetails?.belongs_to_collection?.name}</h2>
          <h3>
            평점{' '}
            <span>
              <StarRatings
                rating={movieDetails?.vote_average / 2}
                starRatedColor={ratingColor}
                starHoverColor={ratingColor}
                numberOfStars={5}
                starDimension='1.4rem'
                starSpacing='.08rem'
                name={`rating-${movieDetails.title}`}
              />
              ({movieDetails.vote_average} / 10)
            </span>
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
              {movieDetails?.production_countries
                .map((country) => country.name)
                .join(', ')}
            </span>
          </h3>
          <h3>
            개봉{' '}
            <span>
              {movieDetails?.release_date}
            </span>
          </h3>
          <h3>
            러닝타임{' '}
            <span>
              {movieDetails?.runtime}분
            </span>
          </h3>
          <MovieTrailer movieId={movieId} />
          <OTTLinks movie={movieDetails} />
        </Content>

        {/* 찜 버튼 */}
        <Pick 
          className={`cursor-pointer ${!userName ? 'login-required' : ''}`}
          onMouseEnter={() => !userName && setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {pick ? (
            <MdFavorite onClick={handlePick} className={pick ? "bounce-animation" : ""} />
          ) : (
            <MdFavoriteBorder onClick={handlePick} />
          )}
          
          {/* 로그인 필요 알림 */}
          {isHovering && !userName && (
            <LoginTooltip>로그인이 필요합니다</LoginTooltip>
          )}
        </Pick>

        {/* 찜하기 성공 알림 */}
        {showPickNotification && (
          <PickNotificationModal onClose={handleClosePickNotification}>
            찜한 콘텐츠에 {movieDetails.title}{getParticle(movieDetails.title)} {!pick ? '삭제' : '추가'}되었습니다!
          </PickNotificationModal>
        )}
      </div>
    </DetailWrapper>
    <TabContent 
      movieDetails={movieDetails} 
      movieCredits={movieCredits}
      onError={handleImgError}
      imgError={imgError}
      setImgError={setImgError}
    />
    {/* <Recommendations movieId={movieId} /> */}
    </>
  );
}

export default MovieDetail;