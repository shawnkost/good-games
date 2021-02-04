import React from 'react';
import dayjs from 'dayjs';
import APIKEY from '../api.json';
import CreateGameCard from './createGameCard';

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.date = dayjs().format('YYYY-MM-DD');
    this.mostPopularGames = this.mostPopularGames.bind(this);
    this.mapGames = this.mapGames.bind(this);
    this.nextRequest = this.nextRequest.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.path);
    this.mostPopularGames();
  }

  componentDidUpdate(prevProps) {
    // console.log("test", this.props)
    if (prevProps.platform !== this.props.platform) {
      this.mostPopularGames();
    }
  }

  mostPopularGames() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.props.platform}&dates=2010-01-01,${this.date}&ordering=-metacritic&key=${APIKEY.API_KEY}`
    )
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  nextRequest() {
    fetch(`${this.state.games.next}`)
      .then(response => response.json())
      .then(games => {
        this.setState({
          games
        });
        window.scrollTo(0, 0);
      });
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
    return (
      <>
        <div className="container-fluid">{gameList}</div>
        <div
          className={
            this.state.games.results ? 'show text-white text-center mb-3 next' : 'hide'
          }
          onClick={this.nextRequest}
        >
          Next Page
        </div>
      </>
    );
  }
}
