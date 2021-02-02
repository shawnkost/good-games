import React from 'react';

export default class GameSort extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h3>Most Popular Games</h3>
        <label htmlFor="platform">Platform:</label>
        <select name="platform" id="platform">
          <option value="switch">PC</option>
          <option value="switch">Switch</option>
          <option value="switch">Xbox Series X</option>
          <option value="switch">Xbox One</option>
          <option value="switch">Playstation 5</option>
          <option value="switch">Playstation 4</option>
        </select>
      </div>
    );
  }
}
