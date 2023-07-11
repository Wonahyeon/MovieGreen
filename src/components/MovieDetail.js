import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, fetchMovieDetails } from '../feature/movie/movieSlice';
import StarRatings from 'react-star-ratings';
import { selectUserName, togglePick, userPickMovie } from '../feature/user/userSlice';
import MovieTrailer from './MovieTrailer';
import Recommendations from './Recommendations';
import TabContent from './TabContent';
import OTTLinks from './OttLinks';
import PickNotificationModal from '../modal/PickNotificationModal';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  margin-top: 3rem;
  img {
    border-radius: 1.25rem;
    margin-right: 2rem;
  }
  .detail-top {
    display: flex;
    width: 60rem;
  }
  .movie-poster {
    height: 20rem;
    flex-shrink: 0;
  }
  .movie-title {
    display: flex;
    .title-name {
      font-size: 2rem;
      font-weight: bold;
      /* font-family: 'Black Han Sans',sans-serif; */
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
    .certification-img {
      background-size: contain;
      width: 2rem;
      height: 2rem;
    }
  }
  .origin-title, .series-name {
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 35rem;
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

`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    width: 35rem;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  span {
    font-weight: initial;
    width: 20rem;
  }
`;

const Pick = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.pick};
  }
`;

function MovieDetail(props) {
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [showPickNotification, setShowPickNotification] = useState(false); // 찜하기 알림
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

  const handlePick = () => {
    if (userName) {
      // pick data
      const pickData = {
        id: movieId,
        userName,
        movieDetails
      };
      dispatch(togglePick(pickData));
      setShowPickNotification(true); // 찜하기 알림 메시지 표시
    }
  };

  const handleClosePickNotification = () => {
    setShowPickNotification(false); // 찜하기 알림 메시지 감추기
  };

  // pick data에서 사용자로 필터, 영화 아이디로 필터하여 pick status
  const pick = userPick.filter(pick => pick.userName === userName).find(pick => pick.id === movieId);

  // 이미지 경로를 절대 경로로 변환하는 함수
  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  // 에러 이미지 다루는 함수
  const handleImgError = () => {
    setImgError(true);
  };

  // 관람 등급
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
          <img className='movie-poster' src={getImageUrl(movieDetails?.poster_path)} alt={movieDetails.title} />
          <Content>
            <div className='movie-title'>
              <h1 className='title-name'>{movieDetails.title}</h1>
              <div className='certification-img' onError={handleImgError}
                style={{ display: imgError ? 'block' : 'block', backgroundImage: `url(${certificationImg})` }}>
              </div>
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
          <Pick className='cursor-pointer'>
            {userName ? (
              pick ? (
                <MdFavorite
                  onClick={handlePick}
                  className={pick ? "bounce-animation" : ""}
                />

              ) : (
                <MdFavoriteBorder onClick={handlePick} />
              )
            ) : (
              <MdFavoriteBorder disabled />
            )}
          </Pick>
          {showPickNotification && (
            <PickNotificationModal onClose={handleClosePickNotification}>
              찜한 콘텐트에 {movieDetails.title}이 추가되었습니다!
            </PickNotificationModal>
          )}
        </div>
      </DetailWrapper>
      <TabContent movieDetails={movieDetails} movieCredits={movieCredits} onError={handleImgError} imgError={imgError} setImgError={setImgError} />
      <Recommendations movieId={movieId} />
    </>
  );
}

export default MovieDetail;