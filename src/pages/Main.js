import React from 'react';
import Video from '../components/Video';
import MovieTopNumber from '../components/MovieTopNumber';
import MoviePick from '../components/MoviePick';
import Vote_average from "../components/Vote_average";
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../feature/user/userSlice';
function Main(props) {
  const logInStatus = useSelector(selectLoginUser);
  return (
    <div>
      <Video />
      <MovieTopNumber />
      {logInStatus && <MoviePick/>}
      <Vote_average />
    </div>
  );
}

export default Main;