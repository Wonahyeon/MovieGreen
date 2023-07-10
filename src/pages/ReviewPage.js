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
  .review-write {
    display: flex;
    flex-direction: column;
    border-radius: .2rem;
    border: .2rem solid ${props => props.theme.main};
    margin: 2rem auto;
    padding: 1rem;
  }
  .review-submit {
    display: flex;
      div {
        flex: 1;
      }
  }

  button {
    border: none;
    color: white;
    background-color: ${props => props.theme.main};
    text-align: center;
    width: 3rem;
  }

  textarea{
    resize: none;
    border: none;
    background: none;
    width: 58rem;
    min-height: 3rem;
    :focus {
      outline: none;
    }
  }
  .review-list {
    width: fit-content;
    margin: 0 auto;
  }

  .review-item {
    display: flex;
    padding: 1rem;
    margin: 1rem;
    border-radius: 1rem;
    border: .2rem solid ${props => props.theme.main};
    h3 {
      font-weight: bold;
    }
    h4 {
      width: 44rem;
      margin-left: 1rem;
    }
  }
`;


function ReviewPage(props) {
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0);
  const [warningMessage, setWarningMessage] = useState(false);
  const ratingColor = '#C8E4A7'; // 별점 색깔
  const userName = useSelector(selectUserName);
  const reviewList = useSelector(addReviewList);
  const { movieId } = useParams();
  const dispatch = useDispatch();

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
    };
    if (userName) {
      dispatch(addReview(reviewData));
      setRating(0);
      setReviewContent('');
    } else {
      setWarningMessage(true);
    }
  };

  return (
    <ReviewWrapper>
      <div className='review-write'>
        <StarRatings
          rating={rating}
          starRatedColor={ratingColor}
          starHoverColor={ratingColor}
          changeRating={handleRatingChange}
          numberOfStars={5}
          starDimension='1.4rem'
          starSpacing='.08rem'
          name='rating'
        />
        <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)}/>
        <div className='review-submit'>
          <div style = {{visibility: warningMessage? "visible" : "hidden"}}>로그인이 필요합니다.</div>
          <button type='submit' onClick={handleAddReview}>확인</button>
        </div>
      </div>
      
      <div className='review-list'>
      {reviewList.filter(review => review.id === movieId).map((review, index) => (
          <div className='review-item' key={index}>
            <h3>{review.userName}</h3>
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
          </div>
        ))}
      </div>
    </ReviewWrapper>
  );
}

export default ReviewPage;