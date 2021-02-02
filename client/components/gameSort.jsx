import React from 'react';

export default class GameSort extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h3 className="text-center mb-5">Most Popular Games</h3>
        <label htmlFor="platform col-4" className="select-label mr-2">
          Platform:
        </label>
        <select
          name="platform col"
          id="platform"
          className="sort-select cursor-pointer text-white"
        >
          <option value="switch" className="text-white">
            PC
          </option>
          <option value="switch" className="text-white">
            Switch
          </option>
          <option value="switch" className="text-white">
            Xbox Series X
          </option>
          <option value="switch" className="text-white">
            Xbox One
          </option>
          <option value="switch" className="text-white">
            Playstation 5
          </option>
          <option value="switch" className="text-white">
            Playstation 4
          </option>
        </select>
      </div>
    );
  }
}
