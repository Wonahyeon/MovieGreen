import React from 'react';
import { useNavigate } from 'react-router-dom';

function RandomMovie() {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=43af09871fd391abc84a35b271386b01');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
      navigate(`/movie-detail/${randomMovie.id}`);
    } catch (error) {
      console.error('Error fetching random movie:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>오늘 뭐보지?</button>
    </div>
  );
}

export default RandomMovie;