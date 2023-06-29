import React from 'react';

function CustomMovieItem({ movie }) {
  return (
    <div>
      <h3>{movie.title}</h3>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <p>No poster available</p>
      )}
      <p>{movie.overview}</p>
    </div>
  );
}

export default CustomMovieItem; 
