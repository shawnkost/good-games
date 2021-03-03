import React from 'react';

export default function Menu(props) {
  const handleClick = event => {
    props.click(event);
  };

  return (
    <>
      <div
        className={
          props.menuClicked ? 'menu-container text-center' : 'hide menu'
        }
      >
        <i
          className="fas fa-times d-block pr-3 pt-3 mb-3 text-right text-white font-24 cursor-pointer close-menu"
          onClick={handleClick}
        ></i>
        <a
          href="#"
          className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
          onClick={handleClick}
        >
          Most Popular
        </a>
        <a
          href="#new-releases"
          className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
          onClick={handleClick}
        >
          New Releases
        </a>
        <a
          href="#upcoming-games"
          className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
          onClick={handleClick}
        >
          Upcoming
        </a>
        <a
          href="#profile"
          className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
          onClick={handleClick}
        >
          Profile
        </a>
        <a
          href="#contact-me"
          className="d-block font-28 text-left menu-items pl-2 pt-2 pb-2 mb-2 mb-lg-3"
          onClick={handleClick}
        >
          Contact Me
        </a>
      </div>
    </>
  );
}
