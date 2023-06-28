import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdCheckBox, MdCheckBoxOutlineBlank  } from "react-icons/md";

const LoginWrapper = styled.div`
  background: #212126;
  /* opacity: 0.6; */
  max-width: 450px;
  height: 660px;
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

const Btn = styled.button`
  width: 300px;
  height: 50px;
  padding: 7px;
  margin-top: 20px;
  background: #D9D9D9;
  outline: none;
  border: none;
  border-radius: 3px;
`;

const CheckBox = styled.div`
  background: red;
  margin-top: 15px;
  margin-right: 126px;
  
`;

function Login(props) {
  // const [value, setValue] = useState('');

  // const handleChange = (e) => {
  //   setValue(e.target)
  // }


  return (
    <>
      <LoginWrapper>
        <MainLogin>
          <h1 className='LogText'>로그인</h1>
          <label>
            <Input type='text' 
              placeholder='이메일 주소 또는 아이디'
              // value={value}
              // onChange={handleChange}
            />
          </label>
          <label>
            <Input type='text' 
              placeholder='비밀번호'
            />
          </label>
          <Btn>로그인</Btn>


          {/* <CheckBox>
            <MdCheckBox />
            로그인 상태 유지하기
          </CheckBox> */}

        </MainLogin>
        
        
      </LoginWrapper>
    </>
  );
}

export default Login;