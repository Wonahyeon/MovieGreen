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
  background: #212126;
  color: #a8b0bf;
  right: 0;
  padding: 5px 30px;
`;

const HeaderWrapper = styled.div`
  height: 100px;
  background: #212126;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .container {
    margin-right: 10px;
    /* width: calc(100% - 30%); */
  }
  .form {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 15px 0;
  .navBar {
    margin-right: 330px;
  }
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
  .categori, .community{
    padding: 8px;
    cursor: pointer;

    &:hover {
      color: white;
      transition: 1s;
    }    
  }
`;
const Form = styled.form`
  display: flex;
  /* flex-grow: 2; */
  .searchIcon {
    position: absolute;
    top: 70px;
    right: 217px;
    font-size: 30px;
    color: black;
    cursor: pointer;
    &:focus {
      opacity: 0;
    }
  }
`;
const Input = styled.input`
  width: 40px;
  height: 35px;
  padding: 7px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 10px;
  /* margin-left: 100px; */
  /* opacity: 0; */
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
        
        </Navbar>

        <a href='#' className='Logo' onClick={() => { navigate('/'); }}>Movie Green</a>
        </Container>
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