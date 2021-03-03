import React from 'react';

export default function CreateScrollingImages(props) {
  if (props.images !== '') {
    const screenshots = props.images.results.map((image, index) => {
      return (
        <div className="screenshot mr-2" key={index}>
          <img
            className="w-100 h-100 game-details-images"
            src={image.image}
          ></img>
        </div>
      );
    });
    return screenshots;
  }
  return null;
}
