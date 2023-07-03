import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectUserName } from '../feature/user/userSlice';
import { useState } from "react";
import { useSelector } from 'react-redux';


const NavWrapper = styled.div`

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

function HeaderNav(props) {
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(true);

  const handleToggle = () => {
    if (userName === null) {
      setIsShow(isShow)
    } else {
      setIsShow(!isShow)
    }
  }

  // login 성공시 회원가입/로그인 display none



  return (
    <>
      <NavWrapper>

        <a className="userName" onClick={undefined}>{userName}님</a>
        <a className="logOut" onClick={undefined}>로그아웃</a>
        
        <a className='signIn' onClick={() => { navigate('/sign-in'); }} >회원가입</a>
        <a className='logIn' onClick={() => { navigate("/log-in"); }} >로그인</a>
      </NavWrapper>
    
    </>
  )
}

export default HeaderNav;