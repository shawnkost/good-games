import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function WriteReview(props) {
  const [textArea, setTextArea] = useState('');

  const handleChange = event => {
    setTextArea(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (props.user) {
      props.submitForm(textArea);
      setTextArea('');
      return;
    }
    toast.error('You must be signed in to leave a review');
  };

  return (
    <div className="mb-5 review-container">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="review"
          className="d-block pl-3 pl-md-5 text-white font-24 font-Yeseva write-review"
        >
          Write a review
        </label>
        <textarea
          id="review"
          name="review"
          className="ml-3 ml-md-5 mr-md-5 text-white font-24 font-Josefin review-text-area"
          value={textArea}
          onChange={handleChange}
          required
        ></textarea>
        <div className="text-right pr-3 pr-md-5 font-Yeseva review-submit">
          <button
            type="submit"
            className="font-18 text-white review-button cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
