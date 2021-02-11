import React from 'react';

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitForm(this.state.textAreaValue);
    this.setState({
      textAreaValue: ''
    });
  }

  render() {
    return (
      <div className="mb-5 review-container">
        <form onSubmit={this.handleSubmit}>
          <label
            htmlFor="review"
            className="d-block pl-3 text-white font-24 font-Yeseva write-review"
          >
            Write a review
          </label>
          <textarea
            id="review"
            name="review"
            className="ml-3 text-white font-24 font-Josefin review-text-area"
            value={this.state.textAreaValue}
            onChange={this.handleChange}
          ></textarea>
          <div className="text-right pr-3 font-Yeseva button">
            <button type="submit" className="font-18 text-white review-button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
