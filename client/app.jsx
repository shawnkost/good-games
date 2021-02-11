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
    this.handleSignOut = this.handleSignOut.bind(this);
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
    if (user) {
      this.setState({ user, isAuthorizing: false });
    }
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
    if (token) {
      window.localStorage.setItem('jwt-token', token);
      window.location.hash = 'profile-home';
    }
    this.setState({ user });
  }

  handleSignOut() {
    const token = window.localStorage.getItem('jwt-token');
    fetch('/api/users/session', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': token
      }
    })
      .then(response => response.json())
      .then(() => {
        window.localStorage.removeItem('jwt-token');
        this.setState({ user: null });
      });
    // .catch((err) => console.log(err))
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
      return <Profile user={this.state.user} />;
    }
    if (path === 'profile-login') {
      return (
        <ProfileLogin handleSignIn={this.handleSignIn} user={this.state.user} />
      );
    }
    if (path === 'profile-sign-up') {
      return <ProfileSignUp />;
    }
    if (path === 'profile-home') {
      return (
        <ProfileHome
          user={this.state.user}
          onChange={this.openMenu}
          click={this.closeMenu}
          menuClicked={this.state.menuClicked}
          handleSignOut={this.handleSignOut}
        />
      );
    }
  }

  render() {
    return <>{this.renderPage()}</>;
  }
}
