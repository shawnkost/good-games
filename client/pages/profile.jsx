import React from 'react';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="profile-container">
        <div className="text-white text-center profile-text">GG</div>
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
}
