import React from 'react';
import Form from '../components/form';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import SearchResults from '../components/searchResults';
import FacebookPhoto from '../images/facebookPhoto.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class ContactMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      games: ''
    };
    this.timeoutId = '';
    this.handleError = this.handleError.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.searchGames = this.searchGames.bind(this);
  }

  handleError() {
    toast.error('An unexpected error occurred retrieving data');
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
      fetch(`/api/searchGames/${this.state.searchInput}`)
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
    if (this.state.searchInput !== '') {
      return (
        <>
          <div className={this.props.menuClicked ? 'blur-container' : 'page-container'}>
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
          <div className="pl-3 pl-md-5 mr-3 mr-sm-5 mb-3 d-inline-block avatar-container">
            <img
              src={FacebookPhoto}
              className="w-100 avatar"
              alt="avatar"
            ></img>
          </div>
          <div className="pl-lg-5 d-inline-block text-white font-24 contact-name font-Yeseva">Shawn Kost</div>
          <p className="pl-3 pl-md-5 pr-3 pr-md-5 text-white font-18 font-Josefin contact-bio">
            Hello! My name is Shawn Kost, and I am a full-stack web developer.
            GoodGames is a full stack web application for gamers to find new
            games to play, leave reviews about games, and add games to their
            list. I began development on this project during my last two weeks of LearningFuze&apos;s full-immersion web development bootcamp. If you have any feedback regarding the site,
            or if you would like to contact me, please fill out the form below.
          </p>
          <Form />
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
