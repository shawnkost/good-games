import React from 'react';
import Home from './home';

export default class UpcomingGames extends React.Component {
  render() {
    return (
      <>
        <Home path={this.props.path} passGameId={this.props.passGameId} />
      </>
    );
  }
}
