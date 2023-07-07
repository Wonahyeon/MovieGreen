import React from 'react';
import ChatListItem from './ChatListItem';
import styled from 'styled-components';

const ChatListWrapper =styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

function ChatList(props) {
  const { asks } = props;
  return (
    <ChatListWrapper>
      {asks.map(ask => (
        <ChatListItem key={ask.id} ask={ask} />
      ))}
    </ChatListWrapper>
  );
}

export default ChatList;