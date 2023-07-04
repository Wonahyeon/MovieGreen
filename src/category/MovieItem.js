import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  flex-direction: column;
  border-radius: 10px;
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
    margin-bottom: 1rem;
    border-radius: 20px;
  }

  .poster {
    width: 200px;
    height: 300px;
    background-color: #ccc;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 21px;
    text-align: center;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: ${props => (props.showInfo ? 'none' : 'block')};
  }

  .additional-info {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%; 
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: none;
}

  &:hover .additional-info {
    display: block;
    background: rgba(0.5, 0.5, 0.5, 0.5);
    color: #fff;
    transition: transform 0.3s ease;
  }
`;

function MovieItem({ movie }) {
  const { title, rank, movieNm, poster_path, id } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=43af09871fd391abc84a35b271386b01&language=ko-KR`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <MovieItemBlock showInfo={showInfo} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={posterUrl} alt={movieNm} onClick={() => navigate(`/movie-detail/${movie.id}`)} />
      <h2>{rank}</h2>
      <div>
        {showInfo && movieDetails && (
          <div className="additional-info" onClick={() => navigate(`/movie-detail/${movie.id}`)}>
            {movieDetails.release_date && <p>개봉: {movieDetails.release_date}</p>}
            {movieDetails.genres && (
              <p>장르: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
            )}
            <br />
            {movieDetails.vote_average && <p>평점: {movieDetails.vote_average}</p>}
            <br />
            {movieDetails.credits &&
              movieDetails.credits.crew &&
              movieDetails.credits.crew.length > 0 && (
                <p>감독: {movieDetails.credits.crew.find((person) => person.job === 'Director')?.name}</p>
              )}
            <br />
            {movieDetails.credits &&
              movieDetails.credits.cast &&
              movieDetails.credits.cast.length > 0 && (
                <p>Cast: {movieDetails.credits.cast.slice(0, 5).map((person) => person.name).join(', ')}</p>
              )}
          </div>
        )}
        <div className="title" onClick={() => navigate(`/movie-detail/${movie.id}`)}>{title}</div>
      </div>
    </MovieItemBlock>
  );
}

export default MovieItem;