import React from 'react';
import dayjs from 'dayjs';
import Playstation from '../images/playstation.png';
import Xbox from '../images/xbox.png';
import Windows from '../images/windows.png';
import Nintendo from '../images/nintendo.png';

export default class CreateGameCard extends React.Component {
  render() {
    return (
      <div className="game-card mb-3 mb-lg-5">
        <div className="w-100 image-container">
          <a href={`#game-details?gameId=${this.props.value.id}`}>
            <img
              src={this.props.image}
              className="w-100 h-100 game-image"
            ></img>
          </a>
        </div>
        <div className="text-white font-24 font-Josefin details">
          <div className="all-platforms-container mb-2 pl-2 pt-2">
            {this.props.value.parent_platforms.map((platform, index) => {
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
                <div className="platform-container" key={index}>
                  <a href={platformURL} target="_blank" rel="noreferrer">
                    <img src={platformImg} className="w-100 mb-2"></img>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="details-container">
            <div className="pl-2 mb-2 font-weight-bold game-title">
              {this.props.value.name}
            </div>
            <div className="pl-2 d-inline-block font-18">
              {'Release date: ' +
                dayjs(this.props.value.released).format('MMM-DD-YYYY')}
            </div>
            <a href={`#game-details?gameId=${this.props.value.id}`}>
              <div className="d-inline-block view-details pr-1 font-18">
                View Details
              </div>
            </a>
            <div
              className={
                this.props.value.metacritic !== null ? 'font-18 metacritic' : 'hide'
              }
            >
              {this.props.value.metacritic}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
