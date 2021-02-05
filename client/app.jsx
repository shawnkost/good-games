import React from 'react';
import Home from './pages/home';
import NewReleases from './pages/newReleases';
import parseRoute from './lib/parse-route';
import UpcomingGames from './pages/upcomingGames';
import GameDetails from './pages/gameDetails';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      menuClicked: false
    };
    this.gameId = null;
    this.passGameId = this.passGameId.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(location.hash)
      });
    });
  }

  passGameId(gameId) {
    this.gameId = gameId;
  }

  openMenu(clicked) {
    this.setState({
      menuClicked: true
    });
  }

  closeMenu(clicked) {
    this.setState({
      menuClicked: false
    });
  }

  renderPage() {
    const { path, params } = this.state.route;
    if (path === '') {
      return (
        <Home
          path={path}
          onChange={this.openMenu}
          click={this.closeMenu}
          menuClicked={this.state.menuClicked}
          // passGameId={this.passGameId}
        />
      );
    }
    if (path === 'new-releases') {
      return (
        <NewReleases
          path={path}
          onChange={this.openMenu}
          click={this.closeMenu}
          menuClicked={this.state.menuClicked}
          // passGameId={this.passGameId}
        />
      );
    }
    if (path === 'upcoming-games') {
      return (
        <UpcomingGames
          path={path}
          onChange={this.openMenu}
          click={this.closeMenu}
          menuClicked={this.state.menuClicked}
          // passGameId={this.passGameId}
        />
      );
    }
    if (path === 'game-details') {
      const gameID = params.get('gameId');
      return (
        <GameDetails
          path={path}
          onChange={this.openMenu}
          click={this.closeMenu}
          menuClicked={this.state.menuClicked}
          gameId={gameID}
        />
      );
    }
  }

  render() {
    return <>{this.renderPage()}</>;
  }
}
