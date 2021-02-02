import React from 'react';

export default class GameSort extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onChange(event.target.value);
  }

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
          onChange={this.handleClick}
        >
          <option value="4" className="text-white">
            PC
          </option>
          <option value="7" className="text-white">
            Switch
          </option>
          <option value="186" className="text-white">
            Xbox Series X
          </option>
          <option value="1" className="text-white">
            Xbox One
          </option>
          <option value="187" className="text-white">
            Playstation 5
          </option>
          <option value="18" className="text-white">
            Playstation 4
          </option>
        </select>
      </div>
    );
  }
}
