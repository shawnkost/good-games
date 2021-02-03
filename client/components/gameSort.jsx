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
        <h3 className="text-center mb-4 text-white heading-text">
          Most Popular Games
        </h3>
        <label
          htmlFor="platform"
          className="d-block mr-2 mb-3 select-label text-white"
        >
          Platform:
        </label>
        <select
          name="platform"
          id="platform"
          className="sort-select cursor-pointer text-white mb-3"
          onChange={this.handleClick}
        >
          Platform:
          <option value="4" className="text-white option-text">
            PC
          </option>
          <option value="7" className="text-white option-text">
            Switch
          </option>
          <option value="186" className="text-white option-text">
            Xbox Series X
          </option>
          <option value="1" className="text-white option-text">
            Xbox One
          </option>
          <option value="187" className="text-white option-text">
            Playstation 5
          </option>
          <option value="18" className="text-white option-text">
            Playstation 4
          </option>
        </select>
      </div>
    );
  }
}
