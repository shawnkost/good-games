import React from 'react';
import Loader from 'react-loader-spinner';

export default function SearchResults(props) {
  const games = props.games;
  if (games) {
    const listOfGames = games.results.map((game, index) => {
      return (
        <a href={`#game-details?gameId=${game.id}`} key={index}>
          <div className="pl-3 search-result mb-4">
            <div className="mr-2 d-inline-block search-img-container">
              <img src={game.background_image} className="w-100 h-100"></img>
            </div>
            <div className="d-inline-block text-white search-name">
              {game.name}
            </div>
          </div>
        </a>
      );
    });
    return listOfGames;
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
