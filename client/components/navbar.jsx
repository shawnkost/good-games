import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {

  }

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
          <a className="col-4 text-right" href="#menu">
            <i
              className="fas fa-bars text-white menu"
              onClick={this.handleClick}
            ></i>
          </a>
        </div>
      </div>
    );
  }
}
