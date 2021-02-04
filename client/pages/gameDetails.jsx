import React from 'react';
import APIKEY from '../api.json';
import Navbar from '../components/navbar';

export default class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: '',
      gamePhotos: ''
    };
    this.grabGameDetails = this.grabGameDetails.bind(this);
    this.grabGamePhotos = this.grabGamePhotos.bind(this);
    this.grabGameDetails();
  }

  grabGameDetails() {
    fetch(
      `https://api.rawg.io/api/games/${this.props.gameId}?key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(gameDetails =>
        this.setState({
          gameDetails
        })
      );
    this.grabGamePhotos();
  }

  grabGamePhotos() {
    fetch(
      `https://api.rawg.io/api/games/${this.props.gameId}/screenshots?key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(gamePhotos =>
        this.setState({
          gamePhotos
        })
      );
  }

  render() {
    return (
      <div
        className="background-image container"
        style={{
          backgroundImage: `url(${this.state.gameDetails.background_image})`
        }}
      >
        <Navbar />
        <div className={this.state.gamePhotos !== '' ? 'text-white text-center' : 'hide'}>{'Home / Games / ' + this.state.gameDetails.name}</div>
        <div>{this.state.gameDetails.released}</div>
      </div>
    );
  }
}
