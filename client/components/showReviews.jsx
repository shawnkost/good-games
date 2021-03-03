import React from 'react';
import ShowMoreText from 'react-show-more-text';

export default function ShowReviews(props) {
  const reviews = props.reviews;
  const allReviews = reviews.map((review, index) => {
    return (
      <div className="pl-3 pl-md-5 pr-3 pr-md-5" key={index}>
        <div className="font-22 font-Yeseva text-white review-username">
          {review.username}
        </div>
        <ShowMoreText
          lines={5}
          more="Show more"
          less="Show less"
          className="pl-2 pt-2 mb-4 font-18 font-Josefin review-card text-white"
          anchorClass="my-anchor-css-class"
          expanded={false}
          key={index}
        >
          <div>{review.details}</div>
        </ShowMoreText>
      </div>
    );
  });
  return allReviews;
}
