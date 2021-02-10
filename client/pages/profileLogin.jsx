import React from 'react';
import ProfileBackground from '../images/profile-background.png';

export default function ProfileLogin() {
  return (
    <div
      className="profile-login-container"
      style={{
        backgroundImage:
          `url(${ProfileBackground})`
      }}
    >
      <div className="text-white text-center profile-text">GoodGames</div>
      <input
        type="text"
        placeholder="Email"
        className="profile-button1"
      ></input>
      <input
        type="password"
        placeholder="Password"
        className="profile-button2"
      ></input>
      <button className="text-white profile-button3">Login</button>
    </div>
  );
}
