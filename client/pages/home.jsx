import React, { useCallback, useState } from 'react';
import Games from '../components/games';
import GameSort from '../components/gameSort';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import SearchResults from '../components/searchResults';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';

toast.configure();

export default function Home(props) {
  const [platform, setPlatform] = useState(4);
  const [searchInput, setSearchInput] = useState('');
  const [games, setGames] = useState('');

  const handleError = () => {
    toast.error('An unexpected error occurred retrieving data');
  };

  const handleDebounce = useCallback(
    debounce(value => searchGames(value), 800),
    []
  );

  const savePlatform = value => {
    setPlatform(value);
  };

  const updateValue = value => {
    setSearchInput(value);
    handleDebounce(value);
  };

  const searchGames = value => {
    if (value !== '') {
      fetch(`/api/searchGames/${value}`)
        .then(response => response.json())
        .then(games => setGames(games))
        .catch(() => handleError());
    }
  };

  if (searchInput === '') {
    return (
      <>
        <div
          className={props.menuClicked ? 'blur-container' : 'page-container'}
        >
          <Navbar onChange={props.onChange} updateValue={updateValue} />
          <GameSort onChange={savePlatform} path={props.path} />
          <Games platform={platform} path={props.path} />
        </div>
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
          <div className="mb-4 pl-3 text-white search-games">Games</div>
          <SearchResults games={games} />
        </div>
      </>
    );
  }
}
