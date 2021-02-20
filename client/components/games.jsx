import React from 'react';
import CreateGameCard from './createGameCard';
import Loader from 'react-loader-spinner';

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
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
      this.setState({
        games: []
      });
      this.mostPopularGames();
    }
    if (
      prevProps.platform !== this.props.platform &&
      this.props.path === 'new-releases'
    ) {
      this.setState({
        games: []
      });
      this.newlyReleasedGames();
    }
    if (
      prevProps.platform !== this.props.platform &&
      this.props.path === 'upcoming-games'
    ) {
      this.setState({
        games: []
      });
      this.upcomingGames();
    }
  }

  mostPopularGames() {
    fetch(`/api/mostPopular/${this.props.platform}`)
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  newlyReleasedGames() {
    fetch(`/api/newReleases/${this.props.platform}`)
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  upcomingGames() {
    fetch(`/api/upcomingGames/${this.props.platform}`)
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  nextRequest() {
    if (this.state.games.next !== null) {
      const nextURL = this.state.games.next.slice(8);
      const encodedURL = encodeURIComponent(nextURL);
      this.setState({
        games: []
      });
      fetch(`/api/nextPage?url=${encodedURL}`)
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
    } else {
      return (
        <Loader
          className="text-center"
          type="Rings"
          color="White"
          height={175}
          width={175}
        />
      );
    }
    return (
      <>
        <div className="container-fluid game-container">{gameList}</div>
        <div
          className={
            this.state.games.results
              ? 'show text-white text-center mb-3 font-24 font-Yeseva cursor-pointer next-button'
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
