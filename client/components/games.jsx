import React from 'react';

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      platform: 4
    };
    this.mostPopular = this.mostPopular.bind(this);
    this.mostPopular();
  }

  mostPopular() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.state.platform}&dates=1990-01-01,2021-02-01&ordering=-metacritic&key=c9b670c66eaf4b37bb3b8a3d805fd304`
    )
      .then(response => response.json())
      .then(games => this.setState({
        games
      }));
    // const date = new Date().toLocaleDateString();
  }

  render() {
    return (
      <i src=""></i>
    );
  }
}
