import React from 'react';
import Playstation from '../images/playstation.png';
import Xbox from '../images/xbox.png';
import Windows from '../images/windows.png';
import Nintendo from '../images/nintendo.png';

export default function CheckPlatform(props) {
  if (props.game.name) {
    return (
      <div className="all-platforms-container">
        {props.game.parent_platforms.map((platform, index) => {
          let platformImg = null;
          let platformURL = null;
          switch (platform.platform.slug) {
            case 'pc':
              platformImg = Windows;
              platformURL =
                'https://www.microsoft.com/en-us/store/games/windows';
              break;
            case 'xbox':
              platformImg = Xbox;
              platformURL = 'https://www.xbox.com/en-US/microsoft-store';
              break;
            case 'playstation':
              platformImg = Playstation;
              platformURL = 'https://store.playstation.com/en-us/latest';
              break;
            case 'nintendo':
              platformImg = Nintendo;
              platformURL = 'https://www.nintendo.com/games/';
              break;
            default:
              return null;
          }
          return (
            <div
              className="platform-container game-details-platforms"
              style={{ width: '7%' }}
              key={index}
            >
              <a href={platformURL} target="_blank" rel="noreferrer">
                <img src={platformImg} className="w-100"></img>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}
