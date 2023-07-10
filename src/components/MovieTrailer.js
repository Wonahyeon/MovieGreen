import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Trailer = styled.div`
  display: flex;
  align-items: center;
  a {
    padding: 0.5rem 1rem;
    color: ${props => props.theme.main};
    border: 0.2rem solid ${props => props.theme.main};
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;

   :hover {
      background: ${props => props.theme.main};
      color: #fff;
    }
  }
`
function MovieTrailer({ movieId }) {
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=43af09871fd391abc84a35b271386b01`
        );

        const trailers = response.data.results.filter(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );

        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error('Error fetching movie trailer:', error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;

  return (
    <Trailer>
      {trailerKey ? (
        <a href={trailerUrl} target="_blank" rel="noopener noreferrer" >
          트레일러 보러가기
        </a>
      ) : (
        <p>트레일러가 존재하지않음</p>
      )}
    </Trailer>
  );
}

export default MovieTrailer;