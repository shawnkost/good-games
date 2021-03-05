import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import CreateGameDetails from '../components/createGameDetails';
import SearchResults from '../components/searchResults';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import axios from 'axios';

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
  }, [props.gameId]);

  const handleError = () => {
    toast.error('An unexpected error occurred retrieving data');
  };

  const createDescription = () => {
    return { __html: gameDetails.description };
  };

  const grabGameDetails = async () => {
    try {
      const response = await axios.get(`/api/gameDetails/${props.gameId}`);
      setGameDetails(response.data);
    } catch {
      handleError();
    }
    grabGamePhotos();
  };

  const grabGamePhotos = async () => {
    const response = await axios.get(`/api/gamePhotos/${props.gameId}`);
    setGamePhotos(response.data);
  };

  const grabYoutubeVideo = async () => {
    if (gameDetails.slug) {
      let youtubeSearch = gameDetails.slug.split('-').join('%20');
      youtubeSearch = youtubeSearch + '%20Official%20Trailer';
      const response = await axios.get(`/api/youtubeVideo/${youtubeSearch}`);
      setYoutubeURL(response.data.items[0].id.videoId);
    }
  };

  const sendUserReview = async review => {
    if (props.user) {
      const userId = props.user.userId;
      await axios({
        method: 'POST',
        url: '/api/games/reviews',
        data: {
          gameId: gameDetails.id,
          gameTitle: gameDetails.name,
          details: review,
          userId: userId
        }
      });
      grabUserReviews();
    }
  };

  const grabUserReviews = async () => {
    const response = await axios.get(`/api/games/reviews/${props.gameId}`);
    setReviews(response.data);
  };

  const handleDebounce = useCallback(
    debounce(value => searchGames(value), 800),
    []
  );

  const updateValue = value => {
    setSearchInput(value);
    handleDebounce(value);
  };

  const searchGames = async value => {
    if (value !== '') {
      try {
        const response = await axios.get(`/api/searchGames/${value}`);
        setGames(response.data);
      } catch {
        handleError();
      }
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
      <div className={props.menuClicked ? 'blur-container' : 'page-container'}>
        <Navbar
          onChange={props.onChange}
          updateValue={updateValue}
          gameId={props.gameId}
        />
        <Loader
          className="text-center"
          type="Rings"
          color="White"
          height={175}
          width={175}
        />
        <Menu click={props.click} menuClicked={props.menuClicked} />
      </div>
    );
  }
}
