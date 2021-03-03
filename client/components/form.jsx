import React, { useState } from 'react';

export default function Form(props) {
  const [state, setState] = useState({ message: '', name: '', email: '' });
  const message = state.message;
  const name = state.name;
  const email = state.email;

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = form => {
    event.preventDefault();
    const templateId = 'contact_form';
    sendFeedback(templateId, {
      message_html: { message },
      from_name: { name },
      reply_to: { email }
    });
  };

  const sendFeedback = (templateId, variables) => {
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
    setState({ message: '', name: '', email: '' });
  };

  return (
    <form className="pl-3 pl-md-5 pr-3 pr-md-5" onSubmit={handleSubmit}>
      <h4 className="text-white font-Yeseva contact-me">Contact Me!</h4>
      <div className="font-18 font-Josefin">
        <input
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          placeholder="Your Name"
          className="contact-form-name"
          required="required"
        />
        <input
          type="email"
          value={email}
          name="email"
          onChange={handleChange}
          placeholder="Your Email"
          className="contact-form-email"
          required="required"
        />
        <textarea
          name="message"
          onChange={handleChange}
          placeholder="Send some feedback!"
          value={message}
          className="contact-form-message"
          style={{ width: '100%', height: '150px' }}
          required="required"
        />
      </div>
      <div className="text-right">
        <input
          type="submit"
          value="Submit"
          className="review-button text-white font-Yeseva cursor-pointer"
        />
      </div>
    </form>
  );
}
