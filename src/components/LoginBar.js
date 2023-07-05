import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavWapper = styled.div`
  .navBar {
    padding: 10px;
    cursor: pointer;
    &:hover{
      color: white;
      transition: 1s ease-in-out;
    }
  } 
`;

function LoginBar(props) {
  const navigate = useNavigate();


  return (
    <>
      <NavWapper>
        <a className='navBar' onClick={() => { navigate('/sign-in'); }}>회원가입</a>
        <a className='navBar' onClick={() => { navigate("/log-in"); }} >로그인</a>
      </NavWapper>
    </>
  );
}

export default LoginBar;