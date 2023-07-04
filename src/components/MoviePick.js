import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Autoplay } from "swiper";
import styled from "styled-components";
import MovieTopItem from "./MovieTopItem";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { useSelector } from "react-redux";
import { selectUserName, userPickMovie } from "../feature/user/userSlice";

const MovieBlock = styled.div`
  background: #ffffff;
  color: #000;
  width: 100%;
  margin: 0 auto;

  .title{
      font-size: 2rem;
      font-weight: 700;
      padding: 1rem;
      border-bottom: 0.2rem solid;
      span{
        margin-left: 0.5rem;
      }
  }
  .content {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      box-sizing: border-box;
      margin: 1rem;
      margin: 0 auto;
  }
  .icon{
      cursor: pointer;
      font-size: 2rem;
      margin-top: 7%;
  }
`;
function MoviePick(props) {
  const userName = useSelector(selectUserName);
  const userPickMovieList = useSelector(userPickMovie);
  return (
    <MovieBlock>
      <div className="title"><span>{userName}님이 찜한 콘텐츠</span></div>
        <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={5} 
            spaceBetween={50}
        >
      <div className="content">
        {userPickMovieList && userPickMovieList
            .slice(0, 15)
            .map((movie) => (
              <SwiperSlide key={movie.id}>
                  <MovieTopItem  movie={movie} />
              </SwiperSlide>
        ))}
        </div>
      </Swiper>
    </MovieBlock>
  );
}

export default MoviePick;