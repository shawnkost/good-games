import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.resetValue = this.resetValue.bind(this);
  }

  handleClick(event) {
    this.props.onChange(event);
  }

  updateValue(event) {
    this.setState({
      input: event.target.value
    });
    this.props.updateValue(event.target.value);
  }

  resetValue() {
    this.setState({
      input: ''
    });
    this.props.updateValue('');
  }

  render() {
    return (
      <div className="container-fluid mb-4">
        <div className="row py-2 align-items-center header-row">
          <a
            href="#"
            className={this.state.input !== '' ? 'hide' : 'col-4 text-white logo'}
          >
            GG
          </a>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={this.state.input}
            className={
              this.state.input !== ''
                ? 'ml-3 mr-3 w-100 search-input text-white'
                : 'col-4 search-input text-white'
            }
            onChange={this.updateValue}
          ></input>
          <i className={this.state.input !== '' ? 'fas fa-times text-white search-close' : 'hide'} onClick={this.resetValue}></i>
          <a className={this.state.input !== '' ? 'hide' : 'col-4 text-right'}>
            <i
              className="fas fa-bars text-white menu"
              onClick={this.handleClick}
            ></i>
          </a>
        </div>
      </div>
    );
  }
}
