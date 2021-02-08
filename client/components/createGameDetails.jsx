import React from 'react';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import CreateScrollingImages from '../components/createScrollingImages';
import CheckPlatform from '../components/checkPlatforms';
import WriteReview from './writeReview';
import ShowReviews from './showReviews';

export default class CreateGameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false,
      wantToPlay: false
    };
    this.addPlayed = this.addPlayed.bind(this);
    this.addWantToPlay = this.addWantToPlay.bind(this);
  }

  addPlayed(event) {
    event.target.innerHTML = 'Played';
  }

  addWantToPlay(event) {
    event.target.innerHTML = 'Want to Play';
  }

  render() {
    return (
       <div className={this.props.menuClicked ? 'blur-container' : 'page-container'}>
         <div className="">
           <Navbar onChange={this.props.onChange} />
           <div className="mb-2 text-white text-center game-details-path">
             <a href="#" className="detail-links">
               <span>Home /</span>
             </a>
             <a href={`#${this.props.previousRoute.path}`} className="detail-links">
               <span> Games /</span>
             </a>
             <div className="d-inline-block">
               &nbsp;{this.props.gameDetails.name}
             </div>
           </div>
           <div className="text-center release-platform-container">
             <div className="mr-2 mb-2 text-white text-center game-details-date">
               {dayjs(this.props.gameDetails.released).format('MMM DD, YYYY')}
             </div>
             <CheckPlatform game={this.props.gameDetails} />
           </div>
           <div className="mb-2 text-center text-white game-details-name">
             {this.props.gameDetails.name}
           </div>
           <div className="scrolling-wrapper mb-4">
             <iframe
               className="screenshot align-middle"
               width="264"
               height="148"
               frameBorder="0"
               src={`https://www.youtube.com/embed/${this.props.youtubeURL}?autoplay=1&mute=0`}
               allow="autoplay"
               allowFullScreen
             ></iframe>
             <CreateScrollingImages images={this.props.gamePhotos} />
           </div>
           <div className="list-container">
             <div className="ml-3 mr-3 mb-4 text-center list-button-container" onClick={this.addPlayed}>
               Add to Played
             </div>
             <div className="ml-3 mr-3 mb-4 text-center list-button-container" onClick={this.addWantToPlay}>
               Add to Want to Play
             </div>
           </div>
           <div className="game-description pl-3">
             <div className="mb-2 text-white details-about">About</div>
             <div
               className="text-white details-bio"
               dangerouslySetInnerHTML={this.props.createDescription()}
             ></div>
           </div>
         </div>
         <div className="background-img-container">
           <div
             className="background-image"
             style={{
               backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${this.props.gameDetails.background_image})`
             }}
           ></div>
         </div>
         <WriteReview submitForm={this.props.submitForm} />
         {/* <div className="pl-3 mb-5 text-white user-reviews">User Reviews</div> */}
         <ShowReviews reviews={this.props.reviews} />
       </div>
    );
  }
}
