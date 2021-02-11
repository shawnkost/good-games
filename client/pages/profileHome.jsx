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
        if (reviews.error) {
          this.props.handleSignOut();
        }
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
          className={
            this.props.menuClicked ? 'blur-container' : 'page-container'
          }
        >
          <Navbar onChange={this.props.onChange} />
          <div className="pl-3 mb-4 text-white text-center my-reviews">My Reviews</div>
          <ProfileReviews reviews={this.state.reviews} />
          <div
            className="pr-2 mb-4 text-white text-center sign-out"
            onClick={this.props.handleSignOut}
          >
            Sign Out
          </div>
        </div>
        <Menu click={this.props.click} menuClicked={this.props.menuClicked} />
      </>
    );
  }
}
