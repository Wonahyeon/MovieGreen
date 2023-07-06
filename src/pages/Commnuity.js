import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'; //Editor설치
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; //Editor설치
import ReactHtmlParser from "html-react-parser"; //모듈설치 
import axios from "axios";

const StyledCommnuity = styled.div`
   height: 800px; //footer를 내리기 위한 height 
   h1{
      text-align: center;
      font-weight: 700;
      margin-top: 10px;
      font-size: 25px;
   }
`;

const CommunityWrapper = styled.div`
   position: relative;
   top: 40px;
   display: flex;
`;

const Commnuitycheck = styled.div` //등록되는 곳
   overflow-y: scroll;
   & ::-webkit-scrollbar {
      height: 10px;
   }
   height: 490px;
   position: absolute;
   left: 30px;
   width: 48%;
   border: 1px solid #dcdcde;
   padding: 10px 0 30px 0;

   .date{
      font-weight: bold;
   }
`;
const CommnuityText = styled.div` //내용 입력창 
   position: absolute;
   right: 30px;
   width: 48%;
   margin: 0 auto;

   input{ //제목 입력창
      width: 100%;
      height: 50px;
   }

   button{
      width: 100px;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 16px;
      border: 1px solid #dcdcde;
      cursor: pointer;
   }
   .ck.ck-editor__editable:not(.ck-editor__nested-editable) { //설치 Editor 스타일
      min-height: 400px;
   }
   `;


// 등록 날짜 제목 오른쪽 또는 제목 상단 스타일 지정
// 내용 등록 길이 제한(자세히 보기) - 에러발생
// 로그인 시 커뮤니티 작성 가능하게 

function Community(props) {
   // const {viewtext : {data}} = props;
   const [communityContent, setCommunityContent] = useState({
      title: '',
      content: '',
   });
   const [viewContent, setViewContent] = useState([]); //내용 보여줄 state
   // const [Message, setMessage] = useState(false);
   // const [value, setValue] = useState('');
   const [isview, setIsview] = useState(false);

   const date = new Date();
   const datecurrent = date.getFullYear() + "-" + (date.getMonth() +1) + "-"+ date.getDate();  

   const getValue = (e) => {
      const {name, value} = e.target;
      setCommunityContent({
         ...communityContent,
         [name]: value
      })
      console.log(communityContent); //객체
   }
   
   const handleButton = async (e) => {
      await axios.get(`http://localhost:3000`,
      {
         title: communityContent.title,
         content: communityContent.content
      })
      .then(() => {
         // alert('등록되었습니다.');
      })
      setViewContent(viewContent.concat({...communityContent}))
      e.preventDefault();
   }

   const handleIsView = () => {
      setIsview(!isview);
   }

   // const handleInput = useCallback(() => {
   //    const date = new Date();
   //    const datecurrent = date.getFullYear() + "-" + (date.getMonth() +1) + "-"+ date.getDate();  
   //    const viewtext = {
   //       data: datecurrent
   //    }
   //    const copyDate = [...viewContent];
   //    copyDate.push(viewtext);
   //    setViewContent(copyDate);
   // }, [viewContent]);

   return(
      <StyledCommnuity>
         <h1>커뮤니티</h1>
         <CommunityWrapper>
            <Commnuitycheck>
               {viewContent.map((text) => {
                  return(
                     <div>
                        <h1>{text.title}</h1>
                        <div>{ReactHtmlParser(text.content)}</div>
                        <div>
                           {/* {ReactHtmlParser(text.content).length <= 50 || isview
                           ? ReactHtmlParser(text.content).length 
                           : ReactHtmlParser(text.content).length.slice(0, 30) + '...'}  */}
                           {/* slice 타입에러 발생함 */}
                           {/* TypeError: Cannot read properties of undefined (reading 'slice') */}
                        </div>
                        
                        {/* {ReactHtmlParser(text.content).length > 10 && (
                           <div onClick={handleIsView}>{isview ? '보기' : '자세히 보기'}</div>
                        )} */}

                        <div className="date">{datecurrent}</div>
                        <hr />
                        </div>
                  )
               })}
            </Commnuitycheck>
            <CommnuityText>
               <input type='text' placeholder='제목' name="title"
                  onChange={getValue}
               />
               <CKEditor // Editor설치
                  editor={ClassicEditor}
                  data="<p></p>"            
                  onReady={ editor => {
                     // You can store the "editor" and use when it is needed.
                     console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                     const data = editor.getData();
                     console.log( { event, editor, data } );
                     setCommunityContent({
                        ...communityContent,
                        content: data
                     })
                  } }
                  onBlur={ ( event, editor ) => { //title
                     console.log( 'Blur.', editor );
                  } }
                  onFocus={ ( event, editor ) => { //content
                     console.log( 'Focus.', editor );
                  } }
                  />
               <button onClick={handleButton}>등록하기</button>
            </CommnuityText>            
         </CommunityWrapper>
      </StyledCommnuity>
   )
}
export default Community;