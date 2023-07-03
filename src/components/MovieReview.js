import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import { addReviewList, selectedReviewList } from '../feature/review/reviewSlice';

const ReviewWrapper = styled.div`
  .title {
    display: flex;
  }
  h2 {
    flex: 1;
  }
`;

function MovieReview(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const reviewList = useSelector(addReviewList);
  const ratingColor = '#C8E4A7';

  return (
    <ReviewWrapper>
      <div className='title'>
        <h2>리뷰</h2>
        <span onClick={() => navigate(`/movie-review/${movieId}`)}>더보기</span>
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

export default MovieReview;