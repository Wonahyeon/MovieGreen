import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const ChatWrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  background: #d9d9d9;
`;
const Menu  = styled.div`
  background: #C8E4A7;
  height: 40px;
`;
const Title = styled.h1`
  color: black;
  font-size: 20px;
  padding: 10px;
`;
const Chat = styled.div`
  background: #717171;
  height: 660px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 0 0 10px;
  .img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: aqua;
  }
  .chatName {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MessageBot = styled.div`
  background: beige;
  width: 350px;
  border-radius: 10px;
  margin-left: 50px;
  margin-top: 7px;
  padding: 15px;
`;
const MessageUser = styled.div`
  background: beige;
  width: 350px;
  border-radius: 10px;
  margin-right: 50px;
  margin-top: 7px;
  padding: 15px;
  right: 0;
`;

const Time = styled.p`
  margin-left: 10px;
  font-size: 14px;
`;
const UserTime = styled.p`
  margin-right: 10px;
  font-size: 14px;
`;
const Form = styled.form`

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

function LiveChat(props) {
  const [message, setMessage] = useState('');
  const [asks, setAsks] = useState([]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // const handleInsert = useCallback((message) => {
  //   const ask = {
  //     id: uuidv4(),
  //     message,
  //   }
  // })

  // submit 후 내 말풍선 올라감(내가 작성한 내용이)
  // localstorage에 작성한 내용 저장해서 올리기
  // 원하는 질문 번호 입력하면 그에 맞는 답변 나옴
  
  // 스토리지에서 가져오기
  useEffect(() => {
    const dbAsk = JSON.parse(localStorage.getItem('asks')) || [];
    setAsks(dbAsk);
  }, []);

  // 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('asks', JSON.stringify(asks));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  }




  return (
    <ChatWrapper>
      <Menu>
        <Title>
          라이브톡
        </Title>
      </Menu>        
      <Chat>
        <Profile>
          <img className='img' src='./chatbotimg.jpg' />
          <p className='chatName'>상담봇</p>
        </Profile>

        <Container>
          <MessageBot>
            질문을 선택하세요<br />
            1. 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구<br />
            2. 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구<br />
            3. 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구<br />
            4. 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구<br />
            5. 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
          </MessageBot>     
          <Time>
            17:20
          </Time>
        </Container>


        <UserContainer>
          <UserTime>
            18:15
          </UserTime>          
          <MessageUser>
            {message}
          </MessageUser>
        </UserContainer>

      </Chat>

      <Form>
        <Intext 
          type='text'
          placeholder='내용을 입력하세요'
          value={message}
          onChange={handleChange}
        />
        <Button
          type='submit'
          onSubmit={handleSubmit}
          >
          
          전송
        </Button>
        
      </Form>

      
    </ChatWrapper>
  );
}

export default LiveChat;