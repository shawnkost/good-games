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
        <h3 className="text-center mb-4 text-white font-Yeseva heading-text">
          {this.props.path === ''
            ? 'Most Popular Games'
            : this.props.path === 'new-releases'
              ? 'New Releases'
              : this.props.path === 'upcoming-games'
                ? 'Upcoming Games'
                : ''}
        </h3>
        <label
          htmlFor="platform"
          className="d-block mr-2 mb-3 font-Josefin font-24 text-white"
        >
          Platform:
        </label>
        <select
          name="platform"
          id="platform"
          className="sort-select font-18 font-Josefin cursor-pointer text-white mb-3"
          onChange={this.handleClick}
        >
          Platform:
          <option value="4" className="text-white font-18">
            PC
          </option>
          <option value="7" className="text-white font-18">
            Switch
          </option>
          <option value="186" className="text-white font-18">
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
}
