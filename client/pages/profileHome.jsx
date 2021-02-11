import React from 'react';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
import ProfileReviews from '../components/profileReviews';
import Menu from '../components/menu';

export default class ProfileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: ''
    };
    this.grabUserReviews = this.grabUserReviews.bind(this);
  }

  componentDidMount() {
    this.grabUserReviews();
  }

  grabUserReviews() {
    const token = window.localStorage.getItem('jwt-token');
    fetch('/api/games/reviews/', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(response => response.json())
      .then(reviews => {
        this.setState({
          reviews
        });
      });
  }

  render() {

    if (!this.props.user) {
      return <Redirect to="#profile-login" />;
    }

    return (
      <>
        <div
          className={this.props.menuClicked ? 'blur-container' : 'page-container'}
        >
          <Navbar onChange={this.props.onChange} />
          <div className="d-inline-block pl-3 mb-4 profile-username text-white">
            {this.props.user.user ? this.props.user.user.username : this.props.user.username}
          </div>
          <div className="d-inline-block pl-3 mb-4 text-white" onClick={this.props.handleSignOut}>
            Sign Out
          </div>
          <div className="pl-3 text-white">My Reviews</div>
          <ProfileReviews reviews={this.state.reviews} />
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
