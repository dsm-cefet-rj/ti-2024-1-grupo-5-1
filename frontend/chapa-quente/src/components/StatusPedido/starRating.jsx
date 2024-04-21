import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ totalStars = 5, initialRating = 0, onRatingChange, starSize = '40px' }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);

    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => (
        <span
          key={index}
          style={{
            cursor: 'pointer',
            fontSize: starSize,
            padding: '2px', // Para dar espaço para a borda
          }}
          onClick={() => handleStarClick(index)}
        >
          {index < rating ? (
            <StarIcon
              style={{
                color: 'gold', 
                fontSize: starSize,
                stroke: 'black', // Borda preta
                strokeWidth: '0.5px', // Largura da borda
              }}
            />
          ) : (
            <StarBorderIcon
              style={{
                color: 'gray',
                fontSize: starSize,
                stroke: 'black', // Borda preta
                strokeWidth: '0.5px', 
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
