import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";
import ChatInsert from '../components/ChatInsert';
import ChatList from '../components/ChatList';

const ChatWrapper = styled.div`
  width: 1024px;
  height: auto;
  margin: 0 auto;
  background: #d9d9d9;
  overflow-y: scroll;
`;
const Menu  = styled.div`
  color: rgba(137, 191, 84, 1);
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

const MessageBot = styled.div`
  background: beige;
  width: auto;
  border-radius: 10px;
  margin-left: 50px;
  margin-top: 7px;
  padding: 15px;
`;

const Time = styled.p`
  margin-left: 10px;
  font-size: 14px;
`;

function LiveChat(props) {
  const [asks, setAsks] = useState([
    // {
    //   id: 1,
    //   text: '1번'
    // },
  ]);
  
  // 스토리지에서 가져오기
  useEffect(() => {
    const dbAsk = JSON.parse(localStorage.getItem('asks')) || [];
    setAsks(dbAsk);
  }, []);

  // 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('asks', JSON.stringify(asks));
  }, [asks]);

  const nextId = useRef(4);

  const handleInsert = useCallback((text) => {
    const ask = {
      id: uuidv4(),
      text
    };
    setAsks(asks => asks.concat(ask)); 
    nextId.current += 1; 
  }, []);





  
  return (
    <ChatWrapper>
      <Menu>
        <Title>
          챗봇
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
            1. 고객센터 ARS 안내가 궁금해요.<br />
            2. IOS에서 일부 최신 영화가 안 보여요.<br />
            3. WI-FI 신호가 약해서 동영상이 잘 재생되지 않아요.<br />
            4. movie Green을 원활하게 이용하기 위한 인터넷 환경을 알려주세요.<br />
            5. 고객센터 연락처를 못 찾겠어요.
          </MessageBot> 

          <Time>
            17:20
          </Time>

        </Container>

        <ChatList asks={asks} />
      </Chat>

      <ChatInsert onInsert={handleInsert}/>

      
    </ChatWrapper>
  );
}

export default LiveChat;