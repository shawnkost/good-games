import React from 'react';
import Games from '../components/games';
import GameSort from '../components/gameSort';
import Menu from '../components/menu';
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
        <div
          className={
            this.state.menuClicked ? 'blur-container' : 'page-container'
          }
        >
          <Navbar onChange={this.props.onChange} />
          <GameSort onChange={this.savePlatform} path={this.props.path} />
          <Games platform={this.state.platform} path={this.props.path} />
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
