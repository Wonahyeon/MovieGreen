import React, { useState } from 'react';
import styled from 'styled-components';

// 사용가능한 아이디


const Text = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
`;

const Container = styled.div`
  margin: 0 auto;
`; 

const Inputs = styled.div`
  width: 768px;
  margin: 0 auto;
`;

const Inputgroup = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  input {
    height: 2rem;
    display: flex;
  }

  /* .phone{
    display: flex;
  } */
`;


// 회원가입
function Signin(props) {
  // const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const handlepassword = (e) => {
    setPassword(e.target.value);
  }

  const handleconfirmpassword = (e) => {
    setConfirmpassword(e.target.value);
  }

  const handleonSubmit = (e) => {
    e.prevenDefault();
    if (password !== confirmpassword) {
      // setValue(e.target.value)
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다')
    }
  }
  
  return (
    <>
      <Text>회원가입</Text>
      <Container>
        <Inputs>
          <Inputgroup >
            <label for='id'>아이디</label>
            <input type='text' id='id'/>

            <label for='pw1'>비밀번호</label>
            <input type='text' id='pw1' value={password} onChange={handlepassword}/>

            <label for='pw2'>비밀번호 확인</label>
            <input type='text' id='pw2' value={confirmpassword} onChange={handleconfirmpassword}/>

            <label for='email'>이메일</label>
            <input type='text' id='email'/>

            <label>전화번호</label>
            <input type='text' className='phone'/>
            <input type='text' className='phone'/>


            <br />
            
            <button type='button' onSubmit={handleonSubmit}>가입하기</button>

          </Inputgroup>
        </Inputs>
      </Container>



    </>
  );
}

export default Signin;