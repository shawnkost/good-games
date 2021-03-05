import React, { useEffect, useState, useCallback } from 'react';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
import ProfileReviews from '../components/profileReviews';
import Menu from '../components/menu';
import SearchResults from '../components/searchResults';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import axios from 'axios';

toast.configure();

export default function ProfileHome(props) {
  const [reviews, setReviews] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [games, setGames] = useState('');

  useEffect(() => {
    grabUserReviews();
  }, []);

  if (!props.user) {
    return <Redirect to="#profile-login" />;
  }

  const handleError = () => {
    toast.error('An unexpected error occurred retrieving data');
  };

  const grabUserReviews = async () => {
    const token = window.localStorage.getItem('jwt-token');
    try {
      const response = await axios.get('/api/games/reviews/', {
        headers: {
          'X-Access-Token': token
        }
      });
      setReviews(response.data);
    } catch {
      return props.handleSignOut();
    }
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
  }
  return (
    <>
      <div className={props.menuClicked ? 'blur-container' : 'page-container'}>
        <Navbar onChange={props.onChange} updateValue={updateValue} />
        <div className="pl-3 mb-4 text-white text-center font-36 font-Yeseva">
          My Reviews
        </div>
        <ProfileReviews reviews={reviews} />
        <div
          className="pr-2 mb-4 text-white text-center font-24 font-Yeseva cursor-pointer"
          onClick={props.handleSignOut}
        >
          Sign Out
        </div>
      </div>
      <Menu click={props.click} menuClicked={props.menuClicked} />
    </>
  );
}
