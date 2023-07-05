import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'; //Editor설치
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; //Editor설치
import ReactHtmlParser from "html-react-parser"; //모듈설치 
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { json } from "react-router-dom";


const Commnuity = styled.div`

   text-align: center;
`;

const Commnuitycheck = styled.div`
   margin: 0 auto;
   width: 80%;
   border: 1px solid gray;
   padding: 10px 0 30px 0;
   margin-bottom : 50px;
`;

const CommnuityText = styled.div`
   position: absolute;
   right: 0;
   width: 50%;
   margin: 0 auto;

   input{
      width: 80%;
      height: 40px;
      margin: 10px;
   }
   textarea{
      width: 80%;
      min-height: 500px;
   }

   .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
      min-height: 500px;
   }
`;

const CommnuityButton = styled.button`
   width: 200px;
   height: 50px;
   margin-top: 10px;
   font-size: 20px;
   padding: 8px 16px;
   border: 1px;
   border-radius: 8px;
   cursor: pointer;
`;



// const CommnuityChat = styled.div`
//    margin: 0 auto;
//    width: 80%;
//    border: 1px solid #333;
//    padding: 10px 0 30px 0;
//    border-radius: 5px;
//    margin-bottom : 50px;
// `;


// const CommunityWrapper = styled.div`
//    position: relative;
//    width: 100%;
//    height: 700px;
//    margin: 0 auto;
//    color: #000;
//       .title{
//          margin-top: 20px;
//          text-align: center;
//          color: #000;
//          font-size: 1.5rem;
//          font-weight: 700;
//       }
// `;

// const CommnuityText = styled.div`
//    display: flex;
//    position: absolute;
//    width: 80%;
//    height: 500px;
//    left: 20%;

//    input{
//       position: relative;
//       top: 50px;
//       width: 80%;
//       height: 40px;
//    }

//    textarea{
//       width: 80%;
//       position: absolute;
//       top: 100px;
//       height: ${props => props.height && props.height + 'px'};
//       padding: 16px;
//       font-size: 16px;
//       line-height: 20px;
//    }
// `;

// const StyledButton = styled.button`
//    position: absolute;
//    padding: 8px 16px;
//    top: 7px;
//    right: 20%;
//    font-size: 16px;
//    border: 1px;
//    border-radius: 8px;
//    cursor: pointer;
// `;

function Community(props) {
   const [communityContent, setCommunityContent] = useState({
      title: '',
      content: ''
   });
   
   const [viewContent, setViewContent] = useState([]);

   // const [viewContent, setViewContent] = useState([]);  
   
   // axios사용해서
   // 버튼 onClick할 
   // const 
   // title: communityContent.title
   // content: communityContent.title
   
   const getValue = (e) => {
      const {name, value} = e.target;
      setCommunityContent({
         ...communityContent,
         [name]: value
      })
      console.log(communityContent); //객체
   }
   
   // const {height, value, title, onClick, communitytext} = props;
   // useEffect(() => {
   //    const dbCommunity = JSON.parse(localStorage.getItem('communitytext')) || [];
   //    setCommunityText(dbCommunity);
   // }, []);

   // useEffect(() => {
   //    localStorage.setItem('communitytext', JSON.stringify(communityText))
   // }, [communityText]);
   // const nextId = useRef(4);
   // const handleInsert = useCallback((content) => {
   //    const text = {
   //       title: uuidv4(),
   //       content,
   //    };
   //    const copyCommunity = [...communityText];
   //    copyCommunity.push(text);
   //    setCommunityText(communityText);
   //    nextId.current += 1;
   // }, [communityText]);

   return(
      <Commnuity>
         <h1>커뮤니티</h1>
         <Commnuitycheck>
            {viewContent.map((text) => {
               return(
                  <div>
                     <h2>{text.title}</h2>
                     <div>{ReactHtmlParser(text.content)}</div>
                  </div>
               )
            })}
         </Commnuitycheck>
         <CommnuityText>
            <input type='text' placeholder='제목'
               // onChange={(e, editor) => {
               //    const data = editor.getValue();
               //    console.log({ e, editor, data }); //Editor is ready to use
               //    setCommunityContent({
               //       ...communityContent,
               //       content: data
               //    })
               //    console.log(communityContent);
               // }}
               />
            <CKEditor 
               editor={ClassicEditor}
               data="<p>Hello from CKEditor 5!</p>"            
               onReady={ editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log( 'Editor is ready to use!', editor );
               } }
               onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  console.log( { event, editor, data } );
               } }
               onBlur={ ( event, editor ) => {
                  console.log( 'Blur.', editor );
               } }
               onFocus={ ( event, editor ) => {
                  console.log( 'Focus.', editor );
               } }

               />
         </CommnuityText>
         <CommnuityButton
            onClick={() => {
               setViewContent(viewContent.concat({...communityContent}))
            }}
         >등록하기</CommnuityButton>
      </Commnuity>

      

   )
}
export default Community;