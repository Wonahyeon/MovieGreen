import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin, selectUserName } from '../feature/user/userSlice';
import styled from 'styled-components';

const NavWrapper = styled.div`
  .navBar {
    padding: 10px;
    cursor: pointer;
    &:hover{
      color: white;
      transition: 1s ease-in-out;
    }
  }
`;

function LogoutBar(props) {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  return (
    <>
      <NavWrapper>
        <a className="navBar" onClick={undefined}>{userName}님</a>
        <a className="navBar" onClick={() => {
          dispatch(selectLogin(false));
        }}>로그아웃</a>
      </NavWrapper>
    </>
  );
}

export default LogoutBar;