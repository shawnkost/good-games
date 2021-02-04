import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import APIKEY from '../api.json';
import CreateGameCard from './createGameCard';
dayjs.extend(relativeTime);
export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.todaysDate = dayjs().format('YYYY-MM-DD');
    this.ninetyDaysAgo = dayjs().subtract(90, 'days').format('YYYY-MM-DD');
    this.oneYearFromNow = dayjs().add(365, 'days').format('YYYY-MM-DD');
    this.mostPopularGames = this.mostPopularGames.bind(this);
    this.newlyReleasedGames = this.newlyReleasedGames.bind(this);
    this.upcomingGames = this.upcomingGames.bind(this);
    this.nextRequest = this.nextRequest.bind(this);
    this.mapGames = this.mapGames.bind(this);
  }

  componentDidMount() {
    if (this.props.path === '') {
      this.mostPopularGames();
    }
    if (this.props.path === 'new-releases') {
      this.newlyReleasedGames();
    }
    if (this.props.path === 'upcoming-games') {
      this.upcomingGames();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.platform !== this.props.platform && this.props.path === '') {
      this.mostPopularGames();
    }
    if (
      prevProps.platform !== this.props.platform &&
      this.props.path === 'new-releases'
    ) {
      this.newlyReleasedGames();
    }
    if (
      prevProps.platform !== this.props.platform &&
      this.props.path === 'upcoming-games'
    ) {
      this.upcomingGames();
    }
  }

  mostPopularGames() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.props.platform}&dates=2010-01-01,${this.todaysDate}&metacritic=10,100&ordering=-metacritic&key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  newlyReleasedGames() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.props.platform}&dates=${this.ninetyDaysAgo},${this.todaysDate}&metacritic=1,100&ordering=-released&key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  upcomingGames() {
    fetch(
      `https://api.rawg.io/api/games?platforms=${this.props.platform}&dates=${this.todaysDate},${this.oneYearFromNow}&ordering=released&key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  nextRequest() {
    if (this.state.games.next !== null) {
      fetch(`${this.state.games.next}`)
        .then(response => response.json())
        .then(games => {
          this.setState({
            games
          });
        });
    }
    window.scrollTo(0, 0);
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
            this.state.games.results
              ? 'show text-white text-center mb-3 next'
              : 'hide'
          }
          onClick={this.nextRequest}
        >
          {this.state.games.next !== null ? 'Next Page' : 'Back to top'}
        </div>
      </>
    );
  }
}
