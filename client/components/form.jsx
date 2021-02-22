import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', name: '', email: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const templateId = 'contact_form';
    this.sendFeedback(templateId, {
      message_html: this.state.message,
      from_name: this.state.name,
      reply_to: this.state.email
    });
  }

  sendFeedback(templateId, variables) {
    window.emailjs
      .send('service_g4tq3tj', 'contact_form', variables)
      .then(res => {
        alert('Email successfully sent!');
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          'Oh well, you failed. Here some thoughts on the error that occurred:',
          err
        )
      );
  }

  render() {
    return (
      <form className="test-mailing">
        <h1 className="text-white">Contact Me!</h1>
        <div>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            id="test-mailing"
            name="message"
            onChange={this.handleChange}
            placeholder="Send some feedback!"
            required
            value={this.state.feedback}
            style={{ width: '100%', height: '150px' }}
          />
        </div>
        <input
          type="button"
          value="Submit"
          className="btn btn--submit"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}
