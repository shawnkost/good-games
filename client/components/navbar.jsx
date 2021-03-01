import React, { useState } from 'react';

export default function Navbar(props) {
  const [input, setInput] = useState('');

  function handleClick(event) {
    props.onChange(event);
  }

  function updateValue(event) {
    setInput(event.target.value);
    props.updateValue(event.target.value);
  }

  function resetValue() {
    setInput('');
    props.updateValue('');
  }

  return (
      <div className="container-fluid mb-4">
        <div className="row py-2 align-items-center font-Yeseva">
          <a
            href="#"
            className={input !== '' ? 'hide' : 'col-4 col-md pl-md-5 text-white font-24 logo'}
          >
            GG
          </a>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={input}
            className={
              input !== ''
                ? 'ml-3 mr-3 w-100 search-input text-white'
                : 'col-4 col-md-4 search-input text-white'
            }
            onChange={updateValue}
          ></input>
          <i className={input !== '' ? 'fas fa-times text-white search-close cursor-pointer' : 'hide'} onClick={resetValue}></i>
          <a className={input !== '' ? 'hide' : 'col-4 col-md pr-md-5 text-right menu-icon'}>
            <i
              className="fas fa-bars text-white font-24 menu-icon2 cursor-pointer"
              onClick={handleClick}
            ></i>
          </a>
        </div>
      </div>
  );
}
