import React from 'react';
import styled from 'styled-components';

const BotItemWrapper = styled.div``;

const BotMsContainer = styled.div``;
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
  flex-direction: row;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageBot = styled.div`
  background: beige;
  width: 550px;
  border-radius: 10px;
  margin-left: 50px;
  margin-top: 7px;
  padding: 15px;
`;

const Time = styled.p`
  margin-left: 10px;
  font-size: 14px;
`;

function BotProfileItem(props) {
  const { answers: { id, text } } = props;
  return (
    <BotItemWrapper>
      <Profile>
        <img className='img' src='./chatbotimg.jpg' />
        <p className='chatName'>상담봇</p>
      </Profile>

      <ChatContainer>
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

          <BotMsContainer>
            <Profile>
              <img className='img' src='./chatbotimg.jpg' />
              <p className='chatName'>상담봇</p>
            </Profile>
            <Container>
              <MessageBot>{text}</MessageBot>
              <Time>
                17:20
              </Time>
            </Container> 
          </BotMsContainer>

        </ChatContainer>
    </BotItemWrapper>
  );
}

export default BotProfileItem;