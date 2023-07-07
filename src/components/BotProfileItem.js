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
  const { message: { id, text } } = props;
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



// import React from 'react';
// import styled from 'styled-components';





// function BotProfile(props) {
//   const { showBotMs, messages } = props;
//   return (
//     <BotProfileWrapper>
      // <Profile>
      //   <img className='img' src='./chatbotimg.jpg' />
      //   <p className='chatName'>상담봇</p>
      // </Profile>

      // <ChatContainer>
      //   <Container>
      //     <MessageBot>
      //       질문을 선택하세요<br />
      //       1. 고객센터 ARS 안내가 궁금해요.<br />
      //       2. IOS에서 일부 최신 영화가 안 보여요.<br />
      //       3. WI-FI 신호가 약해서 동영상이 잘 재생되지 않아요.<br />
      //       4. movie Green을 원활하게 이용하기 위한 인터넷 환경을 알려주세요.<br />
      //       5. 고객센터 연락처를 못 찾겠어요.
      //     </MessageBot> 
      //     <Time>
      //       17:20
      //     </Time>
      //     </Container>

      //     {showBotMs && <BotMsContainer>
      //       <Profile>
      //         <img className='img' src='./chatbotimg.jpg' />
      //         <p className='chatName'>상담봇</p>
      //       </Profile>
      //       <Container>
      //         <MessageBot>Wavve 고객센터는 신속한 상담을 위해 ARS 사전 처리 단계를 없애고, 고객센터 연결 시 상담직원이 바로 도움드릴 수 있게 운영되고 있습니다.<br/>
      //         [ARS 안내] ☎ 1599-3709 통화 - 상담사 연결 (ARS 사전 처리 단계 없음)<br/>
      //         ※ 단, 문의량 과다로 인한 연결 지연 시 아래 1번 또는 2번 中 선택<br/>
      //         1번 상담원 연결 대기 : 상담사 연결이 지연될 경우 통화 중 멘트 2회 후 콜백 서비스로 안내<br/>
      //         2번 카카오 상담 톡 연결 안내 : 카카오 알림톡 수신 전화번호 입력 후 카카오 알림톡 URL 발송 
      //         </MessageBot>
      //         <Time>
      //           17:20
      //         </Time>
      //       </Container> 
      //     </BotMsContainer>} 

      //   </ChatContainer>

//       </BotProfileWrapper>
//   );
// }

// export default BotProfile;