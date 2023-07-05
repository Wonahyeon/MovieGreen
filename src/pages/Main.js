import React from 'react';
import Video from '../components/Video';
import MovieTopNumber from '../components/MovieTopNumber';
import MoviePick from '../components/MoviePick';
import Vote_average from "../components/Vote_average";
function Main(props) {
  return (
    <div>
      <Video />
      <MovieTopNumber />
      <MoviePick/>
      <Vote_average />
    </div>
  );
}

export default Main;