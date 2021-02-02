import React from 'react';
const dayjs = require('dayjs');

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      platform: 4
    };
    this.date = dayjs().format('YYYY-MM-DD');
    this.mostPopular = this.mostPopular.bind(this);
    this.mapGames = this.mapGames.bind(this);
    this.mostPopular();
  }

  mostPopular() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.state.platform}&dates=2000-01-01,${this.date}&ordering=-metacritic&key=c9b670c66eaf4b37bb3b8a3d805fd304`
    )
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  mapGames() {
    const listOfGames = this.state.games.results.map((game, index) => {
      return <CreateGameCard value={game} image={game.background_image} key={index} />;
    });
    return listOfGames;
  }

  render() {
    let gameList = '';
    if (this.state.games.results && this.state.games.results.length > 0) {
      gameList = this.mapGames();
    }
    return (
      <div className="container-fluid">
        {gameList}
      </div>
    );
  }
}

function CreateGameCard(props) {
  return (
    <div className="game-card">
      <div className="w-100">
        <img src={props.image} className="w-100"></img>
      </div>
      <div className="d-flex justify-content-between align-items-center text-white details">
        <div className="ml-3">{props.value.name}</div>
        <div className="mr-3 metacritic">{props.value.metacritic}</div>
      </div>
    </div>
  );
}
