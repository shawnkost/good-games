import React from 'react';
import Games from '../components/games';
import GameSort from '../components/gameSort';
import Navbar from '../components/navbar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: 4
    };
    this.savePlatform = this.savePlatform.bind(this);
  }

  savePlatform(value) {
    this.setState({
      platform: value
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <GameSort onChange={this.savePlatform} />
        <Games platform={this.state.platform} />
      </>
    );
  }
}
