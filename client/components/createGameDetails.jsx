import React from 'react';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import CreateScrollingImages from '../components/createScrollingImages';
import CheckPlatform from '../components/checkPlatforms';
import WriteReview from './writeReview';
import ShowReviews from './showReviews';
import SearchResults from './searchResults';
import APIKEY from '../api.json';

export default class CreateGameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: [],
      searchInput: '',
      games: ''
    };
    this.userId = '';
    this.grabUserGameList = this.grabUserGameList.bind(this);
    this.addPlayed = this.addPlayed.bind(this);
    this.addWantToPlay = this.addWantToPlay.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.searchGames = this.searchGames.bind(this);
    this.grabUserGameList();
  }

  grabUserGameList() {
    if (this.props.user) {
      if (this.props.user.user) {
        this.userId = this.props.user.user.userId;
      } else {
        this.userId = this.props.user.userId;
      }
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/${this.userId}`)
        .then(response => response.json())
        .then(gameList => {
          this.setState({
            gameList
          });
        });
    }
  }

  addPlayed(props) {
    if (this.props) {
      if (this.props.user.user) {
        this.userId = this.props.user.user.userId;
      } else {
        this.userId = this.props.user.userId;
      }
    }
    if (this.state.gameList.length === 0) {
      const data = {
        userId: this.userId,
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
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/${this.userId}`, {
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
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/${this.userId}`, {
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
    if (this.props) {
      if (this.props.user.user) {
        this.userId = this.props.user.user.userId;
      } else {
        this.userId = this.props.user.userId;
      }
    }
    if (this.state.gameList.length === 0) {
      const data = {
        userId: this.userId,
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
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/${this.userId}`, {
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
      fetch(`/api/games/gameList/${this.props.gameDetails.id}/${this.userId}`, {
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

  updateValue(searchInput) {
    this.setState({
      searchInput
    });
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.searchGames, 800);
  }

  searchGames() {
    fetch(
      `https://api.rawg.io/api/games?search=${this.state.searchInput}&key=${APIKEY.APIKEY}`
    )
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  render() {
    if (this.state.searchInput === '') {
      return (
        <div
          className={
            this.props.menuClicked ? 'blur-container' : 'page-container'
          }
        >
          <div className="">
            <Navbar
              onChange={this.props.onChange}
              updateValue={this.updateValue}
            />
            <div className="mb-2 text-white text-center font-Yeseva font-16">
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
              <div className="mr-2 mb-2 text-white text-center font-24 font-Yeseva">
                {dayjs(this.props.gameDetails.released).format('MMM DD, YYYY')}
              </div>
              <CheckPlatform game={this.props.gameDetails} />
            </div>
            <div className="mb-2 text-center text-white font-36 font-Yeseva">
              {this.props.gameDetails.name}
            </div>
            <div className="scrolling-wrapper mb-4">
              <iframe
                className="screenshot align-middle youtube-video"
                width="264"
                height="148"
                frameBorder="0"
                src={`https://www.youtube.com/embed/${this.props.youtubeURL}?autoplay=0&mute=0`}
                allowFullScreen
              ></iframe>
              <CreateScrollingImages images={this.props.gamePhotos} />
            </div>
            <div className="list-container">
              <div
                className="ml-3 mr-3 mb-4 text-center text-white font-24 list-button-container"
                onClick={this.addPlayed}
              >
                {this.state.gameList.length !== 0 &&
                this.state.gameList[0].played
                  ? 'Played'
                  : 'Add to Played'}
              </div>
              <div
                className="ml-3 mr-3 mb-4 text-center text-white font-24 list-button-container"
                onClick={this.addWantToPlay}
              >
                {this.state.gameList.length !== 0 &&
                this.state.gameList[0].wantToPlay
                  ? 'Want to Play'
                  : 'Add to Want to Play'}
              </div>
            </div>
            <div className="game-description pl-3">
              <div className="mb-2 text-white font-22 font-Yeseva game-about">About</div>
              <div
                className="text-white font-18 font-Josefin game-bio"
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
    } else {
      return (
        <>
          <div
            className={
              this.props.menuClicked ? 'blur-container' : 'page-container'
            }
          >
            <Navbar
              onChange={this.props.onChange}
              updateValue={this.updateValue}
            />
            <div className="mb-4 pl-3 text-white font-28">Games</div>
            <SearchResults
              games={this.state.games}
              updateValue={this.updateValue}
            />
          </div>
        </>
      );
    }
  }
}
