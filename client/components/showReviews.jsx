import React from 'react';
import ShowMoreText from 'react-show-more-text';

export default function ShowReviews(props) {
  const reviews = props.reviews;
  const allReviews = reviews.map((review, index) => {
    return (
      <div className="pl-3 pr-3" key={index}>
        <div className="review-username text-white">{review.username}</div>
        <ShowMoreText
          lines={5}
          more="Show more"
          less="Show less"
          className="pl-2 pt-2 mb-4 review-card text-white"
          anchorClass="my-anchor-css-class"
          expanded={false}
          width={320}
          key={index}
        >
          <div>{review.details}</div>
        </ShowMoreText>
      </div>
    );
  });
  return allReviews;
}
