import React from 'react';
import ProfileBackground from '../images/profile-background.png';

export default class ProfileSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSignUp(event) {
    event.preventDefault();
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        window.location.hash = 'profile-login';
      });
  }

  render() {
    return (
      <div
        className="profile-login-container"
        style={{
          backgroundImage: `url(${ProfileBackground})`,
          backgroundSize: 'cover'
        }}
      >
        <a href="#">
          <div className="text-white text-center profile-text">GoodGames</div>
        </a>
        <form onSubmit={this.handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="username-sign-up"
            onChange={this.handleChange}
          ></input>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            className="email"
            onChange={this.handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="password"
            onChange={this.handleChange}
          ></input>
          <button className="text-white profile-button3">Sign Up</button>
        </form>
      </div>
    );
  }
}
