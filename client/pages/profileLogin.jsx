import React from 'react';
import Redirect from '../components/redirect';
import ProfileBackground from '../images/profile-background.png';

export default class ProfileLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLogin(event) {
    event.preventDefault();
    fetch(
      '/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }
    )
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
            placeholder="Email"
            name="email"
            className="profile-inputs email"
            onChange={this.handleChange}
            value={this.state.email}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="profile-inputs password"
            onChange={this.handleChange}
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
