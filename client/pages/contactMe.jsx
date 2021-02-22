import React from 'react';
import Form from '../components/form';
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
          <div className={this.props.menuClicked ? 'blur-container' : ''}>
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
          <div className="d-inline-block text-white font-24">Shawn Kost</div>
          <p className="text-white">
            Hello! My name is Shawn Kost, and I am a full-stack web developer.
            GoodGames is a full stack web application for gamers to find new
            games to play, leave reviews about games, and add games to their
            list. I began development on this project during my last two weeks of LearningFuze&apos;s full-time web development bootcamp.
          </p>
          <Form />
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
