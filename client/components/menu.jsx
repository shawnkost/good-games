import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.click(event);
  }

  render() {
    return (
      <>
        <div
          className={
            this.props.menuClicked ? 'menu-container text-center' : 'hide menu'
          }
        >
          <i
            className="fas fa-times d-block pr-3 pt-3 mb-3 text-right text-white font-24 cursor-pointer close-menu"
            onClick={this.handleClick}
          ></i>
          <a
            href="#"
            className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
            onClick={this.handleClick}
          >
            Most Popular
          </a>
          <a
            href="#new-releases"
            className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
            onClick={this.handleClick}
          >
            New Releases
          </a>
          <a
            href="#upcoming-games"
            className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
            onClick={this.handleClick}
          >
            Upcoming
          </a>
          <a
            href="#profile"
            className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
            onClick={this.handleClick}
          >
            Profile
          </a>
          <a
            href="#contact-me"
            className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
            onClick={this.handleClick}
          >
            Contact Me
          </a>
        </div>
      </>
    );
  }
}
