import React, { useState, useCallback } from 'react';
import Form from '../components/form';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import SearchResults from '../components/searchResults';
import FacebookPhoto from '../images/facebookPhoto.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import axios from 'axios';

toast.configure();

export default function ContactMe(props) {
  const [searchInput, setSearchInput] = useState('');
  const [games, setGames] = useState('');

  const handleError = () => {
    toast.error('An unexpected error occurred retrieving data');
  };

  const handleDebounce = useCallback(
    debounce(value => searchGames(value), 800),
    []
  );

  const updateValue = value => {
    setSearchInput(value);
    handleDebounce(value);
  };

  const searchGames = async value => {
    if (value !== '') {
      try {
        const response = await axios.get(`/api/searchGames/${value}`);
        setGames(response.data);
      } catch {
        handleError();
      }
    }
  };

  if (searchInput !== '') {
    return (
      <>
        <div
          className={props.menuClicked ? 'blur-container' : 'page-container'}
        >
          <Navbar onChange={props.onChange} updateValue={updateValue} />
        </div>
        <SearchResults games={games} />
        <Menu click={props.click} menuClicked={props.menuClicked} />
      </>
    );
  } else {
    return (
      <>
        <div
          className={props.menuClicked ? 'blur-container' : 'page-container'}
        >
          <Navbar onChange={props.onChange} updateValue={updateValue} />
          <div className="d-flex align-items-center pl-3 pl-md-5 mb-3">
            <div
              className="mr-3 mr-sm-5 avatar-container"
              style={{ backgroundImage: `url(${FacebookPhoto})` }}
            ></div>
            <div className="pl-lg-5 text-white font-24 contact-name font-Yeseva">
              Shawn Kost
            </div>
          </div>
          <p className="pl-3 pl-md-5 pr-3 pr-md-5 text-white font-18 font-Josefin contact-bio">
            Hello! My name is Shawn Kost, and I am a full-stack web developer.
            GoodGames is a full stack web application for gamers to find new
            games to play, leave reviews about games, and add games to their
            list. I began development on this project during my last two weeks
            of LearningFuze&apos;s full-immersion web development bootcamp. If
            you have any feedback regarding the site, or if you would like to
            contact me, please fill out the form below.
          </p>
          <Form />
        </div>
        <Menu click={props.click} menuClicked={props.menuClicked} />
      </>
    );
  }
}
