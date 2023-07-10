import React from 'react';
import Video from '../components/Video';
import MovieTopNumber from '../components/MovieTopNumber';
import MoviePick from '../components/MoviePick';
import MovieListVote from "../components/MovieListVote";
function Main(props) {
  return (
    <div>
      <Video />
      <MovieTopNumber />
      <MoviePick/>
      <MovieListVote />
    </div>
  );
}

export default Main;