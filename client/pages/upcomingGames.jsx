import React from 'react';
import Home from './home';

export default class UpcomingGames extends React.Component {
  render() {
    return (
      <>
        <Home
          path={this.props.path}
          onChange={this.props.onChange}
          click={this.props.click}
          menuClicked={this.props.menuClicked}
        />
      </>
    );
  }
}
