import React from 'react';

export default function GameSort(props) {
  function handleClick(event) {
    props.onChange(event.target.value);
  }

  return (
    <div className="container-fluid">
      <h3 className="text-center mb-4 text-white font-Yeseva heading-text">
        {props.path === ''
          ? 'Most Popular Games'
          : props.path === 'new-releases'
            ? 'New Releases'
            : props.path === 'upcoming-games'
              ? 'Upcoming Games'
              : ''}
      </h3>
      <label
        htmlFor="platform"
        className="d-block mr-2 ml-lg-5 mb-3 font-Josefin font-24 text-white platform-label"
      >
        Platform:
      </label>
      <select
        name="platform"
        id="platform"
        className="ml-lg-5 sort-select font-18 font-Josefin cursor-pointer text-white mb-3"
        onChange={handleClick}
      >
        Platform:
        <option value="4" className="text-white font-18 cursor-pointer">
          PC
        </option>
        <option value="7" className="text-white font-18 cursor-pointer">
          Switch
        </option>
        <option value="186" className="text-white font-18 cursor-pointer">
          Xbox Series X
        </option>
        <option value="1" className="text-white font-18">
          Xbox One
        </option>
        <option value="187" className="text-white font-18">
          Playstation 5
        </option>
        <option value="18" className="text-white font-18">
          Playstation 4
        </option>
      </select>
    </div>
  );
}
