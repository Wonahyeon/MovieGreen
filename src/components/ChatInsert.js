import React, { useState } from 'react';
import styled from 'styled-components';

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

function ChatInsert({onInsert}) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onInsert(value);
    setValue('');
  };

  return (
    <>
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