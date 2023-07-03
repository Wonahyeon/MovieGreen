import React from 'react';
import MovieDetail from '../components/MovieDetail';
import MovieReview from '../components/MovieReview';

function DetailPage(props) {
  return (
    <>
      <MovieDetail/>
      <MovieReview/>
    </>
  );
}

export default DetailPage;