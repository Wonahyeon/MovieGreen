import React, {useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../feature/movie/movieSlice';
import HeaderNav from './HeaderNav';
import { selectLoginUser } from '../feature/user/userSlice';
import LoginBar from './LoginBar';
import LogoutBar from './LogoutBar';

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
  const userLogin = useSelector(selectLoginUser);
console.log(userLogin);

  const [isLogin, setIsLogin] = useState(false);

  const handleSubmenu = () => {
    setSubmenuView(!submenuView);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    navigate(`/search`);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovies(value));
    setValue('');
  };


  return (
    <>
        <Nav>
          {userLogin ? <LogoutBar /> : <LoginBar />}
        </Nav>

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