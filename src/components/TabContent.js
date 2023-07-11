import React, { useState } from 'react';
import styled from "styled-components";
import CastItem from './CastItem';
import ReviewPage from '../pages/ReviewPage';
import errorImg from '../images/error-img.png';


const TabContentWrapper = styled.div`
  margin-top: 3rem;
  .nav-tab {
  width: 60rem;
  height: 3rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-bottom: .2rem solid ${props => props.theme.main};
  }
  .nav-item {
    width: 10rem;
    height: 3rem;
    padding: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-item:hover, .active {
    font-weight: bold;
    color: white;
    border-radius: .5rem .5rem 0 0;
    background-color: ${props => props.theme.main};
  }
`;
const DetailInfoTab = styled.div`
  margin: 0 auto;
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .cast-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60rem;
    margin: 2rem auto;
    padding: 1rem;
    border-bottom: .2rem solid ${props => props.theme.main};
    span {
      font-weight: initial;
      &:hover {
        border-bottom: 1px solid black;

      }
    }  
  }
  .movie-intro {
    display: flex;
    flex-direction: column;
    width: 60rem;
    margin: 0 auto;
    padding: 1rem;
    span:hover{
      width: fit-content;
      border-bottom: 1px solid black;
    }
  }
  .cast-item {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1.5rem 0;
    width: 200px;
    height: 300px;
  }
  .profile-img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }
  .intro {
    margin: 1rem 0;
    width: 55rem;
    line-height: 3rem;
  }
  .movie-cast {
    display: flex;
    justify-content: center;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
  }
`;

const CreditTab = styled.div`
  margin: 0 auto;
  width: 60rem;
  img {
    width: 10rem;
    height: 15rem;
    border-radius: 1rem;
  }
  .cast-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  .cast-title {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 1rem;
    border-bottom: .2rem solid ${props => props.theme.main};
    margin: 2rem 0;
  }

  ul {
    padding: 1rem;
    margin-bottom: 3rem;
  }
  li {
    margin-bottom: 1rem;
  }
`;

function TabContent(props) {
  const {movieDetails, movieCredits, onError, imgError, setImgError} = props;
  const [showTab, setShowTab] = useState('detail'); // 탭 상태
  const [isExpanded, setIsExpanded] = useState(false);

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

  // 이미지 없는 경우 대체이미지
  const handleImgError = (e) => {
    e.target.src = errorImg;
  };

  // 주요 정보 탭 출연진 리스트 셋업(감독, 주연 3명)
  const mainCast = [movieCredits.crew[2], ...movieCredits.cast?.slice(0,4)];
  
  return (
    <TabContentWrapper>
        <div className='nav-tab cursor-pointer'>
          <div className={showTab === 'detail' ? 'nav-item active' : 'nav-item'} onClick={() => {
            setShowTab('detail');
          }}>
            주요 정보
          </div>
          <div className={showTab === 'credit' ? 'nav-item active' : 'nav-item'} onClick={() => {
            setShowTab('credit');
          }}>
            <a>출연/제작</a>
          </div>
          <div className={showTab === 'review' ? 'nav-item active' : 'nav-item'} onClick={() => {
            setShowTab('review');
          }}>
            <a>리뷰</a>
          </div>
        </div>
      {
        { // 주요 정보 탭 내용
          'detail' :
          <DetailInfoTab>
            <div className='movie-intro'>
              <h2>{movieDetails?.tagline}</h2>
              <div className='intro'>
                {movieDetails?.overview.length <= 100 || isExpanded
                ? movieDetails?.overview :
                movieDetails?.overview.slice(0, 100) + '...'}
              </div>
              {movieDetails?.overview.length > 100 && (
                <span className="cursor-pointer" onClick={handleToggleIntro}>
                  {isExpanded ? '간략히' : '더보기'}
                </span>
              )}
            </div>
            <div className='cast-title'>
              <h2>출연진</h2>
              <span className='cursor-pointer' onClick={() => { setShowTab('credit'); }}>더보기</span>
            </div>
            <div className='movie-cast'>
              {mainCast.map((cast) => (
                <div key={cast.id} className='cursor-pointer cast-item '>
                  <img src={getImageUrl(cast.profile_path)} alt={cast.name} className='profile-img' onError={handleImgError}/>
                  <h3 className='profile-name'>{cast?.name}</h3>
                </div>
              ))}
            </div>
          </DetailInfoTab>,

          // 출연/제작 탭 내용
          'credit' :
          <CreditTab>
            <h2 className='cast-title'>감독</h2>
            <div className='cast-wrapper cursor-pointer'>
              <img src={getImageUrl(movieCredits.crew[2]?.profile_path)} alt={movieCredits.crew[2]?.name} style={{marginRight: '2rem'}} onError={handleImgError}/>
              <h3>{movieCredits.crew[2]?.name}</h3>
            </div>
            <h2 className='cast-title'>주연</h2>
            <div className='cast-wrapper cursor-pointer'>
              {movieCredits.cast?.slice(0,2).map((cast) => (
                <CastItem key={cast.id} cast={cast} onError={handleImgError}/>
              ))}
            </div>
            <h2 className='cast-title'>출연</h2>
            <div className='cast-wrapper cursor-pointer'>
              {movieCredits.cast?.slice(2 ,12).map((cast) => (
                <CastItem key={cast.id} cast={cast} onError={handleImgError}/>
              ))}
            </div>
            <h2 className='cast-title'>제작사</h2>
            <ul>
              {movieDetails?.production_companies.map((pc) =>
                <li key={pc.id}>{pc.name}</li>
              )}
            </ul>
            
          </CreditTab>
          ,
          // 평점 탭 내용
          'review': <ReviewPage/>
        }[showTab]
      }
    </TabContentWrapper>
  );
}

export default TabContent;