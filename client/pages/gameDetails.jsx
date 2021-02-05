import React from 'react';
import APIKEY from '../api.json';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import CheckPlatform from '../components/checkPlatforms';
import CreateScrollingImages from '../components/createScrollingImages';

export default class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: '',
      gamePhotos: ''
    };
    this.youtubeURL = '';
    this.grabGameDetails = this.grabGameDetails.bind(this);
    this.grabGamePhotos = this.grabGamePhotos.bind(this);
    this.grabYoutubeVideo = this.grabYoutubeVideo.bind(this);
    this.grabGameDetails();
  }

  componentDidUpdate() {
    if (this.state.gameDetails.slug) {
      this.grabYoutubeVideo();
    }
  }

  grabGameDetails() {
    fetch(
      `https://api.rawg.io/api/games/${this.props.gameId}?key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(gameDetails => {
        this.setState({
          gameDetails
        });
      });
    this.grabGamePhotos();
  }

  grabGamePhotos() {
    fetch(
      `https://api.rawg.io/api/games/${this.props.gameId}/screenshots?key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(gamePhotos =>
        this.setState({
          gamePhotos
        })
      );
  }

  grabYoutubeVideo() {
    if (this.state.gameDetails.slug) {
      let youtubeSearch = this.state.gameDetails.slug.split('-').join('%20');
      youtubeSearch = youtubeSearch + '%20Official%20Trailer';
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${youtubeSearch}&key=${APIKEY.GOOGLEAPI}`
      )
        .then(response => response.json())
        .then(youtubeResults => {
          this.youtubeURL = youtubeResults.items[0].id.videoId;
        });
    }
  }

  render() {
    return (
      <>
        <div className="">
          <Navbar />
          <div
            className={
              this.state.gamePhotos !== ''
                ? 'mb-2 text-white text-center game-details-path'
                : 'hide'
            }
          >
            {'Home / Games / ' + this.state.gameDetails.name}
          </div>
          <div className="text-center release-platform-container">
            <div className="mr-2 mb-2 text-white text-center game-details-date">
              {dayjs(this.state.gameDetails.released).format('MMM DD, YYYY')}
            </div>
            <CheckPlatform game={this.state.gameDetails} />
          </div>
          <div className="mb-2 text-center text-white game-details-name">
            {this.state.gameDetails.name}
          </div>
          <div className="scrolling-wrapper mb-4">
            <div className="screenshot align-middle">
              <iframe
                className="w-100 h-100"
                src={
                  this.youtubeURL !== ''
                    ? `https://www.youtube.com/embed/${this.youtubeURL}?autoplay=1&mute=1`
                    : ' '
                }
              ></iframe>
            </div>
            <CreateScrollingImages images={this.state.gamePhotos} />
          </div>
          <div className="d-flex justify-content-around mb-4 list-container text-white">
            <div className="list-text">Played</div>
            <div className="list-text">Want To Play</div>
            <div className="list-text">Currently Playing</div>
          </div>
          <div className="game-description">
            <div className="text-white">About</div>
            <p className="text-white">
              {this.state.gameDetails.description_raw}
            </p>
          </div>
        </div>
        <div className="background-img-container">
          {this.state.gameDetails.background_image
            ? (
            <div
              className="test"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${this.state.gameDetails.background_image})`
              }}
            ></div>
              )
            : (
                ''
              )}
        </div>
      </>
    );
  }
}
