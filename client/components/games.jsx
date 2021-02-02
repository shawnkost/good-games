import React from 'react';
import dayjs from 'dayjs';
import APIKEY from '../api.json';

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.date = dayjs().format('YYYY-MM-DD');
    this.mostPopularGames = this.mostPopularGames.bind(this);
    this.mapGames = this.mapGames.bind(this);
  }

  componentDidMount() {
    this.mostPopularGames();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.platform !== this.props.platform) {
      this.mostPopularGames();
    }
  }

  mostPopularGames() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.props.platform}&dates=2000-01-01,${this.date}&ordering=-metacritic&key=${APIKEY.API_KEY}`
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
      return (
        <CreateGameCard
          value={game}
          image={game.background_image}
          key={index}
        />
      );
    });
    return listOfGames;
  }

  render() {
    let gameList = '';
    if (this.state.games.results && this.state.games.results.length > 0) {
      gameList = this.mapGames();
    }
    return <div className="container-fluid">{gameList}</div>;
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
