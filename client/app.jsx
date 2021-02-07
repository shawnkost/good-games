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
    this.previousRoute = '';
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.previousRoute = this.state.route;
      this.setState({
        route: parseRoute(location.hash)
      });
    });
  }

  openMenu(clicked) {
    document.body.style.overflow = 'hidden';
    this.setState({
      menuClicked: true
    });
  }

  closeMenu(clicked) {
    document.body.style.overflow = '';
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
        />
      );
    }
    if (path === 'game-details') {
      const gameID = params.get('gameId');
      return (
        <GameDetails
          path={path}
          previousRoute={this.previousRoute}
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
