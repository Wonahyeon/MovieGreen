import React, {useRef, useState } from 'react';
import styled from 'styled-components';
import { MdInfoOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectLogin, selectUser } from '../feature/user/userSlice';

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

  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [idValue, setIdValue] = useState(''); // ID
  const [pwValue, setPwValue] = useState(''); // PW
  const [warnMsShow, setWarnMsShow] = useState(false); // Id 메세지 
  const [warnPwMsShow, setwarnPwMsShow] = useState(false); // Pw 메세지
  const [showPassward, setShowPassward] = useState({
    type: 'password',
    visible: false
  }); // 비밀번호 보이기
  
  const handleChangeId = (e) => {
    setIdValue(e.target.value);
  };
  const handleChangePw = (e) => {
    setPwValue(e.target.value);
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
// json-server --watch ./src/membership-db.json --port 4000

    const handleRegister = () => {
    axios.get('http://localhost:4000/members') // 데이터 요청
    .then((response) => { // response 받아옴
      const members = response.data;
      const existingMember = members.find(member => member.idMail === idValue || member.passWord === pwValue);
      
      if (existingMember.passWord === pwValue && existingMember.idMail === idValue) {
        console.log('로그인 완료');
        dispatch(selectUser(existingMember.name));
        dispatch(selectLogin(true));
        navigate('/');  
      } else if (existingMember.passWord !== pwValue) {
        console.log('비번 틀림');
        setwarnPwMsShow(true);
        setIdValue('');
        setPwValue('');
      } else if (existingMember.idMail !== idValue) {
        console.log('id 틀림');
        setWarnMsShow(true); 
      } 
    })
    .catch((error) => {
      alert('서버가 끊겼습니다');
    })
  }

  return (
    <LoginWrapper>
      <MainLogin>
        <h1 className='LogText'>로그인</h1>
        <label>
          <Input 
            type='text' 
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
          <Input 
            type={showPassward.type} 
            placeholder='비밀번호'
            value={pwValue}
            onChange={handleChangePw}
            maxLength={16}   
            ref={passwordRef}
            onKeyUp={ (e) => {
              if(e.key === 'Enter') {
                handleRegister();
              }}}
            />
        <PwShow>
          {!showPassward.visible && <MdOutlineVisibilityOff onClick={handleShowPw}/>}
          {showPassward.visible && <MdOutlineVisibility  onClick={handleShowPw}/>}
        </PwShow>
        </label>

        {warnPwMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnPwMessage'>비밀번호가 틀립니다. 다시 입력해주세요.</p>
        </Warn>}

        <Btn type='button' onClick={handleRegister} >로그인</Btn>

        <InFo>
          <p className='SignIn'>아직 계정이 없으신가요?</p>
          <GoToSign href='/sign-in'>회원가입하기</GoToSign>          
        </InFo>

      </MainLogin>
    </LoginWrapper>
    

  );
}

export default Login;