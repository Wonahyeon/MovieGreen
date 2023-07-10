import styled from "styled-components";
import { useCallback, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from "html-react-parser";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";

const StyledCommunity = styled.div`
   height: 700px;
   h1 {
      text-align: center;
      font-weight: 700;
      margin-top: 25px;
      font-size: 25px;
   }
`;

const CommunityWrapper = styled.div`
   position: relative;
   top: 30px;
   display: flex;
`;

const CommunityCheck = styled.div`
   background: white;
   overflow-x: hidden;
   overflow-y: scroll;
   & ::-webkit-scrollbar {
      height: 10px;
   }
   height: 750px;
   position: absolute;
   left: 30px;
   width: 48%;
   border: 1px solid #dcdcde;
   padding: 10px 0 30px 0;

   .date {
      position: absolute;
      right: 40px;
      font-weight: bold;
   }

   .deletebutton {
      color: #F26052;
      position: absolute;
      font-size: 25px;
      right: 15px;
   } 

   .comment{
      width: 100%;
      height: 50px;
      position: relative;
      border: 1px solid rgb(200, 228, 122);
      border-radius: 0.5rem;
   }
   .comment + .comment {
      margin-top: 10px;
   }

   .commenttext{
      word-break: keep-all;
   }

   .commentbtn{
      color: rgb(200, 228, 122);
      border: 1px solid rgb(200, 228, 122);
      border-radius: 0.5rem;
      cursor: pointer;
   }
`;

const CommunityText = styled.div`
   position: absolute;
   right: 30px;
   width: 48%;
   margin: 0 auto;

   input {
      width: 100%;
      height: 60px;
   }

   button {
      color: rgb(200, 228, 122);
      border: 0.2rem solid rgb(200, 228, 122);
      padding: 8px 16px;
      border-radius: 0.5rem;
      font-size: 16px;
      cursor: pointer;
   }

   .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
      min-height: 648px;
   }
`;

// 댓글 시간 map함수로 댓글 - 같은 시간 표기됨
// 게시판 나열 - 최신정렬, 오래된 정렬 해보기

function Community(props) {
   const [communityContent, setCommunityContent] = useState({
      title: "",
      content: "",
   });
   const [viewContent, setViewContent] = useState([]);
   const [comment, setComment] = useState({});
   const [isValid, setIsValid] = useState(false);

   const date = new Date();
   const currentdate = date.getFullYear() + "-" + (date.getMonth() +1) + "-"+ date.getDate();
   const commentdate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;


   const getValue = (e) => {
      const { name, value } = e.target;
      setCommunityContent({
      ...communityContent,
      [name]: value,
      });
   };

   const handleButton = async (e) => {
      e.preventDefault();

      const newPost = {
      id: Date.now(),
      title: communityContent.title,
      content: communityContent.content,
      comments: [],
      };

      await axios.get("http://localhost:3000", newPost);

      setViewContent([newPost, ...viewContent]);
      setCommunityContent({ title: "", content: ""});
   };

   const handleComment = useCallback((postId, commentText) => {
      if (commentText) {
      const updatedViewContent = viewContent.map((post) => {
         if (post.id === postId) {
            return {
            ...post,
            comments: [commentText, ...post.comments],
            };
         }
         return post;
      });
      setViewContent(updatedViewContent);
      setComment({
         ...comment,
         [postId]: "",
      });

      }
   }, [viewContent, comment]);

   const handleDelete = useCallback((id) => {
      if (window.confirm("삭제하시겠습니까?")) {
      setViewContent((prevContent) =>
         prevContent.filter((data) => data.id !== id)
      );
      }
   }, [viewContent]);

   return (
      <StyledCommunity>
      <h1>커뮤니티</h1>
      <CommunityWrapper>
         <CommunityCheck>
            {viewContent.map((text) => (
            <div key={text.id}>
               <h1>{text.title}</h1>
               <div>{ReactHtmlParser(text.content)}</div>
               <div className="date">{currentdate}</div>
               
               <MdDeleteOutline onClick={() => handleDelete(text.id)} className="deletebutton">삭제</MdDeleteOutline>
               <br />

               <input
                  type="text"
                  placeholder="댓글 달기"
                  value={comment[text.id] || ""}
                  onChange={(e) => {
                  setComment({
                     ...comment,
                     [text.id]: e.target.value,
                  });
                  }}
                  onKeyUp={(e) => {
                  e.target.value.length > 0
                     ? setIsValid(true)
                     : setIsValid(false);
                  }}
               />
               <button className="commentbtn"
                  type="button"
                  onClick={() => handleComment(text.id, comment[text.id])}
                  disabled={!isValid}
               >
                  등록
               </button>

               {text.comments.map((commentText, index) => (
                  <div className="comment" key={index}  >
                     <p className="commenttext">{commentText}</p>
                     <p>{commentdate}</p>
                  </div>
               ))}

               <hr />

            </div>
            ))}
         </CommunityCheck>
         <CommunityText>
            <input
            type="text"
            placeholder="제목"
            name="title"
            value={communityContent.title}
            onChange={getValue}
            />
            <CKEditor
            editor={ClassicEditor}
            data={communityContent.content}
            onReady={(editor) => {
               console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
               const data = editor.getData();
               setCommunityContent({
                  ...communityContent,
                  content: data,
               });
            }}
            />
            <button
            onClick={handleButton}
            disabled={!communityContent.title || !communityContent.content}
            >
            등록하기
         </button>
         </CommunityText>
      </CommunityWrapper>
      </StyledCommunity>
   );
}

export default Community;
