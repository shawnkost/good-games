import React from 'react';
import APIKEY from '../api.json';
import Menu from '../components/menu';
import CreateGameDetails from '../components/createGameDetails';

export default class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: '',
      gamePhotos: '',
      youtubeURL: ''
    };
    this.createDescription = this.createDescription.bind(this);
    this.grabGameDetails = this.grabGameDetails.bind(this);
    this.grabGamePhotos = this.grabGamePhotos.bind(this);
    this.grabYoutubeVideo = this.grabYoutubeVideo.bind(this);
    this.sendUserReview = this.sendUserReview.bind(this);
  }

  componentDidMount() {
    if (this.state.gameDetails === '') {
      this.grabGameDetails();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameDetails.slug !== this.state.gameDetails.slug) {
      this.grabYoutubeVideo();
    }
  }

  createDescription() {
    return { __html: this.state.gameDetails.description };
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
          this.setState({
            youtubeURL: youtubeResults.items[0].id.videoId
          });
        });
    }
  }

  sendUserReview(review) {
    const data = {
      gameId: this.props.gameId,
      details: review,
      userId: 1
    };
    fetch('/api/games/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((review));
  }

  grabUserReviews() {
    fetch('/api/games/reviews');
  }

  render() {
    if (this.state.gameDetails.slug) {
      return (
        <>
          <CreateGameDetails
            menuClicked={this.props.menuClicked}
            onChange={this.props.onChange}
            gameDetails={this.state.gameDetails}
            youtubeURL={this.state.youtubeURL}
            gamePhotos={this.state.gamePhotos}
            createDescription={this.createDescription}
            submitForm={this.sendUserReview}
          />
          <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
        </>
      );
    } else {
      return null;
    }
  }
}
