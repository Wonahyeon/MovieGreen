import React from 'react';
import styled from "styled-components";

const MovieItemBlock = styled.div`
  display: flex;
  background: #ffffff;
  color: #aabb93;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 ;
  padding: 1rem;
  /* border-radius: 5rem; */
  width: 240px;
  height: 360px;
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
`;

function MovieItem({movie}) { 
  const {rank, movieNm, openDt} = movie;
  return (
    <MovieItemBlock>
      <h2>{rank}</h2>
      <div>
        <h3>{movieNm}</h3>
        <p>{openDt}</p>
      </div>
    </MovieItemBlock>
  );
}

export default MovieItem;