import React, { useEffect, useState } from 'react';
import CreateGameCard from './createGameCard';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function Games(props) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (props.path === '') {
      setGames([]);
      mostPopularGames();
    }
    if (props.path === 'new-releases') {
      setGames([]);
      newlyReleasedGames();
    }
    if (props.path === 'upcoming-games') {
      setGames([]);
      upcomingGames();
    }
  }, [props.platform]);

  const handleError = () => {
    toast.error('An unexpected error occurred retrieving data');
  };

  const mostPopularGames = () => {
    fetch(`/api/mostPopular/${props.platform}`)
      .then(response => response.json())
      .then(games =>
        setGames(games)
      )
      .catch(() => handleError());
  };

  const newlyReleasedGames = () => {
    fetch(`/api/newReleases/${props.platform}`)
      .then(response => response.json())
      .then(games =>
        setGames(games)
      )
      .catch(() => handleError());
  };

  const upcomingGames = () => {
    fetch(`/api/upcomingGames/${props.platform}`)
      .then(response => response.json())
      .then(games =>
        setGames(games)
      )
      .catch(() => handleError());
  };

  const nextRequest = () => {
    if (games.next !== null) {
      const nextURL = games.next.slice(8);
      const encodedURL = encodeURIComponent(nextURL);
      setGames([]);
      fetch(`/api/nextPage?url=${encodedURL}`)
        .then(response => response.json())
        .then(games => {
          setGames(games);
        })
        .catch(() => handleError());
    }
    window.scrollTo(0, 0);
  };

  const mapGames = () => {
    const listOfGames = games.results.map((game, index) => {
      return (
        <CreateGameCard
          value={game}
          image={game.background_image}
          key={index}
        />
      );
    });
    return listOfGames;
  };

  let gameList = '';

  if (games.results && games.results.length > 0) {
    gameList = mapGames();
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
            games.results
              ? 'show text-white text-center mb-3 font-24 font-Yeseva cursor-pointer next-button'
              : 'hide'
          }
          onClick={nextRequest}
        >
          {games.next !== null ? 'Next Page' : 'Back to top'}
        </div>
      </>
  );
}
