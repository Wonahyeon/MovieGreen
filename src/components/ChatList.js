import React from 'react';
import styled from 'styled-components';

const ChatListWrapper =styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  align-items: flex-end;
  
`;
const UserContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 10px;
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
  width: auto;
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


  // 작성자
function ChatList(props) {
  const { asks: {id, text} } = props;


  return (
    <ChatListWrapper>
      <UserContainer >
        <UserTime>
          18:15
        </UserTime> 
          
        {/* 메세지 */}
        <MessageUser>{text}</MessageUser>
          
      </UserContainer>
    </ChatListWrapper>
  );
}

export default ChatList;