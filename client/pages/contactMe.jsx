import React from 'react';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import SearchResults from '../components/searchResults';
import FacebookPhoto from '../images/facebookPhoto.jpg';

export default class ContactMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      games: ''
    };
    this.timeoutId = '';
    this.updateValue = this.updateValue.bind(this);
    this.searchGames = this.searchGames.bind(this);
  }

  updateValue(searchInput) {
    this.setState({
      searchInput
    });
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.searchGames, 800);
  }

  searchGames() {
    fetch(`/api/searchGames/${this.state.searchInput}`)
      .then(response => response.json())
      .then(games =>
        this.setState({
          games
        })
      );
  }

  render() {
    if (this.state.searchInput !== '') {
      return (
        <>
          <div
            className={
              this.props.menuClicked ? 'blur-container' : ''
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
          <div className="d-inline-block avatar-container">
            <img
              src={FacebookPhoto}
              className="w-100 h-100 avatar"
              alt="avatar"
            ></img>
          </div>
          <div className="d-inline-block text-white">Shawn Kost</div>
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
