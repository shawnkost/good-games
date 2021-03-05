import React, { useEffect, useState } from 'react';
import CreateGameCard from './createGameCard';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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

  const mostPopularGames = async () => {
    try {
      const response = await axios.get(`/api/mostPopular/${props.platform}`);
      setGames(response.data);
    } catch {
      handleError();
    }
  };

  const newlyReleasedGames = async () => {
    try {
      const response = await axios.get(`/api/newReleases/${props.platform}`);
      setGames(response.data);
    } catch {
      handleError();
    }
  };

  const upcomingGames = async () => {
    try {
      const response = await axios.get(`/api/upcomingGames/${props.platform}`);
      setGames(response.data);
    } catch {
      handleError();
    }
  };

  const nextRequest = async () => {
    if (games.next !== null) {
      const nextURL = games.next.slice(8);
      const encodedURL = encodeURIComponent(nextURL);
      setGames([]);
      try {
        const response = await axios.get(`/api/nextPage?url=${encodedURL}`);
        setGames(response.data);
      } catch {
        handleError();
      }
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
