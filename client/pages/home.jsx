import React from 'react';
import APIKEY from '../api.json';
import Games from '../components/games';
import GameSort from '../components/gameSort';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import SearchResults from '../components/searchResults';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: 4,
      searchInput: '',
      games: ''
    };
    this.timeoutId = '';
    this.savePlatform = this.savePlatform.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.searchGames = this.searchGames.bind(this);
  }

  savePlatform(value) {
    this.setState({
      platform: value
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
    if (this.state.searchInput === '') {
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
            <GameSort onChange={this.savePlatform} path={this.props.path} />
            <Games platform={this.state.platform} path={this.props.path} />
          </div>
          <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
        </>
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
            <div className="mb-4 pl-3 text-white search-games">Games</div>
            <SearchResults games={this.state.games} />
          </div>
        </>
      );
    }
  }
}
