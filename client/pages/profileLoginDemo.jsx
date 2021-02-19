import React from 'react';
import Redirect from '../components/redirect';
import ProfileBackground from '../images/profile-background.png';

export default class ProfileLoginDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@goodgames.com',
      password: 'password1'
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => this.props.handleSignIn(result));
  }

  render() {
    if (this.props.user) {
      return <Redirect to="profile-home" />;
    }

    return (
      <div
        className="profile-login-container"
        style={{
          backgroundImage: `url(${ProfileBackground})`,
          backgroundSize: 'cover'
        }}
      >
        <a href="#">
          <div className="text-white text-center font-32 font-Yeseva profile-text">
            GoodGames
          </div>
        </a>
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            name="email"
            className="profile-inputs email"
            readOnly="readonly"
            value={this.state.email}
          ></input>
          <input
            type="password"
            name="password"
            className="profile-inputs password"
            readOnly="readonly"
            value={this.state.password}
          ></input>
          <button className="text-white profile-buttons profile-button3 cursor-pointer">
            Login
          </button>
        </form>
      </div>
    );
  }
}
