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
        <div className="container text-center">
          <div className="push-text-down"></div>
          <a href="#">
            <div className="mb-5 text-white text-center font-32 font-Yeseva profile-text">
              GoodGames
            </div>
          </a>
          <form onSubmit={this.handleSignUp}>
            <div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="mb-3 profile-inputs username-sign-up"
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="mb-3 profile-inputs email"
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="mb-3 profile-inputs password"
                onChange={this.handleChange}
              ></input>
            </div>
            <button className="text-white profile-buttons profile-button3 profile-sign-up cursor-pointer">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
