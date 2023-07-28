import React from 'react';
import Video from '../components/Video';
import MovieTopNumber from '../components/MovieTopNumber';
import MoviePick from '../components/MoviePick';
import MovieListVote from "../components/MovieListVote";
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../feature/user/userSlice';

function Main(props) {
  const logInStatus = useSelector(selectLoginUser);
  return (
    <div>
      <Video />
      <MovieTopNumber />
      {logInStatus && <MoviePick/>}
      <MovieListVote />
    </div>
  );
}

export default Main;