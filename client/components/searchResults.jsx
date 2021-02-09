import React from 'react';

export default function SearchResults(props) {
  const games = props.games;
  if (games) {
    const listOfGames = games.results.map((game, index) => {
      return (
        <div className="pl-3 search-result mb-4" key={index}>
          <div className="mr-2 d-inline-block search-img-container">
            <img src={game.background_image} className="w-100 h-100"></img>
          </div>
          <div className="d-inline-block text-white search-name">
            {game.name}
          </div>
        </div>
      );
    });
    return listOfGames;
  } else {
    return null;
  }
}
