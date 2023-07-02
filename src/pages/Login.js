import React, {useRef, useState } from 'react';
import styled from 'styled-components';
import { MdInfoOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginWrapper = styled.div`
  background: #212126;
  /* opacity: 0.6; */
  max-width: 450px;
  height: 450px;
  margin: auto;
  margin-top: 70px;
`;
const MainLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .LogText {
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    padding: 50px 0 20px;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  padding: 7px;
  background: #D9D9D9;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 3px;
  margin: 10px 0 5px;
`;

// Id 경고
const Warn = styled.div`
  display: flex;
  color: orange;
  font-size: 12px;
  margin: 5px 0 10px;
  .warnMessage {
    margin: 0 48px 0 5px;
  }
  .warnPwMessage {
    margin: 0 55px 0 5px;
  }
`;

const PwShow = styled.div`
  position: relative;
  left: 267px;
  bottom: 38px;
  color: #212126;
  display: block;
  height: 0px;
`;

const Btn = styled.button`
  width: 300px;
  height: 50px;
  padding: 7px;
  margin-top: 15px;
  background: #D9D9D9;
  outline: none;
  border: none;
  border-radius: 3px;
  &:active{
    background: #AD8888;
  }
`;

const InFo = styled.div`
  margin-top: 20px;
  color: #D9D9D9;
  display: flex;
  flex-direction: row;

  .SignIn {
    margin-right: 20px;
  }

`;
const GoToSign = styled.a`
  color: #D9D9D9;
  cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: white;
  }
`;

// 비밀번호 보이기

function Login(props) {

  const navigate = useNavigate();

  const [showPassward, setShowPassward] = useState({
    type: 'password',
    visible: false
  }); // 비밀번호 보이기
  
  const [idValue, setIdValue] = useState(''); // ID
  const [pwValue, setPwValue] = useState(''); // PW

  const passwordRef = useRef(null);

  const [warnMsShow, setWarnMsShow] = useState(false); // Id 메세지 
  const [warnPwMsShow, setwarnPwMsShow] = useState(false); // Pw 메세지

  const handleChangeId = (e) => {
    setIdValue(e.target.value);
  };
  const handleChangePw = (e) => {
    setPwValue(e.target.value);
  }; 

  const handleAddInfo = () => {

    if (!handleValid()) {
      setPwValue('');
      setIdValue('');
    } else {
      // navigate('/');
    }
  };

  const handleShowPw = (e) => {
    setShowPassward(() => {
      if (!showPassward.visible) {
        return { type: 'text', visible: true };
      } else {
        return { type: 'password', visible: false };
      }
    })
  }


// 영문자 또는 숫자 6~20자 
// 대문자 하나 이상, 소문자 하나 및 숫자 하나

  const idErr = /^[a-z]+[a-z0-9]{5,19}$/;  
  const pwErr =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;  

  const handleValid = () => {
    idErr.test(idValue) ? setWarnMsShow(false) : setWarnMsShow(true);
    pwErr.test(pwValue) ? setwarnPwMsShow(false) : setwarnPwMsShow(true);
    if (idErr.test(idValue) && pwErr.test(pwValue)) {
      return true;
    } else {
      return false;
    }
  };
  
  // json-server --watch membership-db.json --port 3009

  // 데이터 요청 후 response 받아오면 idValue === idEmail 일치 여부 확인
  // 일치시 navigate실행 불일치시 경고창

  const hanldeRegister = () => {
    axios.get('http://localhost:4000/members') // 데이터 요청
    .then((response) => { // response 받아옴
      const members = response.data;
      const existingMember = members.find(member => member.idMail === idValue);
      if (existingMember) {
        console.log('로그인 완료');

        // 로그인 완료 시 나타낼 컴포넌트 추가
        // 헤더 회원 가입 -> 사용자 이름
        // 헤더 로그인  -> 로그아웃
        navigate('/');
      } else {
        setWarnMsShow(true);
      }
      
    })
    .catch((error) => {
      console.error(error);
    })
  };

  return (
    <LoginWrapper>
      <MainLogin>
        <h1 className='LogText'>로그인</h1>
        <label>
          <Input type='text' 
            placeholder='이메일 주소 또는 아이디'
            value={idValue}
            onChange={handleChangeId}
          />
        </label>

        {warnMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnMessage'>정확한 이메일 또는 아이디를 입력해주세요.</p>
        </Warn>}

        <label>
          <Input type={showPassward.type} 
            placeholder='비밀번호'
            value={pwValue}
            onChange={handleChangePw}
            maxLength={16}   
            ref={passwordRef}
            onKeyUp={ (e) => {
              if(e.key === 'Enter') {
                handleAddInfo();
              }}}
            />
        <PwShow>
          {!showPassward.visible && <MdOutlineVisibilityOff onClick={handleShowPw}/>}
          {showPassward.visible && <MdOutlineVisibility  onClick={handleShowPw}/>}
        </PwShow>
        </label>

        {warnPwMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnPwMessage'>대소문자/특수문자를 모두 포함해주세요.</p>
        </Warn>}


        <Btn type='button' onClick={hanldeRegister} >로그인</Btn>

        <InFo>
          <p className='SignIn'>아직 계정이 없으신가요?</p>
          <GoToSign href='/sign-in'>회원가입하기</GoToSign>          
        </InFo>

      </MainLogin>
      
    </LoginWrapper>
    
  );
}

export default Login;