import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieItemBlock = styled.div`
   display: flex;
   background: #ffffff;
   color: #aabb93;
   justify-content: space-between;
   align-items: center;
   margin: 1.5rem 0;
   padding: 1rem;
   width: 240px;
   height: 360px;
   cursor: pointer;
   transition: transform 0.3s ease;
   &:hover {
      transform: scale(1.2);
   }

   h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      text-decoration: underline;
   }

   div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      text-align: right;
      padding: 0 1.5rem;
   }

   img {
      width: 100%;
      height: auto;
      margin-left: 35px;
      border-radius: 20px;
   }
`;

function MovieTopItem({movie}) {
   const {movieNm,  poster_path} = movie;
   const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
   const navigate = useNavigate();

   return (
      <MovieItemBlock>
         <img src={posterUrl} alt={movieNm} onClick={() => { navigate(`/movie-detail/${movie.id}`); }}/>
         <h3>{movieNm}</h3>
      </MovieItemBlock>
   )
}

export default MovieTopItem;