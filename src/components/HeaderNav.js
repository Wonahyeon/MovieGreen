import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


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

  const navigate = useNavigate();

  const handleRegister = () => {
    axios.get('http://localhost:4000/members')
    .then((response) => {
      const members = response.data;
      const users = members.find(member => member.name)
      console.log(users);
    })
    .catch((error) => {
        console.error(error);
    })
  }

  return (
    <>
      <NavWrapper>
        <a className="userName" onClick={handleRegister}>{handleRegister.name}님</a>
        <a className="logOut" onClick={undefined}>로그아웃</a>
        <a className='signIn' onClick={() => { navigate('/sign-in'); }} >회원가입</a>
        <a className='logIn' onClick={() => { navigate("/log-in"); }} >로그인</a>
      </NavWrapper>
    
    </>
  )
}

export default HeaderNav;