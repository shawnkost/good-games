import React from 'react';
import ProfileBackground from '../images/profile-background.png';
import Redirect from '../components/redirect';

export default function Profile(props) {

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
          <div className="mb-5 text-white font-32 font-Yeseva profile-text">
            GoodGames
          </div>
        </a>
        <div className="input-container mb-3">
          <a href="#profile-sign-up">
            <button className="profile-buttons cursor-pointer text-white">
              Create Account
            </button>
          </a>
        </div>
        <div className="input-container mb-3">
          <a href="#profile-login">
            <button className="profile-buttons cursor-pointer text-white">
              Login
            </button>
          </a>
        </div>
        <div className="input-container mb-3">
          <a href="#profile-login-demo">
            <button className="profile-buttons demo-user cursor-pointer text-white">
              Demo User
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
