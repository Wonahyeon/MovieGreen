import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation } from "swiper";
import styled from "styled-components";
import { FiMinusCircle } from "react-icons/fi";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, togglePick, userPickMovie } from "../feature/user/userSlice";
import MovieItem from "../category/MovieItem";

const MovieBlock = styled.div`
  width: 90%;
  margin: 0 auto;

  .title{
      font-size: 2rem;
      font-weight: 700;
      padding: 1rem;
      border-bottom: 0.2rem solid ${props => props.theme.main};
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

const RemovePick = styled(FiMinusCircle)`
  color: ${props => props.theme.second};
  position: relative;
  left: 14.5rem;
  bottom: 24.5rem;
`;
function MoviePick(props) {
  const userName = useSelector(selectUserName);
  const userPickMovieList = useSelector(userPickMovie);
  const dispatch = useDispatch();
  
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
          .filter(pick => pick.userName === userName)
            .slice(0, 15)
            .map((movie) => (
              <SwiperSlide key={movie.id}>
                  <MovieItem  movie={movie.movieDetails} />
                  <RemovePick className="cursor-pointer" onClick={() => dispatch(togglePick(movie))}/>
              </SwiperSlide>
        ))}
        </div>
      </Swiper>
    </MovieBlock>
  );
}

export default MoviePick;