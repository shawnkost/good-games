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

  handleSubmit(event, form) {
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
      .catch(err =>
        console.error(
          'Oh well, you failed. Here some thoughts on the error that occurred:',
          err
        )
      );
    this.setState({
      message: '',
      name: '',
      email: ''
    });
  }

  render() {
    return (
      <form className="pl-3 pl-md-5 pr-3 pr-md-5">
        <h4 className="text-white font-Yeseva contact-me">Contact Me!</h4>
        <div className="font-18 font-Josefin">
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            placeholder="Your Name"
            className="contact-form-name"
            required
          />
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            placeholder="Your Email"
            className="contact-form-email"
            required
          />
          <textarea
            name="message"
            onChange={this.handleChange}
            placeholder="Send some feedback!"
            required
            value={this.state.message}
            className="contact-form-message"
            style={{ width: '100%', height: '150px' }}
          />
        </div>
        <div className="text-right">
          <input
            type="button"
            value="Submit"
            className="review-button text-white font-Yeseva cursor-pointer"
            onClick={this.handleSubmit}
          />
        </div>
      </form>
    );
  }
}
