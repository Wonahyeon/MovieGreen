import React, { useState } from 'react';
import styled from 'styled-components';
import chatbotImg from '../images/chatbotimg.jpg';

const WholeWraper = styled.div`
  margin-top: 170px;
  margin-bottom: 170px;
`;

const Mainheader = styled.div`
  width: 1024px;
  height: 40px;
  background: ${props => props.theme.Chatbot};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  .main {
    font-size: 20px;
    color: #d9d9d9;
  }
`;

const ChatbotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 500px;
  margin: 0 auto;
  background: #A6A6A6;
  border-radius: 1rem;
  .chat-container .message {
    display: flex;
    flex-direction: column;
  }
  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: green;
    margin-right: 5px;
  }
  .user-message {
    justify-content: flex-end;
    align-self: flex-end;
    background-color: #d2d1d1;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: right;
  }
  .bot-message {
    display: flex;
    flex-direction: row;    
  }
  .user-wrapper {
    display: flex;
    flex-direction: row;    
    justify-content: flex-end;
  }
  .botms-ds {
    align-self: flex-start;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 20rem;
    line-height: 19px;
  }
  .time-left {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    font-size: 12px;
    margin-left: 10px;
  }
  .time-right {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    font-size: 12px;
    margin-right: 10px;
  }
  .btnWrapper {
    display: flex;
    justify-content: space-around;
  }
  .btn {
    width: 100px;
    height: 30px;
    background: ${props => props.theme.main};
    border-radius: 30px;
    box-sizing: border-box;
    margin-right: 10px;
    outline: none;
    border: 1px solid #586F8C;
    &:hover {
      background: #495B73;
    }
  }
  .inputBtn {
    width: 50px;
    height: 35px;
    background: ${props => props.theme.main};
    margin-left: 3px;
    border-radius: 10px;
    outline: none;
    border: 1px solid #586F8C;
    &:hover {
      background: #495B73;
    }
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  margin-top: 7px;    
`;
const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid;
`;

const botData = [
  {
    question: '고객센터 ARS 안내가 궁금해요.',
    answer: (
    <>
      Movie Green 고객센터는 신속한 상담을 위해 ARS 사전 처리 단계를 없애고,<br/>
      고객센터 연결 시 상담직원이 바로 도움드릴 수 있게 운영되고 있습니다.<br/>
      [ARS 안내] ☎ 1599-3709 통화 &gt; 상담사 연결 (ARS 사전 처리 단계 없음)<br/>
      ※ 단, 문의량 과다로 인한 연결 지연 시 아래 1번 또는 2번 中 선택<br/>
      1번 상담원 연결 대기 : 상담사 연결이 지연될 경우 통화 중 멘트 2회 후 콜백 서비스로 안내<br/>
      2번 카카오 상담 톡 연결 안내 : 카카오 알림톡 수신 전화번호 입력 후 카카오 알림톡 URL 발송
    </>
    )
  },
  {
    question: 'IOS에서 일부 최신 영화가 안 보여요.',
    answer:(
      <>
        앱 내부 결제 (코인 구매 불가)의 정책적인 문제와<br/>
        DRM 플레이어 개발의 시스템적인 이슈로 인하여 iOS 앱에서 DRM 영화는 현재 서비스 제공이 불가능 합니다.<br/>
        단, 타 기기에서 구매한 DRM 영화의 경우, MY → 이용내역/구매콘텐츠 메뉴 또는 검색을 통해 확인 및 시청이 가능합니다.
      </>
    )
  },
  {
    question: 'WI-FI 신호가 약해서 동영상이 잘 재생되지 않아요.',
    answer: (
      <>
        Wi-Fi의 신호가 약한 상태로 서비스를 이용할 경우 서비스 이용에 지연이 발생할 수 있습니다.<br/>
        아래 방법을 통해 Wi-Fi 신호가 약할 경우 자동으로 모바일 데이터로 전환되는 기능을 활성화해 주세요.<br/>
        &lt;설정 방법&gt; <br/>
        단말기 내 설정 &gt; 연결 &gt; Wi-Fi &gt; 오른쪽 상단 '점 세 개' 버튼 &gt; 고급 &gt; Intelligent Wi-Fi 메뉴 내 '모바일 데이터로 전환' 활성화
      </>
    )
  },
  {
    question: 'movie Green을 원활하게 이용하기 위한 인터넷 환경을 알려주세요.',
    answer: (
      <>
        Movie Green을 사용하기 위해서는 최소 2Mbps 이상의 인터넷 회선이 필요합니다.<br/>
        안정적인 서비스가 이루어지기 위해서는 10Mbps급 이상의 인터넷 회선이 필요합니다.
      </>
    )
  },
  {
    question: '고객센터 연락처를 못 찾겠어요.',
    answer: (
      <>
        Movie Green 고객센터 연락처는 아래와 같습니다.<br/>
        전화 : 1599-3709
      </>
    )
  },
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [msgNum, setMsgNum] = useState(0);

  const handleQuestionSelect = (selectedQuestion) => {
    const generatedAnswer = botData.find((data) => data.question === selectedQuestion)?.answer || '';

    const newMessage = {
      question: selectedQuestion,
      answer: generatedAnswer,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMsgNum(msgNum + 1);
  };

  const renderButtons = () => {
    return botData.map((data, index) => (
      <button className='btn' key={index} onClick={() => handleQuestionSelect(data.question)}>
        {index + 1}
      </button>
    ));
  };

  return (
    <>
      <WholeWraper>
        <ChatbotWrapper>

          <div className='profile'>
            <img className='img' alt='img' src={chatbotImg}/>
            <h1 className='botname'>챗봇</h1>        
          </div>

          <div className="chat-container">
            <div className='bot-message' style={{width: 'fit-content'}}>
              <p className='botms-ds'> 질문을 선택하세요<br />
                1. 고객센터 ARS 안내가 궁금해요.<br />
                2. IOS에서 일부 최신 영화가 안 보여요.<br />
                3. WI-FI 신호가 약해서 동영상이 잘 재생되지 않아요.<br />
                4. movie Green을 원활하게 이용하기 위한 인터넷 환경을 알려주세요.<br />
                5. 고객센터 연락처를 못 찾겠어요.</p>
              <p className='time-left'>{new Date().toLocaleTimeString().slice(0,7)}</p>            
            </div> 

            {messages.map((message, index) => (
              <div key={index} className="message" isUserMessage={index % 2 === 0}>
              
                <div className='user-wrapper'>
                  <p className='time-right'>{new Date().toLocaleTimeString().slice(0,7)}</p>               
                  <p className='user-message'>{message.question}</p>   
                </div>
                
                <div className='profile'>
                  <img className='img' alt='img'  src={chatbotImg} />
                  <h1 className='botname'>챗봇</h1>        
                </div>   
            
                <div className='bot-message'>
                  <p className='botms-ds'>{message.answer}</p>              
                  <p className='time-left'>{new Date().toLocaleTimeString().slice(0,7)}</p>            
                </div>     
            
              </div>
            ))}

          </div>
          <div className='btnWrapper'>
            {renderButtons()}
          </div>
        </ChatbotWrapper>
      </WholeWraper>
    </>    
  );
}

export default Chatbot;
