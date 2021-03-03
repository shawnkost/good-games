import React from 'react';
import Home from './home';

export default function NewReleases(props) {
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
