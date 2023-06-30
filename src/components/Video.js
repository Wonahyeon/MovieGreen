import React from 'react';
import styled from 'styled-components';
import Youtube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const StyledVideoWrapper = styled.div`
  width: 100%;
`;

const StyledSwiper = styled(Swiper)`
  height: 700px;
`;

let opts;
function Video(props) {
  // 동영상 상태 반환 /-1: 시작X, 0: 종료, 1: 재생 중, 2: 일시정지, 3: 버퍼링, 5: 동영상 신호
  const handlegetPlayerState =(e) => {
    e.target.getPlayerState();
  }

  opts = {
    width: '100%',
    height: '650',
    playerVars: {
      autoplay: true, //자동 재생
      loop: true,
    },
  };

  

  return (
    <StyledVideoWrapper>
      <StyledSwiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={true}
        autoplay={{
          delay: 7000,
        }}
        slidesPerView={1} 
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <Youtube videoId='7pB7DPBqqvk' opts={opts} ongetPlayerState={handlegetPlayerState}/>
        </SwiperSlide>
        <SwiperSlide>
          <Youtube videoId='CSOb8gia_mg' opts={opts} ongetPlayerState={handlegetPlayerState}/>
        </SwiperSlide>
        <SwiperSlide>
          <Youtube videoId='4p7WZmM3Bk8' opts={opts} ongetPlayerState={handlegetPlayerState}/>
        </SwiperSlide>
        <SwiperSlide>
          <Youtube videoId='aa0WjdSYdCk' opts={opts} ongetPlayerState={handlegetPlayerState}/>
        </SwiperSlide>
        <SwiperSlide>
          <Youtube videoId='4jhz2NU-24Q' opts={opts}/>
        </SwiperSlide>
      </StyledSwiper>
    </StyledVideoWrapper>
    );
}

export default Video;