import React, { useState } from 'react';
import ProfileBackground from '../images/profile-background.png';
import axios from 'axios';

export default function ProfileSignUp(props) {
  const [state, setState] = useState({ username: '', email: '', password: '' });
  const username = state.username;
  const email = state.email;
  const password = state.password;

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSignUp = async event => {
    event.preventDefault();
    await axios({
      method: 'POST',
      url: '/api/auth/sign-up',
      data: state
    });
    window.location.hash = 'profile-login';
  };

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
        <form onSubmit={handleSignUp}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="mb-3 profile-inputs username-sign-up"
              onChange={handleChange}
              value={username}
              required
            ></input>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="mb-3 profile-inputs email"
              onChange={handleChange}
              value={email}
              required
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="mb-3 profile-inputs password"
              onChange={handleChange}
              value={password}
              required
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
