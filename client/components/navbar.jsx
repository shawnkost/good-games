import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="container-fluid mb-3">
        <div className="row header-row align-items-center">
            <a href="#home" className="col-4 text-white logo">
              GG
            </a>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              className="col-4 border-radius"
            ></input>
            <i className="fas fa-bars col-4 text-white menu text-align-right"></i>
        </div>
      </div>
    );
  }
}
