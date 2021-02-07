import React from 'react';
import ShowMoreText from 'react-show-more-text';

export default function ShowReviews(props) {
  const reviews = props.reviews;
  const allReviews = reviews.map((review, index) => {
    return (
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="pl-3 mb-4 text-white"
        anchorClass="my-anchor-css-class"
        expanded={false}
        width={280}
        key={index}
      >
        <div>
          {review.details}
        </div>
      </ShowMoreText>
    );
  });
  return allReviews;
}
