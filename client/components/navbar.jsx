import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header>
        <a href="#home" className="text-white">GG</a>
        <input type="text" id="search" name="search" placeholder="Search"></input>
        <i className="fas fa-bars"></i>
      </header>
    );
  }
}
