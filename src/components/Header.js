import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch as Find  } from "react-icons/ai";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../feature/movie/movieSlice';
import Video from './Video';

const HeaderNav = styled.div`
  display: flex;
  justify-content: end;
  top: 0;
  background: #212126;
  color: #a8b0bf;
  right: 0;
  padding: 5px 30px;
  .signIn {
    padding: 10px;
    cursor: pointer;
    &:hover{
      color: white;
      transition: 1s ease-in-out;
    }
  }
  .logIn {
    padding: 10px;
    cursor: pointer;
    &:hover{
      color: white;
      transition: 1s ease-in-out;
    }
  }
`;

const HeaderWrapper = styled.div`
  height: 100px;
  background: #212126;
  padding: 8px;
  .submenu {
    background: #a8b0bf;
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 43px;
    left: 135px;
    padding: 2px;
  }
  .li {
    padding: 8px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
  .Logo {
    color: #a8b0bf;
    font-weight: 600;
    font-size: 35px;
    text-decoration: none;
  }
`;

const Navbar = styled.div`
  margin: 0 0 0 100px;
  font-size: 20px;
  color: #a8b0bf;
  .home {
    padding: 8px;
    color: #a8b0bf;
    text-decoration: none;
    padding: 10px;
  }
  .categori{
    padding: 8px;
    cursor: pointer;

    &:hover {
      color: white;
      transition: 1s;
  
    }    
  }
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  padding: 7px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-right: 100px;
  &::placeholder {
    color: #a8b0bf;
  }
`;



function Header(props) {
  const [submenuView, setSubmenuView] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmenu = () => {
    setSubmenuView(!submenuView);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovies(value));
    setValue('');
    navigate('/');
  };


  return (
    <>
        <HeaderNav>
          <a className='signIn' onClick={() => { navigate('/sign-in'); }} >회원가입</a>
          <a className='logIn' onClick={() => { navigate("/log-in"); }} >로그인</a>
        </HeaderNav>

      <HeaderWrapper>
        <Container>
        <Navbar>
        <a href='#' className='home' onClick={() => { navigate('/'); }} >홈</a>
        <a className='categori' onClick={() => {navigate('/movie-category');}}>카테고리</a>
        
        </Navbar>

        <a href='#' className='Logo' onClick={() => { navigate('/'); }}>Movie Green</a>

        <form onSubmit={handleSubmit}>
          <Input type='text'
            placeholder='영화를 입력하세요.'
            value={value}
            onChange={handleChange}
            />
        </form>
        </Container>
        { submenuView &&
          <ul className='submenu'>
            <li className='li' onClick={() => {navigate('/movie-year');}}>연도</li>
            <li className='li' onClick={() => {navigate('/movie-genre');}}>장르</li>
            <li className='li'>평점</li>
            <li className='li'>연령</li>
            <li className='li' onClick={() => {navigate('/movie-country');}}>국가</li>
          </ul>
        }
      </HeaderWrapper>

      <Video />

      <Outlet />
    </>

  );
}

export default Header;