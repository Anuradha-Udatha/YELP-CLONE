import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      // Full stars
      stars.push(<i key={i} className="fa-solid fa-star" style={{color: "gold"}}></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // Half star
      stars.push(<i key={i} className="fa-solid fa-star-half-alt" style={{color: "gold"}}></i>);
    } else {
      // Empty stars
      stars.push(<i key={i} className="fa-regular fa-star" style={{color: "gray"}}></i>);
    }
  }

  return (
    <>
      {stars}
    </>
  );
};

export default StarRating;
