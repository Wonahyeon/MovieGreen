import React, {useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../feature/movie/movieSlice';
import { selectLoginUser } from '../feature/user/userSlice';
import LoginBar from './LoginBar';
import LogoutBar from './LogoutBar';
import { MdSearch } from "react-icons/md";

const Nav = styled.div`
  display: flex;
  justify-content: end;
  top: 0;
  background: rgb(200, 228, 122);
  color: #a8b0bf;
  right: 0;
  padding: 5px 30px;
`;

const HeaderWrapper = styled.div`
  background: rgb(200, 228, 122);
`;

const Container  = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100px;
`;

const Navbar  = styled.div`
  display: flex;
  width: calc(30%);

  .home, .categori, .community, .categori {
    text-decoration: none;
    margin-right: 10px;
    font-size: 20px;
    color: gray;
    cursor: pointer;
      &:hover {
       color: black;
       transition: 1s;
     }   
  }
`;

const LogoWrapper  = styled.div`
  .Logo {
    text-decoration: none;
    color: white;
    font-size: 35px;
    text-decoration: none;
    font-family: 'Luckiest Guy', sans-serif;
  }
`;

const Form  = styled.form`
  width: calc(30%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .searchIcon {
    position: absolute;
    display: flex;
    top: 64px;
    font-size: 27px;
    &:focus {
      display: none;
      color: white;
    }
  }
`;

const Input  = styled.input`
  width: 35px;
  height: 35px;
  padding: 7px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 10px;
  position: relative;
     &::placeholder {
     color: white;
   }
   &:focus {
     &::placeholder {
     color: black;
     }
     opacity: 100;
     width: 200px;
     transition: all .5s cubic-bezier(0.000, 0.105, 0.035, 1.570);
   }
`;

function Header(props) {

  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(selectLoginUser);
  const inputRef = useRef(null);


  const handleChange = (e) => {
    setValue(e.target.value);
    navigate(`/search`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovies(value));
    setValue('');
  };

  const handleClick = () => {
    inputRef.current.focus();
  }


  return (
    <>
        <Nav>
          {userLogin ? <LogoutBar /> : <LoginBar />}
        </Nav>

      <HeaderWrapper>
        <Container className='container'>
        <Navbar className='navBar'>
        <a href='#' className='home' onClick={() => { navigate('/'); }} >홈</a>
        <a className='categori' onClick={() => {navigate('/movie-category');}}>카테고리</a>
        <a className='community' onClick={() => {navigate('/movie-community');}}>게시판</a>        
        <a className='categori' onClick={() => {navigate('/live-chat');}}>라이브톡</a>
        
        </Navbar>
        <LogoWrapper>
          <a href='#' className='Logo' onClick={() => { navigate('/'); }}>Movie Green</a>          
        </LogoWrapper>


        <Form className='form' onSubmit={handleSubmit} onClick={handleClick}>
          <Input type='text'
            className='search'
            placeholder='영화를 입력하세요.'
            value={value}
            ref={inputRef}
            onChange={handleChange}
            />
            
            <MdSearch className='searchIcon' />
        </Form>
        </Container>
        {/* { submenuView &&
          <ul className='submenu'>
            <li className='li' onClick={() => {navigate('/movie-category/year');}}>연도</li>
            <li className='li' onClick={() => {navigate('/movie-category/genre');}}>장르</li>
            <li className='li'>평점</li>
            <li className='li'>연령</li>
            <li className='li' onClick={() => {navigate('/movie-category/country');}}>국가</li>
          </ul>
        } */}
      </HeaderWrapper>


      <Outlet />
    </>

  );
}

export default Header;