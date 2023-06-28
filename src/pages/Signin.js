import React, { useState } from 'react';
import styled from 'styled-components';
// import { AiFillEyeInvisible } from "react-icons/md";

const SigninWrapper = styled.div`
  background: #212126;
  max-width: 450px;
  height: 660px;
  margin: auto;
  margin-top: 70px;
`;

const MainSignin = styled.div`
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
    position: relative;
    width: 300px;
    height: 50px;
    margin-top: 50px;
    padding: 7px;
    background: #D9D9D9;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 3px;
  }
  p{
    color: red;
  }
  span{
    color: white;
  }
  button{
    width: 300px;
    height: 50px;
    padding: 7px;
    margin-top: 15px;
    background: #D9D9D9;
    border-radius: 3px;
    outline: none;
    border: none;
  }
`;

const SnsSign = styled.div`
  margin-top: 50px;

  span{
    border-bottom: 1px solid white;
  }
`;

function Signin(props) {
  const [signemail, setSignemail] = useState(''); //이메일
  const [password, setPassword] = useState(''); //비밀번호
  const [passwordType, setPasswordType] = useState({ //비밀번호 visible
    type: 'password',
    visible: false
  }); 
  
  // const [capsLockFlag, setCapsLockFlag] = useState(''); //한글 입력 방지


  const handleEmail = (e) => { //이메일
    if (signemail.length < 4) {
      
    }
    setSignemail(e.target.value)
  }
  const handlePassword = (e) => { //비밀번호
    setPassword(e.target.value)
  }
  const handlePasswordType = (e) => { //비밀번호 visible
    setPasswordType(() => {
      if (!passwordType.visible) {
        return {type: 'text', visible: true}        
      }
      return { type: 'password', visible: false}
    })
  }
  
  // -----
  // const checkCapsLock = (e) => { //한글 입력 방지
  //   const capsLock = e.getModifierState('CapsLock');
  //   setCapsLockFlag(capsLock);
  // }
  // const dataRuleCheck = (ch) => {
  //   const code = ch.charCodeAt(0);
  //   if (48 <= code && code <= 57) return true;
  //   if (65 <= code && code <= 90) return true;
  //   if (97 <= code && code <= 122) return true;
  //   return false;
  // }

  const handleButton = (e) => { //회원가입 버튼
    alert('회원가입되었습니다');
    e.preventDefault();
  }

  return (
    <>
      <SigninWrapper>
        <MainSignin >
          <h1 className='SignContent'>이메일과 비밀번호만으로 MovieGreen 즐기기</h1>
          <label for='email'></label>
          <input type='text' id='email' placeholder='moviegreen@example.com'
            value={signemail}
            onChange={handleEmail} 
            
            // 한글 방지 입력
            // onChange={(e) => getCapsLock(e)}
            // onKeyDown={(e) => checkCapsLock(e)}
          ></input>
          {signemail && <p>5~50자의 이메일 형식으로 입력해주세요.</p>} 
          

          <label for='pw'></label>
          <input type={passwordType.type} id='pw' placeholder='moviegreen 비밀번호 설정'
            value={password}
            onChange={handlePassword}
          ></input>
          <span onClick={handlePasswordType}>
            {passwordType.visible ? <span>숨기기</span> : <span>보이기</span>}            
          </span>

          <button 
            type='submit'
            onClick={handleButton}
          >
            MovieGreen 회원가입
          </button>
        </MainSignin>

        <SnsSign>
          <span></span>
          <ul>
            <li><a href='https://accounts.kakao.com'>카카오</a></li>
            <li><a href='https://nid.naver.com'>네이버</a></li>
          </ul>

        
        </SnsSign>
      </SigninWrapper>
    </>
  );
}

export default Signin;