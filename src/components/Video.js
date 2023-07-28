import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Youtube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { selectMovie } from '../feature/movie/movieSlice';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// 버튼 눌러 슬라이드 정지 
const VideoCover = styled.div`
  position: relative;

  button{ //사용 시 스타일
    position: absolute;
    top: 96%;
    left: 46%;  
  }
`;

const StyledVideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledSwiper = styled(Swiper)`
  height: 700px;
`;

let opts;
function Video(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  opts = {
    width: '100%',
    height: '650',
    playerVars: {       
      autoplay: true, //자동 재생
      loop: true,
      origin: 'http://localhost:3000'
    },
  };

  // 최근 상영작 5편
  const [trailerIds, setTrailerIds] = useState([]);

  useEffect(() => {
    const api_key = '43af09871fd391abc84a35b271386b01';
    const fetchLatestMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
          params: {
            api_key,
            language: 'ko-KR',
            page: 1,
            region: 'KR'
          }
        });
        const movies = response.data.results;
        const latestMovies = movies.slice(0,5);
        const trailerIds = await Promise.all(latestMovies.map(async movie => {
          const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
            params: {
              api_key,
              language: 'ko-KR'
            }
          });
          const videos = videosResponse.data.results;
          const trailer = videos.find(viedo => viedo.type === 'Trailer');
          if (trailer) {
            return {
              videoId: trailer.key,
              movieId: movie.id
            };
          }
        }));
        setTrailerIds(trailerIds);
      }catch (error) {
      console.error(error);
      } 
    };
    fetchLatestMovies();
  },[]);

  const hanldeTrailerClick = (movieId) => {
    dispatch(selectMovie(movieId));
    navigate(`/movie-detail/${movieId}`);
  };

  return (
    <VideoCover>
      {/* {slidebutton ? <button onClick={playbutton}>start</button> : <button onClick={playbutton}>stop</button>} */}
      {/* 버튼 누르면 autoplay  null아니면 숫자 */}
      {/* <button type='button' onClick={playbutton}>start</button>
      <button type='button' onClick={playbutton}>stop</button> */}
      <StyledSwiper
        // onSwiper={setSwiperRef}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={true}
        autoplay={{
          // disableOnInteraction: false, //X 스와이프 후 자동재생이 비활성화 되지 않음
          delay: 5000,
          // pauseOnMouseEnter: true, //X
        }}
        // effect={'creative'}
        // creativeEffect={{
        //   prev: {
        //     translate: ['-50%', 0, -100],
        //   },
        //   next: {
        //     translate: ['-100%', 0, 0]
        //   }
        // }}
        slidesPerView={1} 
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        >
        {trailerIds.map((trailer) => {
        // trailer undefined check
        if (trailer && trailer.videoId && trailer.movieId) {
          const { videoId, movieId } = trailer;
          return (
            <SwiperSlide key={videoId} onClick={() => hanldeTrailerClick(movieId)}>
              <Youtube videoId={videoId} opts={opts} />
              <StyledVideoWrapper />
            </SwiperSlide>
          );
        } else {
          return null;
        }
      })}
      </StyledSwiper>
    </VideoCover>
    );
}

export default Video;