import React from 'react';
import styled from 'styled-components';
import BotProfileItem from './BotProfileItem';

const BotProfileWrapper = styled.div`
`;



function BotProfile(props) {
  const { answers } = props;
  return (
    <BotProfileWrapper>
      <BotProfileItem answers={answers} />

    </BotProfileWrapper>
  );
}

export default BotProfile;