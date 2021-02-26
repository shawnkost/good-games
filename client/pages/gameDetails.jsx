import React from 'react';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import CreateGameDetails from '../components/createGameDetails';
import SearchResults from '../components/searchResults';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: '',
      gamePhotos: '',
      youtubeURL: '',
      gameList: '',
      reviews: [],
      searchInput: '',
      games: ''
    };
    this.timeoutId = '';
    this.userId = '';
    this.createDescription = this.createDescription.bind(this);
    this.grabGameDetails = this.grabGameDetails.bind(this);
    this.grabGamePhotos = this.grabGamePhotos.bind(this);
    this.grabYoutubeVideo = this.grabYoutubeVideo.bind(this);
    this.sendUserReview = this.sendUserReview.bind(this);
    this.grabUserReviews = this.grabUserReviews.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.searchGames = this.searchGames.bind(this);
  }

  componentDidMount() {
    if (this.state.gameDetails === '') {
      this.grabGameDetails();
      this.grabUserReviews();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameDetails.slug !== this.state.gameDetails.slug) {
      this.grabYoutubeVideo();
    }

    if (prevProps.gameId !== this.props.gameId) {
      this.setState({
        gameDetails: '',
        searchInput: ''
      });
      this.handleError = this.handleError.bind(this);
      this.grabGameDetails();
      this.grabUserReviews();
    }
  }

  handleError() {
    toast.error('An unexpected error occurred retrieving data');
  }

  createDescription() {
    return { __html: this.state.gameDetails.description };
  }

  grabGameDetails() {
    fetch(`/api/gameDetails/${this.props.gameId}`)
      .then(response => response.json())
      .then(gameDetails => {
        this.setState({
          gameDetails
        });
      })
      .catch(() => this.handleError());
    this.grabGamePhotos();
  }

  grabGamePhotos() {
    fetch(`/api/gamePhotos/${this.props.gameId}`)
      .then(response => response.json())
      .then(gamePhotos => {
        this.setState({
          gamePhotos
        });
      });
  }

  grabYoutubeVideo() {
    if (this.state.gameDetails.slug) {
      let youtubeSearch = this.state.gameDetails.slug.split('-').join('%20');
      youtubeSearch = youtubeSearch + '%20Official%20Trailer';
      fetch(`/api/youtubeVideo/${youtubeSearch}`)
        .then(response => response.json())
        .then(youtubeResults => {
          this.setState({
            youtubeURL: youtubeResults.items[0].id.videoId
          });
        });
    }
  }

  sendUserReview(review) {
    if (this.props) {
      if (this.props.user.user) {
        this.userId = this.props.user.user.userId;
      } else {
        this.userId = this.props.user.userId;
      }
    }
    const data = {
      gameId: this.state.gameDetails.id,
      gameTitle: this.state.gameDetails.name,
      details: review,
      userId: this.userId
    };
    fetch('/api/games/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(this.grabUserReviews);
  }

  grabUserReviews() {
    fetch(`/api/games/reviews/${this.props.gameId}`)
      .then(response => response.json())
      .then(reviews => {
        this.setState({
          reviews
        });
      });
  }

  updateValue(searchInput) {
    this.setState({
      searchInput
    });
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.searchGames, 800);
  }

  searchGames() {
    if (this.state.searchInput !== '') {
      fetch(`/test/api/searchGames/${this.state.searchInput}`)
        .then(response => response.json())
        .then(games =>
          this.setState({
            games
          })
        )
        .catch(() => this.handleError());
    }
  }

  render() {
    if (this.state.gameDetails.slug && this.state.searchInput === '') {
      return (
        <>
          <div
            className={
              this.props.menuClicked ? 'blur-container' : 'page-container'
            }
          >
            <ToastContainer />
            <Navbar
              onChange={this.props.onChange}
              updateValue={this.updateValue}
              gameId={this.props.gameId}
            />
            <CreateGameDetails
              previousRoute={this.props.previousRoute}
              onChange={this.props.onChange}
              gameDetails={this.state.gameDetails}
              youtubeURL={this.state.youtubeURL}
              gamePhotos={this.state.gamePhotos}
              createDescription={this.createDescription}
              submitForm={this.sendUserReview}
              reviews={this.state.reviews}
              user={this.props.user}
            />
          </div>
          <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
        </>
      );
    } else if (this.state.searchInput !== '') {
      return (
        <>
          <div
            className={
              this.props.menuClicked ? 'blur-container' : 'page-container'
            }
          >
            <ToastContainer />
            <Navbar
              onChange={this.props.onChange}
              updateValue={this.updateValue}
              gameId={this.props.gameId}
            />
            <div className="mb-4 pl-3 text-white font-28">Games</div>
            <SearchResults
              games={this.state.games}
              updateValue={this.updateValue}
            />
          </div>
        </>
      );
    } else {
      return (
        <Loader
          className="text-center"
          type="Rings"
          color="White"
          height={175}
          width={175}
        />
      );
    }
  }
}
