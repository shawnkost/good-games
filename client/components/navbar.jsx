import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="container-fluid mb-4">
        <div className="row py-2 align-items-center header-row">
            <a href="#home" className="col-4 text-white logo">
              GG
            </a>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              className="col-4 search-input"
            ></input>
            <i className="fas fa-bars col-4 text-white menu text-right"></i>
        </div>
      </div>
    );
  }
}
