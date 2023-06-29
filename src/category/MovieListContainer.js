import React, { useState } from 'react';
import MovieListYearContainer from './MovieListYear';
import MovieListGenreContainer from './MovieListGenre';
import MovieListCountryContainer from './MovieListCountry';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background: none;
    color: #000;
    border: 0.1rem solid #000;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    outline: none;

    &.active {
      background: #000;
      color: #fff;
    }
  }
`;

function MovieListContainer() {
  const [activeTab, setActiveTab] = useState('year');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ButtonContainer>
        <button
          className={activeTab === 'year' ? 'active' : ''}
          onClick={() => handleTabChange('year')}
        >
          연도별
        </button>
        <button
          className={activeTab === 'genre' ? 'active' : ''}
          onClick={() => handleTabChange('genre')}
        >
          장르별
        </button>
        <button
          className={activeTab === 'country' ? 'active' : ''}
          onClick={() => handleTabChange('country')}
        >
          국가별
        </button>
      </ButtonContainer>

      {activeTab === 'year' && <MovieListYearContainer />}
      {activeTab === 'genre' && <MovieListGenreContainer />}
      {activeTab === 'country' && <MovieListCountryContainer />}
    </div>
  );
}

export default MovieListContainer;
