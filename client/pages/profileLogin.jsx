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
      .then(result => {
        this.props.handleSignIn(result);
      });
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
        <div className="container text-center">
          <div className="push-text-down"></div>
          <a href="#">
            <div className="mb-5 text-white text-center font-32 font-Yeseva profile-text">
              GoodGames
            </div>
          </a>
          <form onSubmit={this.handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="mb-3 profile-inputs email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="mb-3 profile-inputs password"
                onChange={this.handleChange}
                value={this.state.password}
              ></input>
            </div>
            <button className="text-white profile-buttons cursor-pointer">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
