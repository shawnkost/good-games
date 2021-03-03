import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import CreateGameDetails from '../components/createGameDetails';
import SearchResults from '../components/searchResults';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';

toast.configure();

export default function GameDetails(props) {
  const [gameDetails, setGameDetails] = useState('');
  const [gamePhotos, setGamePhotos] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const [reviews, setReviews] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [games, setGames] = useState('');

  useEffect(() => {
    grabYoutubeVideo();
  }, [gameDetails.slug]);

  useEffect(() => {
    setGameDetails('');
    setSearchInput('');
    grabGameDetails();
    grabUserReviews();
    grabYoutubeVideo();
  }, [props.gameId]);

  const handleError = () => {
    toast.error('An unexpected error occurred retrieving data');
  };

  const createDescription = () => {
    return { __html: gameDetails.description };
  };

  const grabGameDetails = () => {
    fetch(`/api/gameDetails/${props.gameId}`)
      .then(response => response.json())
      .then(gameDetails => {
        setGameDetails(gameDetails);
      })
      .catch(() => handleError());
    grabGamePhotos();
  };

  const grabGamePhotos = () => {
    fetch(`/api/gamePhotos/${props.gameId}`)
      .then(response => response.json())
      .then(gamePhotos => {
        setGamePhotos(gamePhotos);
      });
  };

  const grabYoutubeVideo = () => {
    if (gameDetails.slug) {
      let youtubeSearch = gameDetails.slug.split('-').join('%20');
      youtubeSearch = youtubeSearch + '%20Official%20Trailer';
      fetch(`/api/youtubeVideo/${youtubeSearch}`)
        .then(response => response.json())
        .then(youtubeResults => {
          setYoutubeURL(youtubeResults.items[0].id.videoId);
        });
    }
  };

  const sendUserReview = review => {
    if (props.user) {
      const userId = props.user.userId;
      const data = {
        gameId: gameDetails.id,
        gameTitle: gameDetails.name,
        details: review,
        userId: userId
      };
      fetch('/api/games/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(grabUserReviews);
    }
  };

  const grabUserReviews = () => {
    fetch(`/api/games/reviews/${props.gameId}`)
      .then(response => response.json())
      .then(reviews => {
        setReviews(reviews);
      });
  };

  const handleDebounce = useCallback(
    debounce(value => searchGames(value), 800),
    []
  );

  const updateValue = value => {
    setSearchInput(value);
    handleDebounce(value);
  };

  const searchGames = value => {
    if (value !== '') {
      fetch(`/api/searchGames/${value}`)
        .then(response => response.json())
        .then(games => setGames(games))
        .catch(() => handleError());
    }
  };

  if (gameDetails.slug && searchInput === '') {
    return (
      <>
        <div
          className={props.menuClicked ? 'blur-container' : 'page-container'}
        >
          <Navbar
            onChange={props.onChange}
            updateValue={updateValue}
            gameId={props.gameId}
          />
          <CreateGameDetails
            prevRoute={props.prevRoute}
            onChange={props.onChange}
            gameDetails={gameDetails}
            youtubeURL={youtubeURL}
            gamePhotos={gamePhotos}
            createDescription={createDescription}
            submitForm={sendUserReview}
            reviews={reviews}
            user={props.user}
          />
        </div>
        <Menu click={props.click} menuClicked={props.menuClicked} />
      </>
    );
  } else if (searchInput !== '') {
    return (
      <>
        <div
          className={props.menuClicked ? 'blur-container' : 'page-container'}
        >
          <Navbar
            onChange={props.onChange}
            updateValue={updateValue}
            gameId={props.gameId}
          />
          <div className="mb-4 pl-3 text-white font-28">Games</div>
          <SearchResults games={games} updateValue={updateValue} />
        </div>
      </>
    );
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
}
