import React from 'react';
import styled from 'styled-components';
import BotProfileItem from './BotProfileItem';

const BotProfileWrapper = styled.div`
`;



function BotProfile(props) {
  const { messages } = props;
  return (
    <BotProfileWrapper>
      <BotProfileItem message={messages} />
      {/* {messages.map(message => (
        <BotProfileItem key={message.id} message={message}  />
      ))} */}
    </BotProfileWrapper>
  );
}

export default BotProfile;