import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


const MovieBlock = styled.div`
   background: #aabb93;
   color: #ffffff;
   width: 100%;
   height: 500px;
   margin: 0 auto;


   .content {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      box-sizing: border-box;
      margin: 0 auto;

   }
`;

function MovieTopNumber(props) {
   const [movies, setMovies] = useState(null);

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
            
         } catch (e) {
            console.error(e);
         }
      };
      MovieNumber();
   }, []);
   

   return (
      <MovieBlock>
         <div className="content">


         </div>
      </MovieBlock>
      
   )
} 

export default MovieTopNumber;