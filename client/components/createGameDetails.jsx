import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CreateScrollingImages from '../components/createScrollingImages';
import CheckPlatform from '../components/checkPlatforms';
import WriteReview from './writeReview';
import ShowReviews from './showReviews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function CreateGameDetails(props) {

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    grabUserGameList();
  }, []);

  const handleError = () => {
    toast.error('You must be signed in to add a game to your list');
  };

  const grabUserGameList = () => {
    if (props.user) {
      const userId = props.user.userId;
      fetch(`/api/games/gameList/${props.gameDetails.id}/${userId}`)
        .then(response => response.json())
        .then(gameList => setGameList(gameList));
    }
  };

  const addPlayed = () => {
    if (props.user) {
      const userId = props.user.userId;
      if (gameList.length === 0) {
        const data = {
          userId: userId,
          gameId: props.gameDetails.id,
          wantToPlay: false,
          played: true
        };
        fetch('/api/games/gameList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(gameList => setGameList([gameList]));
        return;
      }
      if (gameList[0].played) {
        const data = {
          wantToPlay: false,
          played: false
        };
        fetch(`/api/games/gameList/${props.gameDetails.id}/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(gameList => setGameList([gameList]));
        return;
      }
      if (!gameList[0].played) {
        const data = {
          wantToPlay: false,
          played: true
        };
        fetch(`/api/games/gameList/${props.gameDetails.id}/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(gameList => setGameList([gameList]));
        return;
      }
    }
    handleError();
  };

  const addWantToPlay = () => {
    if (props.user) {
      const userId = props.user.userId;
      if (gameList.length === 0) {
        const data = {
          userId: userId,
          gameId: props.gameDetails.id,
          wantToPlay: true,
          played: false
        };
        fetch('/api/games/gameList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(gameList => setGameList([gameList]));
        return;
      }
      if (gameList[0].wantToPlay) {
        const data = {
          wantToPlay: false,
          played: false
        };
        fetch(`/api/games/gameList/${props.gameDetails.id}/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(gameList => setGameList([gameList]));
        return;
      }
      if (!gameList[0].wantToPlay) {
        const data = {
          wantToPlay: true,
          played: false
        };
        fetch(`/api/games/gameList/${props.gameDetails.id}/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(gameList => setGameList([gameList]));
        return;
      }
    }
    handleError();
  };

  return (
    <div className="">
      <div className="mb-2 text-white text-center font-Yeseva font-16 breadcrumbs">
        <a href="#" className="detail-links">
          <span>Home /</span>
        </a>
        <a href={`#${props.prevRoute.path}`} className="detail-links">
          <span> Games /</span>
        </a>
        <div className="d-inline-block">&nbsp;{props.gameDetails.name}</div>
      </div>
      <div className="text-center release-platform-container">
        <div className="mr-2 mb-2 text-white text-center font-24 font-Yeseva game-details-date">
          {dayjs(props.gameDetails.released).format('MMM DD, YYYY')}
        </div>
        <CheckPlatform game={props.gameDetails} />
      </div>
      <div className="mb-2 mb-lg-4 text-center text-white font-36 font-Yeseva game-details-name">
        {props.gameDetails.name}
      </div>
      <div className="scrolling-wrapper mb-4">
        <iframe
          className="screenshot align-middle youtube-video"
          frameBorder="0"
          src={`https://www.youtube.com/embed/${props.youtubeURL}?autoplay=0&mute=0`}
          allowFullScreen={true}
        ></iframe>
        <CreateScrollingImages images={props.gamePhotos} />
      </div>
      <div className="list-container mb-lg-4">
        <div
          className="ml-3 ml-md-5 mr-3 mr-md-5 mb-4 text-center text-white font-24 list-button-container cursor-pointer"
          onClick={addPlayed}
        >
          {gameList.length !== 0 && gameList[0].played
            ? 'Played'
            : 'Add to Played'}
        </div>
        <div
          className="ml-3 ml-md-5 mr-3 mr-md-5 mb-4 text-center text-white font-24 list-button-container cursor-pointer"
          onClick={addWantToPlay}
        >
          {gameList.length !== 0 && gameList[0].wantToPlay
            ? 'Want to Play'
            : 'Add to Want to Play'}
        </div>
      </div>
      <div className="game-description pl-3 pl-md-5 pr-md-5">
        <div className="mb-2 mb-lg-4 text-white font-22 font-Yeseva game-about">
          About
        </div>
        <div
          className="text-white font-18 font-Josefin game-bio"
          dangerouslySetInnerHTML={props.createDescription()}
        ></div>
      </div>
      <div className="background-img-container">
        <div
          className="background-image"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${props.gameDetails.background_image})`
          }}
        ></div>
      </div>
      <WriteReview submitForm={props.submitForm} user={props.user} />
      <ShowReviews reviews={props.reviews} />
    </div>
  );
}
