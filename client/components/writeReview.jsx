import React from 'react';

export default function WriteReview(props) {
  return (
    <div className="review-container">
      <form>
        <label
          htmlFor="review"
          className="d-block pl-3 text-white write-review"
        >
          Write a review
        </label>
        <textarea
          id="review"
          name="review"
          className="ml-3 text-white review-text-area"
        ></textarea>
        <div className="text-right pr-3 button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
