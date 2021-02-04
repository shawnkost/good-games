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
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(location.hash)
      });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home path={path} />;
    }
    if (path === 'new-releases') {
      return <NewReleases path={path} />;
    }
    if (path === 'upcoming-games') {
      return <UpcomingGames path={path} />;
    }
    if (path === 'game-details') {
      return <GameDetails />;
    }
  }

  render() {
    return <>{this.renderPage()}</>;
  }
}
