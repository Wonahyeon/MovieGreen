import React from 'react';
import Video from '../components/Video';
import MovieTopNumber from '../components/MovieTopNumber';
import MoviePick from '../components/MoviePick';

function Main(props) {
  return (
    <div>
      <Video />
      <MovieTopNumber />
      <MoviePick/>
    </div>
  );
}

export default Main;