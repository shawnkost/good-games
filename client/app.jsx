import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(location.hash)
      });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '' || path === 'new-releases' || path === 'upcoming-games') {
      return <Home path={path}/>;
    }
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
