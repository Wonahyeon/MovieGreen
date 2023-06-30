import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

const SigninWrapper = styled.div`
  background: #212126;
  max-width: 450px;
  height: 550px;
  margin: auto;
  margin-top: 70px;
`;

const MainSignin = styled.div`
  /* margin: 0 auto; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .SignContent{
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    padding: 40px;
  }

  input{
    width: 300px;
    height: 50px;
    padding: 7px;
    margin: 10px 0 5px;
    background: #D9D9D9;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 3px;
  }
  span{
    color: white;
  }

  p{
    color: red;
  }
`;

const PwShow = styled.div`
  position: relative;
  left: 130px;
  bottom: 38px;
  color: #212126;
`;

const Button = styled.button`
  width: 300px;
  height: 50px;
  padding: 7px;
  margin-top: 15px;
  background: #D9D9D9;
  outline: none;
  border: none;
  border-radius: 3px;
`;

const SnsSign = styled.div`
  position: relative;
  margin-top: 50px;
  border-top: 1px solid white;

  ul{
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  li{
    padding: 10px;
  }
  a{
    text-decoration: none;
    color: #fff;
  }
`;

function Signin(props) {
  const [signemail, setSignemail] = useState(''); //이메일
  const [emailMessage, setEmailMessage] = useState(''); // 이메일 메시지
  const [IsEmail, setIsEmail] = useState(false); //이메일 유효성 검사
  const [password, setPassword] = useState(''); //비밀번호
  const [passwordMessage, setPasswordMessage] = useState(''); //비밀번호 메시지
  const [IsPassword, setIsPassword] = useState(false); //비밀번호 유효성 검사
  const [passwordType, setPasswordType] = useState({ //비밀번호 visible
    type: 'password',
    visible: false
  }); 
  
  const handleEmail = (e) => { //이메일
    const currentEamil = e.target.value;
    setSignemail(currentEamil);
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!emailRegExp.test(currentEamil)) {
      setEmailMessage('이메일의 형식이 올바르지 않습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일 입니다');
      setIsEmail(true);
    }
  };

  const handlePassword = (e) => { //비밀번호
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    //최소 8자 + 최소 한개의 소문자 + 최소 한개의 대문자 + 최소 한개의 숫자
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage('대소문자/숫자 조합으로 입력해주세요.')
      setIsPassword(false);
    } else {
      setPasswordMessage('');
      setIsPassword(true);
    }
  }

  const handlePasswordType = (e) => { //비밀번호 visible
    setPasswordType(() => {
      if (!passwordType.visible) {
        return {type: 'text', visible: true}        
      }
      return { type: 'password', visible: false}
    })
  }
  
  const handleButton = (e) => { //회원가입 버튼
    e.preventDefault();
    if (IsEmail === true && IsPassword == true) {
      window.location.href = "/log-in"
      alert('회원가입되었습니다.');
    } 
  }

  return (
    <>
      <SigninWrapper>
        <MainSignin >
          <h1 className='SignContent'>이메일과 비밀번호만으로 MovieGreen 즐기기</h1>
          <label for='email'></label>
          <input type='text' id='email' name='name' placeholder='moviegreen@example.com'
            value={signemail}
            onChange={handleEmail}             
          ></input>
          <p>{emailMessage}</p>
          
          <label for='pw'></label>
          <input type={passwordType.type} id='pw' placeholder='moviegreen 비밀번호 설정'
            value={password}
            onChange={handlePassword}
          ></input>
          <p>{passwordMessage}</p>

          <PwShow>
            {passwordType.visible ? <MdOutlineVisibility  onClick={handlePasswordType}/> : <MdOutlineVisibilityOff onClick={handlePasswordType}/>}            
          </PwShow>

          <Button type='button' onClick={handleButton}>MovieGreen 회원가입</Button>
        </MainSignin>

        <SnsSign>
          <ul>
            <li><a href='https://accounts.kakao.com'>카카오</a></li>
            <li><a href='https://nid.naver.com'>네이버</a></li>
            <li><a href='https://www.facebook.com'>페이스북</a></li>
          </ul>
        </SnsSign>
      </SigninWrapper>
    </>
  );
}

export default Signin;