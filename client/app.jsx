import React from 'react';
import Home from './pages/home';
import NewReleases from './pages/newReleases';
import parseRoute from './lib/parse-route';
import UpcomingGames from './pages/upcomingGames';
import GameDetails from './pages/gameDetails';
import Profile from './pages/profile';
import ProfileLogin from './pages/profileLogin';
import ProfileSignUp from './pages/profileSignUp';
import decodeToken from './lib/decode-token';
import ProfileHome from './pages/profileHome';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      menuClicked: false
    };
    this.previousRoute = '';
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.previousRoute = this.state.route;
      this.setState({
        route: parseRoute(location.hash)
      });
    });
    const token = window.localStorage.getItem('jwt-token');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
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

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt-token', token);
    this.setState({ user });
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
          user={this.state.user}
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
          user={this.state.user}
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
          user={this.state.user}
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
          user={this.state.user}
        />
      );
    }
    if (path === 'profile') {
      return <Profile />;
    }
    if (path === 'profile-login') {
      return <ProfileLogin handleSignIn={this.handleSignIn} />;
    }
    if (path === 'profile-sign-up') {
      return <ProfileSignUp />;
    }
    if (path === 'profile-home') {
      return <ProfileHome />;
    }
  }

  render() {
    return <>{this.renderPage()}</>;
  }
}
