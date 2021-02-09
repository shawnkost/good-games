import React from 'react';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import CreateScrollingImages from '../components/createScrollingImages';
import CheckPlatform from '../components/checkPlatforms';
import WriteReview from './writeReview';
import ShowReviews from './showReviews';

export default class CreateGameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: []
    };
    this.grabUserGameList = this.grabUserGameList.bind(this);
    this.addPlayed = this.addPlayed.bind(this);
    this.addWantToPlay = this.addWantToPlay.bind(this);
    this.grabUserGameList();
  }

  grabUserGameList() {
    fetch(`/api/games/gameList/${this.props.gameDetails.id}/1`)
      .then(response => response.json())
      .then(gameList => {
        this.setState({
          gameList
        });
      });
  }

  addPlayed(props) {
    if (this.state.gameList.length === 0) {
      const data = {
        userId: 1,
        gameId: this.props.gameDetails.id,
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
        .then(gameList =>
          this.setState({
            gameList: [gameList]
          })
        );
      return;
    }

    if (this.state.gameList[0].played) {
      const data = {
        wantToPlay: false,
        played: false
      };
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(gameList =>
          this.setState({
            gameList: [gameList]
          })
        );
      return;
    }

    if (!this.state.gameList[0].played) {
      const data = {
        wantToPlay: false,
        played: true
      };
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(gameList =>
          this.setState({
            gameList: [gameList]
          })
        );

    }
  }

  addWantToPlay(props) {
    if (this.state.gameList.length === 0) {
      const data = {
        userId: 1,
        gameId: this.props.gameDetails.id,
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
        .then(gameList =>
          this.setState({
            gameList: [gameList]
          })
        );
      return;
    }

    if (this.state.gameList[0].wantToPlay) {
      const data = {
        wantToPlay: false,
        played: false
      };
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(gameList =>
          this.setState({
            gameList: [gameList]
          })
        );
      return;
    }

    if (!this.state.gameList[0].wantToPlay) {
      const data = {
        wantToPlay: true,
        played: false
      };
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(gameList =>
          this.setState({
            gameList: [gameList]
          })
        );

    }
  }

  render() {
    return (
      <div
        className={this.props.menuClicked ? 'blur-container' : 'page-container'}
      >
        <div className="">
          <Navbar onChange={this.props.onChange} />
          <div className="mb-2 text-white text-center game-details-path">
            <a href="#" className="detail-links">
              <span>Home /</span>
            </a>
            <a
              href={`#${this.props.previousRoute.path}`}
              className="detail-links"
            >
              <span> Games /</span>
            </a>
            <div className="d-inline-block">
              &nbsp;{this.props.gameDetails.name}
            </div>
          </div>
          <div className="text-center release-platform-container">
            <div className="mr-2 mb-2 text-white text-center game-details-date">
              {dayjs(this.props.gameDetails.released).format('MMM DD, YYYY')}
            </div>
            <CheckPlatform game={this.props.gameDetails} />
          </div>
          <div className="mb-2 text-center text-white game-details-name">
            {this.props.gameDetails.name}
          </div>
          <div className="scrolling-wrapper mb-4">
            <iframe
              className="screenshot align-middle"
              width="264"
              height="148"
              frameBorder="0"
              src={`https://www.youtube.com/embed/${this.props.youtubeURL}?autoplay=1&mute=0`}
              allow="autoplay"
              allowFullScreen
            ></iframe>
            <CreateScrollingImages images={this.props.gamePhotos} />
          </div>
          <div className="list-container">
            <div
              className="ml-3 mr-3 mb-4 text-center list-button-container"
              onClick={this.addPlayed}
            >
              {this.state.gameList.length !== 0 && this.state.gameList[0].played
                ? 'Played'
                : 'Add to Played'}
            </div>
            <div
              className="ml-3 mr-3 mb-4 text-center list-button-container"
              onClick={this.addWantToPlay}
            >
              {this.state.gameList.length !== 0 &&
              this.state.gameList[0].wantToPlay
                ? 'Want to Play'
                : 'Add to Want to Play'}
            </div>
          </div>
          <div className="game-description pl-3">
            <div className="mb-2 text-white details-about">About</div>
            <div
              className="text-white details-bio"
              dangerouslySetInnerHTML={this.props.createDescription()}
            ></div>
          </div>
        </div>
        <div className="background-img-container">
          <div
            className="background-image"
            style={{
              backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${this.props.gameDetails.background_image})`
            }}
          ></div>
        </div>
        <WriteReview submitForm={this.props.submitForm} />
        <ShowReviews reviews={this.props.reviews} />
      </div>
    );
  }
}
