import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CreateScrollingImages from '../components/createScrollingImages';
import CheckPlatform from '../components/checkPlatforms';
import WriteReview from './writeReview';
import ShowReviews from './showReviews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure();

export default function CreateGameDetails(props) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    grabUserGameList();
  }, []);

  const handleError = () => {
    toast.error('You must be signed in to add a game to your list');
  };

  const grabUserGameList = async () => {
    if (props.user) {
      const userId = props.user.userId;
      const response = await axios.get(
        `/api/games/gameList/${props.gameDetails.id}/${userId}`
      );
      setGameList(response.data);
    }
  };

  const addPlayed = async () => {
    if (props.user) {
      const userId = props.user.userId;
      if (gameList.length === 0) {
        const response = await axios({
          method: 'POST',
          url: '/api/games/gameList',
          data: {
            userId: userId,
            gameId: props.gameDetails.id,
            wantToPlay: false,
            played: true
          }
        });
        setGameList([response.data]);
        return;
      } else {
        const response = await axios({
          method: 'PATCH',
          url: `/api/games/gameList/${props.gameDetails.id}/${userId}`,
          data: {
            wantToPlay: false,
            played: !gameList[0].played
          }
        });
        setGameList([response.data]);
        return;
      }
    }
    handleError();
  };

  const addWantToPlay = async () => {
    if (props.user) {
      const userId = props.user.userId;
      if (gameList.length === 0) {
        const response = await axios({
          method: 'POST',
          url: '/api/games/gameList',
          data: {
            userId: userId,
            gameId: props.gameDetails.id,
            wantToPlay: true,
            played: false
          }
        });
        setGameList([response.data]);
        return;
      } else {
        const response = await axios({
          method: 'PATCH',
          url: `/api/games/gameList/${props.gameDetails.id}/${userId}`,
          data: {
            wantToPlay: !gameList[0].wantToPlay,
            played: false
          }
        });
        setGameList([response.data]);
        return;
      }
    }
    handleError();
  };

  return (
    <div>
      <div className="mb-2 text-white text-center font-Yeseva font-16 breadcrumbs">
        <a href="#" className="detail-links">
          <span>Home /</span>
        </a>
        <a
          href={props.prevRoute ? `#${props.prevRoute.path}` : '#'}
          className="detail-links"
        >
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
      <div className="list-container mb-4 mb-lg-4 text-center">
        <div className="btn-group">
          <button className="btn text-white list-btn font-18" type="button">
            {gameList.length !== 0 && gameList[0].played
              ? 'Played'
              : gameList.length !== 0 && gameList[0].wantToPlay
                ? 'Want To Play'
                : 'Add To:'}
          </button>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
            <div
              className="dropdown-menu dropdown-menu-right list-dropdown"
              aria-labelledby="dropdownMenuButton"
            >
              <div
                className="dropdown-item font-18 text-white cursor-pointer"
                onClick={addPlayed}
              >
                Played
              </div>
              <div className="dropdown-divider"></div>
              <div
                className="dropdown-item font-18 text-white cursor-pointer"
                onClick={addWantToPlay}
              >
                Want To Play
              </div>
            </div>
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
