import React from 'react';
import Home from './home';

export default function UpcomingGames(props) {
  return (
      <>
        <Home
          path={props.path}
          onChange={props.onChange}
          click={props.click}
          menuClicked={props.menuClicked}
        />
      </>
  );
}
