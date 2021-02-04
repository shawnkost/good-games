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
            className="fas fa-times d-block pr-3 pt-3 mb-3 text-right text-white close-menu"
            onClick={this.handleClick}
          ></i>
          <a
            href="#"
            className="d-block menu-items mb-4"
            onClick={this.handleClick}
          >
            Most Popular
          </a>
          <a
            href="#new-releases"
            className="d-block menu-items mb-4"
            onClick={this.handleClick}
          >
            New Releases
          </a>
          <a href="#upcoming-games" className="d-block menu-items mb-4">
            Upcoming Games
          </a>
          <a href="#new-releases" className="d-block menu-items mb-4">
            Profile
          </a>
          <a href="#new-releases" className="d-block menu-items">
            Contact Me
          </a>
        </div>
      </>
    );
  }
}
