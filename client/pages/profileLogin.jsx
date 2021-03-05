import React, { useState } from 'react';
import Redirect from '../components/redirect';
import ProfileBackground from '../images/profile-background.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function ProfileLogin(props) {
  const [state, setState] = useState({ email: '', password: '' });
  const email = state.email;
  const password = state.password;

  const handleError = () => {
    toast.error('Login failed');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLogin = async event => {
    event.preventDefault();
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    });
    if (response.status !== 401) {
      const result = await response.json();
      props.handleSignIn(result);
    } else {
      handleError();
    }
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
              placeholder="Email"
              name="email"
              className="mb-3 profile-inputs email"
              onChange={handleChange}
              value={email}
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
