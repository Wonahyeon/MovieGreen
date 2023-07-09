import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'; //Editor설치
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; //Editor설치
import ReactHtmlParser from "html-react-parser"; //모듈설치 
import axios from "axios";
import { MdDelete } from "react-icons/md";

const StyledCommnuity = styled.div`
   height: 700px; //footer를 내리기 위한 height 
   h1{
      text-align: center;
      font-weight: 700;
      margin-top: 30px;
      font-size: 25px;
   }
`;

const CommunityWrapper = styled.div`
   position: relative;
   top: 60px;
   display: flex;
`;

const Commnuitycheck = styled.div` //등록되는 곳
   overflow-x: hidden;
   overflow-y: scroll;
   & ::-webkit-scrollbar {
      height: 10px;
   }
   height: 590px;
   position: absolute;
   left: 30px;
   width: 48%;
   border: 1px solid #dcdcde;
   padding: 10px 0 30px 0;

   .date{
      margin-left: 87%;
      font-weight: bold;
   }

   button{
      /* position: absolute; */
      right: 0;
      top: 13%;
      right: 15px;
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
      min-height: 500px;
   }
   `;


// 내용 등록 길이 제한(자세히 보기) - 에러발생 - 지움
// 로그인 시 커뮤니티 작성 가능하게 
// 삭제 기능 - 내가 누른 거 삭제X, 밑에서부터 삭제가 됨
// 삭제 오류해결하기

function Community(props) {
   const [communityContent, setCommunityContent] = useState({
      title: '',
      content: '',
   });
   const [viewContent, setViewContent] = useState([]); //내용 보여줄 state
   const date = new Date(); //날짜
   const datecurrent = date.getFullYear() + "-" + (date.getMonth() +1) + "-"+ date.getDate();  


   // 댓글 
   const [comment, setComment] = useState('');
   const [listComments, setListComments] = useState([]);
   const [isValid, setIsValid] = useState(false);

   const post  =(e) => {
      const copylistComments = [...listComments];
      copylistComments.push(comment)
      setListComments(copylistComments)
      setComment('');
   }


   const getValue = (e) => {
      const {name, value} = e.target;
      setCommunityContent({
         ...communityContent,
         [name]: value
      })
      console.log(communityContent); //객체
   }
   
   // 등록
   const handleButton = async (e) => {
      e.preventDefault();
      await axios.get(`http://localhost:3000`,
      {
         title: communityContent.title,
         content: communityContent.content
      })
      .then(() => {
         // alert('등록되었습니다.');
      })
      setViewContent(viewContent.concat({...communityContent}))
   }

   //삭제
   const handleDelete = useCallback((id) => {
      if (window.confirm('삭제하시겠습니까?')) {
         const copyContent = [...viewContent];
         const targetIndex = viewContent.findIndex((data) => data.id === id);
         copyContent.splice(targetIndex, 1);
         setViewContent(copyContent);
         // const copyContent = [...viewContent];
         // copyContent.splice(id, 1)
         // setViewContent(copyContent);
         // setViewContent(viewContent => viewContent.filter((data) => data.id !== id));
      }
   }, [viewContent])


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
                        <div className="date">{datecurrent}</div>
                        <button viewContent={viewContent} onClick={handleDelete}>삭제</button>

                     
                        <input type="text" placeholder="댓글 달기" value={comment}
                           onChange={(e) => {setComment(e.target.value);}}
                           onKeyUp={(e) => {
                              e.target.value.length > 0
                              ? setIsValid(true) : setIsValid(false)
                           }}
                        />
                        <button type="button"
                           onClick={post}
                           disabled={isValid? false : true}
                        >등록</button>
                        {listComments.map((commentArr, index) => {
                           return(
                              <div key={index} userComment ={commentArr}>
                                 <p>{comment}</p>
                              </div>

                           )
                        })}

                        
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
                  data=''            
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