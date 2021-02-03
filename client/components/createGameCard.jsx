import React from 'react';
import dayjs from 'dayjs';
import Playstation from '../images/playstation.png';
import Xbox from '../images/xbox.png';
import Windows from '../images/windows.png';
import Nintendo from '../images/nintendo.png';

export default function CreateGameCard(props) {
  return (
    <div className="game-card mb-3">
      <div className="w-100 image-container">
        <img src={props.image} className="w-100 h-100 game-image"></img>
      </div>
      <div className="text-white details">
        <div className="all-platforms-container mb-2">
          {props.value.parent_platforms.map((platform, index) => {
            let platformImg = '';
            switch (platform.platform.slug) {
              case 'pc':
                platformImg = Windows;
                break;
              case 'xbox':
                platformImg = Xbox;
                break;
              case 'playstation':
                platformImg = Playstation;
                break;
              case 'nintendo':
                platformImg = Nintendo;
                break;
              default:
                return false;
            }
            return (
              <div className="platform-container" key={index}>
                <img src={platformImg} className="w-100 mb-2"></img>
              </div>
            );
          })}
        </div>
        <div className="details-container">
          <div className="pl-1 mb-2">{props.value.name}</div>
          <div className="pl-1 d-inline-block details-font">{'Release date: ' + dayjs(props.value.released).format('MMM-DD-YYYY')}
          </div>
          <div className="d-inline-block view-details pr-1 details-font">View Details</div>
          <div className="metacritic">{props.value.metacritic}</div>
        </div>
      </div>
    </div>
  );
}
