import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, addReviewList } from '../feature/review/reviewSlice';
import StarRatings from 'react-star-ratings';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewWrapper = styled.div`
  .review-write {
    display: flex;
    flex-direction: column;
  }

  button {
    border: none;
    color: white;
    background-color: #C8E4A7;
    text-align: center;
    width: 3rem;
  }

  textarea{
    resize: none;
  }
`;


function ReviewPage(props) {
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0);
  const ratingColor = '#C8E4A7'; // 별점 색깔
  const reviewList = useSelector(addReviewList);
  

  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  

  const handleAddReview = () => {
    // 리뷰 데이터 생성
    const reviewData = {
      id: movieId,
      rating,
      content: reviewContent,
    };
    dispatch(addReview(reviewData));
    setRating(0);
    setReviewContent('');
    navigate(`/movie-review/${movieId}`);
  };

  console.log(reviewList.find(review => review.id === movieId));

  return (
    <ReviewWrapper>
      <div className='review-write'>
        <h2></h2>
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
        <button type='submit' onClick={handleAddReview}>확인</button>
      </div>
      <div className='review-list'>
      {reviewList.filter(review => review.id === movieId).map((review, index) => (
          <div className='review-item' key={index}>
            {review.content}
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