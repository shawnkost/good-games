import React from 'react';
import dayjs from 'dayjs';
import Playstation from '../images/playstation.png';
import Xbox from '../images/xbox.png';
import Windows from '../images/windows.png';
import Nintendo from '../images/nintendo.png';

export default class CreateGameCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.passGameId(event.target.id);
  }

  render() {
    return (
      <div className="game-card mb-3">
        <div className="w-100 image-container">
          <a href="#game-details">
            <img src={this.props.image} className="w-100 h-100 game-image" id={this.props.value.id} onClick={this.handleClick}></img>
          </a>
        </div>
        <div className="text-white details">
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
            <div className="pl-2 mb-2 font-weight-bold">{this.props.value.name}</div>
            <div className="pl-2 d-inline-block details-font">
              {'Release date: ' +
                dayjs(this.props.value.released).format('MMM-DD-YYYY')}
            </div>
            <div className="d-inline-block view-details pr-1 details-font">
              View Details
            </div>
            <div
              className={
                this.props.value.metacritic !== null ? 'metacritic' : 'hide'
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
