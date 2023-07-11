import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, addReviewList } from '../feature/review/reviewSlice';
import StarRatings from 'react-star-ratings';
import { useParams } from 'react-router-dom';
import { selectUserName } from '../feature/user/userSlice'; 

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  .review-write {
    display: flex;
    flex-direction: column;
    border-radius: .2rem;
    border: .2rem solid ${props => props.theme.main};
    margin: 2rem auto;
    padding: 1rem;
  }
  .review-write-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.main};

    .review-user {
      width: 48rem;
      text-align: right;
    }
  }
  .review-submit {
    display: flex;
      div {
        flex: 1;
      }
    }
    .review-intro {
      padding: 1rem;
  }

  .warning {
    color: #3b3659;
  }

  button {
    border: none;
    background: none;
    font-weight: bold;
    color: ${props => props.theme.main};
    border: .2rem solid ${props => props.theme.main};
    border-radius: 0.5rem;
    text-align: center;
    padding: .5rem 1.5rem;
    &:hover {
      color: ${props => props.theme.text};
      background-color: ${props => props.theme.main};
    }
  }

  textarea{
    resize: none;
    border: none;
    background: none;
    width: 58rem;
    min-height: 4rem;
    padding: 1rem;
    font-size: 1rem;
    :focus {
      outline: none;
    }
  }
  .review-list {
    width: 60rem;
    margin: 0 auto;
    border-top: .2rem solid ${props => props.theme.main};
    border-bottom: .2rem solid ${props => props.theme.main};
  }
  
  .review-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    min-height: 3rem;
    border-bottom: .1rem solid ${props => props.theme.main};
    h3 {
      font-weight: bold;
    }
    h4 {
      width: 40rem;
      margin-left: 2rem;
    }
  } 
  .review-item:last-child {
    border: none;
  }
  .review-user {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: 1rem;
    }
  }
`;


function ReviewPage(props) {
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0);
  // const [warningMessage, setWarningMessage] = useState(true);
  const [reviewClick, setReviewClick] = useState(false);
  const ratingColor = '#A6D95B'; // 별점 색깔
  const userName = useSelector(selectUserName);
  const reviewList = useSelector(addReviewList);
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const warningMessage = !userName;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  

  const handleAddReview = () => {
    // 리뷰 데이터 생성
    const reviewData = {
      id: movieId,
      userName,
      rating,
      content: reviewContent,
      createAt: new Date()
    };
    if (userName) {
      if (rating !== 0) {
        dispatch(addReview(reviewData));
        setRating(0);
        setReviewContent('');
      }
    } 
  };

  const handleClickReview = () => {
    setReviewClick(true);
  };

  return (
    <ReviewWrapper>
      <div className='review-write'>
        <div className='review-write-top'>
          <StarRatings
            rating={rating}
            starRatedColor={ratingColor}
            starHoverColor={ratingColor}
            changeRating={handleRatingChange}
            numberOfStars={5}
            starDimension='1.4rem'
            starSpacing='.08rem'
          />
          <h2>{rating}</h2>
          <h2 className='review-user'>{userName || 'quest'}</h2>
        </div>
        {
          reviewClick && 
            <textarea
              value={reviewContent}  maxLength={400} onChange={(e) => setReviewContent(e.target.value)} className='cursor-pointer'
              placeholder='권리침해, 욕설, 특정 대상을 비하하는 내용, 청소년에게 유해한 내용 등을 게시한 경우 운영정책과 이용약관 및 관련 법률에 의해 제재될 수 있습니다. 글 작성 시 상대방에 대한 배려와 책임을 담아주세요. 400자 이내'/>
        }
        <div className='review-submit'>
          {
            warningMessage?
              <div className='review-intro'>로그인이 필요합니다.</div> : 
                reviewClick ?
                  <div className='review-intro warning' onClick={handleClickReview}>이 댓글에 대한 법적 책임은 작성자에게 귀속됩니다.</div> :
                  <div className='review-intro cursor-pointer' onClick={handleClickReview}>댓글 입력</div>
          }
          <button type='submit' onClick={handleAddReview} style={{display: reviewClick? 'block' : 'none'}}>확인</button>
        </div>
      </div>
      
      <div className='review-list'>
      {reviewList.filter(review => review.id === movieId).reverse().map((review, index) => (
          <div className='review-item' key={index}>
            <div className='review-user'>
              <h3>{review.userName}</h3>
              {new Date(review.createAt).toLocaleTimeString().slice(0,7)}
            </div>
            <h4>{review.content}</h4>
            <StarRatings
              rating={review.rating}
              starRatedColor={ratingColor}
              starHoverColor={ratingColor}
              numberOfStars={5}
              starDimension='1.4rem'
              starSpacing='.08rem'
              name={`rating-${index}`}
            />
            {review.rating}
          </div>
        ))}
      </div>
    </ReviewWrapper>
  );
}

export default ReviewPage;