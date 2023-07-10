import React, { useState, useEffect } from 'react';
import MovieListYearContainer from './MovieListYear';
import MovieListGenreContainer from './MovieListGenre';
import MovieListCountryContainer from './MovieListCountry';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieListCustomContainer from './MovieListCustom';
import RandomMovie from './RandomMovie';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;

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


&:hover {
  background-color: rgba(0, 0, 0, 0.1);
}


&:focus {
  border-color: #00bfff;
  box-shadow: 0 0 0.5rem rgba(0, 191, 255, 0.5);
}


&::-ms-expand {
  display: none;
}


&::after {
  content: "\\25BC";
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
}
  }
`;

function MovieListContainer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('year');

  useEffect(() => {
    const path = location.pathname;

    if (path.includes('genre')) {
      setActiveTab('genre');
    } else if (path.includes('country')) {
      setActiveTab('country');
    } else if (path.includes('year')) {
      setActiveTab('year');
    } else if (path.includes('custom')) {
      setActiveTab('custom')
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === 'year') {
      navigate('/movie-category/year');
    } else if (tab === 'genre') {
      navigate('/movie-category/genre');
    } else if (tab === 'country') {
      navigate('/movie-category/country');
    } else if (tab === 'custom') {
      navigate('/movie-category/custom')
    }
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
        <button
          className={activeTab === 'custom' ? 'active' : ''}
          onClick={() => handleTabChange('custom')}
        >
          커스텀
        </button>
        <RandomMovie />
      </ButtonContainer>

      {activeTab === 'year' && <MovieListYearContainer />}
      {activeTab === 'genre' && <MovieListGenreContainer />}
      {activeTab === 'country' && <MovieListCountryContainer />}
      {activeTab === 'custom' && <MovieListCustomContainer />}
    </div>
  );
}

export default MovieListContainer;


