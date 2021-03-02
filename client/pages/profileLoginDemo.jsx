import React, { useState } from 'react';
import Redirect from '../components/redirect';
import ProfileBackground from '../images/profile-background.png';

export default function ProfileLoginDemo(props) {
  const [state] = useState({ email: 'demo@goodgames.com', password: 'password1' });
  const email = state.email;
  const password = state.password;

  const handleLogin = event => {
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(result => {
        props.handleSignIn(result);
      });
  };

  if (props.user) {
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
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              name="email"
              className="mb-3 profile-inputs email"
              readOnly="readonly"
              value={email}
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="mb-3 profile-inputs password"
              readOnly="readonly"
              value={password}
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
