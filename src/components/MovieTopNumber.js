import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {Navigation, Pagination, Autoplay } from "swiper";
import styled from "styled-components";
import MovieTopItem from "./MovieTopItem";
import MovieItem from "../category/MovieItem";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

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
   .swiperSlide {
      padding-bottom: 10px;
   }
`;


function MovieTopNumber(props) {
   const [movies, setMovies] = useState(null);
   console.log('movies', movies);
   const [visibleMovies, setVisibleMovies] = useState(10);

   useEffect(() => {
      const MovieNumber = async () => {
         try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`,
            {
               params: {
                  api_key: '43af09871fd391abc84a35b271386b01',
                  language: 'ko-KR',
                  region: 'KR',    
               },
            }
         );
            setMovies(response.data.results);
         } catch (e) {
            console.error(e);
         }
      };
      MovieNumber();
   }, []);


   return (
      <MovieBlock>
         <div className="title"><span>일별 Top10</span></div>
         <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            navigation
            slidesPerView={5} 
            spaceBetween={50}
            autoplay = {{delay: 5000}} 
         >
            <div className="content">
               {movies && movies
                  // .filter((movie) => movie.vote_count > 0) 
                  .slice(0, visibleMovies)
                  .map((movie) => (
                     <SwiperSlide key={movie.id} className="swiperSlide">
                        <MovieItem  movie={movie} />
                     </SwiperSlide>
               ))}
            </div>
         </Swiper>
      </MovieBlock>
      
   )
} 

export default MovieTopNumber;