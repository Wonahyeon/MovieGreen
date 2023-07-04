import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Youtube from "react-youtube";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { async } from 'q';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectMovie } from '../feature/movie/movieSlice';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// 유튜브가 부모 유튜브area, cover 자식 
// 버튼 만들어서 누르면 슬라이드 정지
//json-server --watch membership-db.json --port 4000
const VideoCover = styled.div`
  position: relative;
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
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const movieCredits = useSelector((state) => state.movie.movieCredits);

  const swiper = useSwiper();


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
      <StyledVideoWrapper />
        <StyledSwiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          slidesPerView={1} 
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          >
          {trailerIds.map(({videoId, movieId}) => (
            <SwiperSlide key={videoId} onClick={() => hanldeTrailerClick(movieId)}>
              {/* youtube 자식 */}
              <Youtube videoId={videoId} opts={opts}/>
              {/* <button>버튼</button> */}
            </SwiperSlide>
          ))}
        </StyledSwiper>
    </VideoCover>
    );
}

export default Video;