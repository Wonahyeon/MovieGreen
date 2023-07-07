import React, { useState } from 'react';
import styled from 'styled-components';


const SelecBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  .btn {
    width: 60px;
    height: 35px;
    background: white;
    border-radius: 30px;
    margin-left: 50px;
    box-sizing: border-box;
  }
`;


const Chatwrapper = styled.form`

`;
const Intext = styled.input`
  width: 890px;
  height: 35px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  padding: 10px;
  background: aqua;
`;
const Button = styled.button`
  background: #3F8600;
  margin-left: 10px;
  width: 60px;
  height: 35px;
`;

function ChatInsert(props) {
  const { messages, onInsert, onAdd } = props;
  // console.log(messages);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onInsert(value);
    setValue('');
  };

// 원하는 질문 번호 선택시 id값에 따라 누를때만 출력

  return (
    <>
      <SelecBtn>
        <button type='button' className='btn' onClick={onAdd}>1번</button>
        <button type='button' className='btn' onClick={undefined}>2번</button>
        <button type='button' className='btn'>3번</button>
        <button type='button' className='btn'>4번</button>
        <button type='button' className='btn'>5번</button>
      </SelecBtn>
      
      <Chatwrapper onSubmit={handleSubmit}>
        <Intext 
          type='text'
          placeholder='내용을 입력하세요'
          value={value}
          onChange={handleChange}
        />
        <Button type='submit'>
          전송
        </Button>
        
      </Chatwrapper>
    </>
  );
}

export default ChatInsert;