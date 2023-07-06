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


const DetailWrapper = styled.div`
  width: 60rem;
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
    font-weight: initial;
    width: 25rem;
  }
  .certification-img {
    width: 4rem;
    height: 2rem;
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
const DetailInfoTab = styled.div`
  .movie-intro {
    margin: 1rem;

    h2 {
      font-weight: bold;
    }
    
  }
  .intro {
    margin-bottom: 1rem;
  }
`;

const CreditTab = styled.div`
  .cast-main {
    display: flex;
    justify-content: space-between;
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

  // 관람 등급
  const certification = movieDetails.certifications[0]?.release_dates[0].certification;
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
    default:
      break;
  }
  
  
  console.log();
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
              <h1 className='movie-title'>{movieDetails.title}
              <img className='certification-img' src={certificationImg} alt='certification-img'/>
              </h1>
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
            </Content>
            <Pick className='cursor-pointer'>
            {pick ?
            <MdFavorite onClick={handlePick}/>:
            <MdFavoriteBorder onClick={handlePick}/>
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
          { // 주요 정보 탭 내용
            'detail' :
            <DetailInfoTab>
              <div className='movie-intro'>
                <h2>{movieDetails.tagline}</h2>
                <div className='intro'>
                  {movieDetails.overview.length <= 100 || isExpanded
                  ? movieDetails.overview :
                  movieDetails.overview.slice(0, 100) + '...'}
                </div>
                {movieDetails.overview.length > 100 && (
                  <span className="cursor-pointer" onClick={handleToggleIntro}>
                    {isExpanded ? '간략히' : '더보기'}
                  </span>
                )}
              </div>
            </DetailInfoTab>,
            'credits' :
            <CreditTab>
              <h2>감독</h2>
              <img src={getImageUrl(movieCredits.crew[2].profile_path)} alt={movieCredits.crew[2].name} />
              <h3>{movieCredits.crew[2].name}</h3>
              <h2>주연</h2>
              <div className='cast-main'>
                {movieCredits.cast.slice(0,4).map((cast) => (
                  <div>
                    <img src={getImageUrl(cast.profile_path)} alt={cast.name} />
                    <h3>{cast.name}</h3>
                    <h3>{cast.character}역</h3>
                  </div>
                ))}
              </div>
              <h2>출연</h2>
              <div className='cast-main cast-sub'>
                {movieCredits.cast.slice(4,34).map((cast) => (
                  <div>
                    <img src={getImageUrl(cast.profile_path)} alt={cast.name} />
                    <h3>{cast.name}</h3>
                    <h3>{cast.character}역</h3>
                  </div>
                ))}
              </div>
              <h2>제작진</h2>
              
            </CreditTab>
            ,
            // 평점 탭 내용
            'review': <ReviewPage/>
          }[showTab]
        }
      </DetailWrapper>
      </>
  );
}

export default MovieDetail;