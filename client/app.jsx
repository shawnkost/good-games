import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import NewReleases from './pages/newReleases';
import parseRoute from './lib/parse-route';
import UpcomingGames from './pages/upcomingGames';
import GameDetails from './pages/gameDetails';
import Profile from './pages/profile';
import ProfileLogin from './pages/profileLogin';
import ProfileLoginDemo from './pages/profileLoginDemo';
import ProfileSignUp from './pages/profileSignUp';
import decodeToken from './lib/decode-token';
import ProfileHome from './pages/profileHome';
import ContactMe from './pages/contactMe';

export default function App(props) {
  const [user, setUser] = useState(null);
  const [prevRoute, setPrevRoute] = useState(null);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [menuClicked, setMenuClicked] = useState(false);

  const updateRoute = () => {
    setPrevRoute(route);
    setRoute(parseRoute(location.hash));
  };

  useEffect(() => {
    window.addEventListener('hashchange', updateRoute);
    const token = window.localStorage.getItem('jwt-token');
    const user = token ? decodeToken(token) : null;
    if (user) {
      setUser(user.user);
    }
  }, []);

  const openMenu = clicked => {
    document.body.style.overflow = 'hidden';
    setMenuClicked(true);
  };

  const closeMenu = clicked => {
    document.body.style.overflow = '';
    setMenuClicked(false);
  };

  const handleSignIn = result => {
    const { user, token } = result;
    if (token) {
      window.localStorage.setItem('jwt-token', token);
      window.location.hash = '#profile-home';
    }
    setUser(user);
  };

  const handleSignOut = event => {
    const token = window.localStorage.getItem('jwt-token');
    if (event) {
      fetch('/api/users/session', {
        method: 'DELETE',
        headers: {
          'X-ACCESS-TOKEN': token
        }
      });
    }
    window.localStorage.removeItem('jwt-token');
    setUser(null);
    window.location.hash = '#profile-login';
  };

  const renderPage = () => {
    const { path, params } = route;
    if (path === '') {
      return (
        <Home
          path={path}
          onChange={openMenu}
          click={closeMenu}
          menuClicked={menuClicked}
          user={user}
        />
      );
    }
    if (path === 'new-releases') {
      return (
        <NewReleases
          path={path}
          onChange={openMenu}
          click={closeMenu}
          menuClicked={menuClicked}
          user={user}
        />
      );
    }
    if (path === 'upcoming-games') {
      return (
        <UpcomingGames
          path={path}
          onChange={openMenu}
          click={closeMenu}
          menuClicked={menuClicked}
          user={user}
        />
      );
    }
    if (path === 'game-details') {
      const gameID = params.get('gameId');
      return (
        <GameDetails
          path={path}
          prevRoute={prevRoute}
          onChange={openMenu}
          click={closeMenu}
          menuClicked={menuClicked}
          gameId={gameID}
          user={user}
        />
      );
    }
    if (path === 'profile') {
      return <Profile user={user} />;
    }
    if (path === 'profile-login') {
      return <ProfileLogin handleSignIn={handleSignIn} user={user} />;
    }
    if (path === 'profile-login-demo') {
      return <ProfileLoginDemo handleSignIn={handleSignIn} user={user} />;
    }
    if (path === 'profile-sign-up') {
      return <ProfileSignUp />;
    }
    if (path === 'profile-home' && user) {
      return (
        <ProfileHome
          user={user}
          onChange={openMenu}
          click={closeMenu}
          menuClicked={menuClicked}
          handleSignOut={handleSignOut}
        />
      );
    }
    if (path === 'contact-me') {
      return (
        <ContactMe
          onChange={openMenu}
          click={closeMenu}
          menuClicked={menuClicked}
        />
      );
    }
  };
  return <>{renderPage()}</>;
}
