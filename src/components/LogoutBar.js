import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPickMovie, selectLogin, selectUserName } from '../feature/user/userSlice';
import styled from 'styled-components';

const NavWrapper = styled.div`
  .logOut {
    padding: 10px;
    cursor: pointer;
    &:hover{
      color: white;
      transition: 1s ease-in-out;
    }
  }
  .userName {
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

  const handleLogout = () => {
    dispatch(selectLogin(false));
    dispatch(resetPickMovie());
  };

  return (
    <>
      <NavWrapper>
        <a className="userName" onClick={undefined}>{userName}님</a>
        <a className="logOut" onClick={handleLogout}>로그아웃</a>
      </NavWrapper>
    </>
  );
}

export default LogoutBar;