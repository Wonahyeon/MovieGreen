import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdInfoOutline  } from "react-icons/md";
import { Navigate, Outlet } from 'react-router-dom';

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
  /* display: none; */
  display: flex;
  color: orange;
  font-size: 12px;
  margin: 5px 0 10px;
  .warnMessage {
    margin: 0 48px 0 5px;
  }
  .warnPwMessage {
    margin: 0 80px 0 5px;
  }
`;

const PwShow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #d9d9d9;
  margin: 5px 170px 5px 0;
  .inputcheck {
    margin-right: 10px;
  }
`;
const CheckBox = styled.div`
  margin: 5px 8px 5px 0;
  font-size: 23px;
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





function Login(props) {

  const [IdValue, setIdValue] = useState(''); // ID
  const [PwValue, setPwValue] = useState(''); // PW
  const [isShowPwChecked, setIsShowPwChecked] = useState(false); // PW 보이기,감추기

  const passwordRef = useRef(null);

  const [warnMsShow, setWarnMsShow] = useState(false); // Id 메세지 
  const [warnPwMsShow, setwarnPwMsShow] = useState(false); // Pw 메세지

console.log(warnMsShow);

  // 비밀번호 
  // /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const handleChangeId = (e) => {
    setIdValue(e.target.value);
  };
  const handleChangePw = (e) => {
    setPwValue(e.target.value);
  };  
  const handleAddProduct = () => {
    setPwValue('');
    setIdValue('');
    IdValue.length < 3 ? setWarnMsShow(true) : setWarnMsShow(false);
    PwValue.length < 4 ? setwarnPwMsShow(true) : setwarnPwMsShow(false);
  };

  const handleShowWarn = () => {
    IdValue.length < 3 ? setWarnMsShow(true) : setWarnMsShow(false);
    PwValue.length < 4 ? setwarnPwMsShow(true) : setwarnPwMsShow(false);
  }
  // Id 글자수 맞춰도 안 사라짐

  const handleShowPwChecked = async () => {
    const password = await passwordRef.current
    if (password === null) return

    await setIsShowPwChecked(!isShowPwChecked)
    if(!isShowPwChecked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }



  return (
    <LoginWrapper>
      <MainLogin>
        <h1 className='LogText'>로그인</h1>
        <label>
          <Input type='text' 
            placeholder='이메일 주소 또는 아이디'
            value={IdValue}
            onChange={handleChangeId}
          />
        </label>

        {warnMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnMessage'>정확한 이메일 또는 아이디를 입력해주세요.</p>
        </Warn>}

        <label>
          <Input type='password' 
            placeholder='비밀번호'
            value={PwValue}
            onChange={handleChangePw}
            maxLength={16}   
            ref={passwordRef}
            onKeyUp={ (e) => {
              if(e.key === 'Enter') {
                handleAddProduct();
              }}}
            />
        </label>

        {warnPwMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnPwMessage'>비밀번호는 4~16자 사이여야 합니다.</p>
        </Warn>}

        <PwShow>
          <input className='inputcheck' type='checkbox' onClick={(handleShowPwChecked)} />
          {/* <CheckBox onClick={handleShowPwChecked}>
            {CheckBox ? <MdCheckBox /> : <MdCheckBoxOutlineBlank/>}
          </CheckBox> */}
          <span>비밀번호 보기</span>
        </PwShow>

        <Btn type='submit' onClick={handleShowWarn}>로그인</Btn>

        <InFo>
          <p className='SignIn'>아직 계정이 없으신가요?</p>
          <GoToSign href='/sign-in'>회원가입하기</GoToSign>          
        </InFo>

      </MainLogin>
      
    </LoginWrapper>
    
  );
}

export default Login;