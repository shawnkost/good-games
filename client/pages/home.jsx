import React from 'react';
import GameSort from '../components/gameSort';
import Navbar from '../components/navbar';

export default function Home(props) {
  return (
    <>
      <Navbar />
      <GameSort />
    </>
  );
}
