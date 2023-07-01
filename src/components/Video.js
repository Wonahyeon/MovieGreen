import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Youtube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { async } from 'q';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectMovie } from '../feature/movie/movieSlice';

const StyledVideoWrapper = styled.div`
  width: 100%;
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
    <StyledVideoWrapper>
      <StyledSwiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        slidesPerView={1} 
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {trailerIds.map(({videoId, movieId}) => (
          <SwiperSlide key={videoId} onClick={() => hanldeTrailerClick(movieId)}>
            <Youtube videoId={videoId} opts={opts}/>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </StyledVideoWrapper>
    );
}

export default Video;