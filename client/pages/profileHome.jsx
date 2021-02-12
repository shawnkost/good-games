import React from 'react';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
import ProfileReviews from '../components/profileReviews';
import Menu from '../components/menu';
import SearchResults from '../components/searchResults';
import APIKEY from '../api.json';

export default class ProfileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: '',
      searchInput: '',
      games: ''
    };
    this.grabUserReviews = this.grabUserReviews.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.searchGames = this.searchGames.bind(this);
  }

  componentDidMount() {
    this.grabUserReviews();
  }

  grabUserReviews() {
    const token = window.localStorage.getItem('jwt-token');
    fetch('/api/games/reviews/', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(reviews => {
        if (reviews.error) {
          this.props.handleSignOut();
        }
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
    if (!this.props.user) {
      return <Redirect to="#profile-login" />;
    }

    if (this.state.searchInput !== '') {
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
          </div>
          <SearchResults games={this.state.games} />
          <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
        </>
      );
    }
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
          <div className="pl-3 mb-4 text-white text-center font-36 font-Yeseva">
            My Reviews
          </div>
          <ProfileReviews reviews={this.state.reviews} />
          <div
            className="pr-2 mb-4 text-white text-center font-24 font-Yeseva"
            onClick={this.props.handleSignOut}
          >
            Sign Out
          </div>
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
