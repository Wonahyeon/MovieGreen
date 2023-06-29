import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

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

  .emailMessage{
    color: red;
  }
`;

const PwShow = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #d9d9d9;
  margin: 5px 170px 5px 0;

  input {
    position: relative;
    width: 50px;
    margin-left: -65%;
    height: 15px;
  }

  .test{
    position: absolute;
  }
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
  }
`;

function Signin(props) {
  const navigate = useNavigate();
  const [signemail, setSignemail] = useState(''); //이메일
  const [emailMessage, setEmailMessage] = useState(''); // 이메일
  const [IsEmail, setIsEmail] = useState(false); //이메일 유효성 검사
  const [password, setPassword] = useState(''); //비밀번호
  const [passwordType, setPasswordType] = useState({ //비밀번호 visible
    type: 'password',
    visible: false
  }); 
  
  // const [capsLockFlag, setCapsLockFlag] = useState(''); //한글 입력 방지
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
    e.preventDefault();
    
    window.location.href = "/log-in"
    // alert('회원가입되었습니다.');
    // if () {
      
    // }
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
            
            // 한글 방지 입력
            // onChange={(e) => getCapsLock(e)}
            // onKeyDown={(e) => checkCapsLock(e)}
          ></input>
          <p className='emailMessage'>{emailMessage}</p>
          
          <label for='pw'></label>
          <input type={passwordType.type} id='pw' placeholder='moviegreen 비밀번호 설정'
            value={password}
            onChange={handlePassword}
          ></input>

          {/* input 사용할 시 */}
          <PwShow>
            <input type='checkbox' onClick={handlePasswordType} />
            <p className='test'>ㅇ</p>
            {passwordType.visible ? <span>숨기기</span> : <span>보이기</span>}            
          </PwShow>

          <Button type='button' onClick={handleButton}>MovieGreen 회원가입</Button>
        </MainSignin>

        <SnsSign>
          <ul>
            <li><a href='https://accounts.kakao.com'>카카오
            
            </a></li>
            <li><a href='https://nid.naver.com'>네이버</a></li>
            <li><a href='https://www.facebook.com'>페이스북</a></li>
          </ul>
        </SnsSign>
      </SigninWrapper>
    </>
  );
}

export default Signin;