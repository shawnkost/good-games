import React from 'react';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import CreateScrollingImages from '../components/createScrollingImages';
import CheckPlatform from '../components/checkPlatforms';
import WriteReview from './writeReview';

export default function CreateGameDetails(props) {
  return (
    <div className={props.menuClicked ? 'blur-container' : 'page-container'}>
      <div className="">
        <Navbar onChange={props.onChange} />
        <div className="mb-2 text-white text-center game-details-path">
          <a href="#" className="detail-links">
            <span>Home /</span>
          </a>
          <a href="#" className="detail-links">
           <span> Games /</span>
          </a>
          <div className="d-inline-block">&nbsp;{props.gameDetails.name}</div>
        </div>
        <div className="text-center release-platform-container">
          <div className="mr-2 mb-2 text-white text-center game-details-date">
            {dayjs(props.gameDetails.released).format('MMM DD, YYYY')}
          </div>
          <CheckPlatform game={props.gameDetails} />
        </div>
        <div className="mb-2 text-center text-white game-details-name">
          {props.gameDetails.name}
        </div>
        <div className="scrolling-wrapper mb-4">
          <iframe
            className="screenshot align-middle"
            width="264"
            height="148"
            frameBorder="0"
            src={`https://www.youtube.com/embed/${props.youtubeURL}?autoplay=1&mute=0`}
            allow="autoplay"
            allowFullScreen
          ></iframe>
          <CreateScrollingImages images={props.gamePhotos} />
        </div>
        <div className="d-flex justify-content-around mb-4 list-container text-white">
          <div className="list-text">Played</div>
          <div className="list-text">Want To Play</div>
          <div className="list-text">Currently Playing</div>
        </div>
        <div className="game-description pl-3">
          <div className="mb-2 text-white details-about">About</div>
          <div
            className="text-white details-bio"
            dangerouslySetInnerHTML={props.createDescription()}
          ></div>
        </div>
      </div>
      <div className="background-img-container">
        <div
          className="background-image"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${props.gameDetails.background_image})`
          }}
        ></div>
      </div>
      <WriteReview />
    </div>
  );
}
