import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";
import ChatInsert from '../components/ChatInsert';
import ChatList from '../components/ChatList';
import BotProfile from "../components/BotProfile";

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

const answers = [
  {
    id: 1,
    text: `Movie Green 고객센터는 신속한 상담을 위해 ARS 사전 처리 단계를 없애고, 고객센터 연결 시 상담직원이 바로 도움드릴 수 있게 운영되고 있습니다
      [ARS 안내] ☎ 1599-3709 통화 > 상담사 연결 (ARS 사전 처리 단계 없음) ${<br/>}
      ※ 단, 문의량 과다로 인한 연결 지연 시 아래 1번 또는 2번 中 선택${<br/>}
      1번 상담원 연결 대기 : 상담사 연결이 지연될 경우 통화 중 멘트 2회 후 콜백 서비스로 안내${<br/>}
      2번 카카오 상담 톡 연결 안내 : 카카오 알림톡 수신 전화번호 입력 후 카카오 알림톡 URL 발송`
  },
  {
    id: 2,
    text: `앱 내부 결제 (코인 구매 불가)의 정책적인 문제와 DRM 플레이어 개발의 시스템적인 이슈로 인하여 iOS 앱에서 DRM 영화는 현재 서비스 제공이 불가능 합니다.${<br/>}
      단, 타 기기에서 구매한 DRM 영화의 경우, MY → 이용내역/구매콘텐츠 메뉴 또는 검색을 통해 확인 및 시청이 가능합니다.`
  },
  {
    id: 3,
    text: `Wi-Fi의 신호가 약한 상태로 서비스를 이용할 경우 서비스 이용에 지연이 발생할 수 있습니다.${<br/>}
      아래 방법을 통해 Wi-Fi 신호가 약할 경우 자동으로 모바일 데이터로 전환되는 기능을 활성화해 주세요.${<br/>}
      <설정 방법>${<br/>}
      단말기 내 설정 > 연결 > Wi-Fi > 오른쪽 상단 '점 세 개' 버튼 > 고급 > Intelligent Wi-Fi 메뉴 내 '모바일 데이터로 전환' 활성화`
  },
  {
    id: 4,
    text: `Movie Green을 사용하기 위해서는 최소 2Mbps 이상의 인터넷 회선이 필요합니다.${<br/>}
      안정적인 서비스가 이루어지기 위해서는 10Mbps급 이상의 인터넷 회선이 필요합니다.`
  },
  {
    id: 5,
    text: `Movie Green 고객센터 연락처는 아래와 같습니다.
      전화 : 1599-3709`
  }
];



function LiveChat(props) {
  const [allChat, setAllChat] = useState(); // 채팅

  const [showBotMs, setShowBotMs] = useState(false); // 질문
  const [asks, setAsks] = useState([]);

  const handleInsert =() => {
    setAsks(answers.id === 1); 
  };

  const handleShow = () => {
    setShowBotMs(true);
  };

  const handleAdd = () => {
    setAsks(asks.text);
  }


  
  return (
    <ChatWrapper>
      <Menu>
        <Title>
          챗봇
        </Title>
      </Menu>   
      <Chat>
        <BotProfile showBotMs={showBotMs} answers={answers} />
        <ChatList asks={asks} />        
      </Chat>
      <ChatInsert onInsert={handleInsert} onShow={handleShow} answers={answers} onAdd={handleAdd} />
    </ChatWrapper>
  );
}

export default LiveChat;