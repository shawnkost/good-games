import React from 'react';
import ProfileBackground from '../images/profile-background.png';

export default function Profile() {
  return (
    <div
      className="profile-login-container"
      style={{
        backgroundImage: `url(${ProfileBackground})`
      }}
    >
      <a href="#">
        <div className="text-white text-center profile-text">GoodGames</div>
      </a>
      <div className="input-container">
        <a href="#profile-sign-up">
          <button className="profile-button1">Create Account</button>
        </a>
      </div>
      <div className="input-container">
        <a href="#profile-login">
          <button className="profile-button2">Login</button>
        </a>
      </div>
    </div>
  );
}
