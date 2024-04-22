import { Star, StarFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const StarRating = ({ totalStars = 5, initialRating = 0, onSubmit, starSize = '40px' }) => {
  const [rating, setRating] = useState(initialRating);
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleStarClick = (index) => {
    setSelectedRating(index + 1);
  };

  const handleSubmit = () => {
    setRating(selectedRating);
    if (onSubmit) {
      onSubmit(selectedRating);
    }
  };

  return (
    <div>
      <h4>Avaliação do Pedido:</h4>
      {Array.from({ length: totalStars }, (_, index) => (
        <span
          key={index}
          style={{
            cursor: 'pointer',
            fontSize: starSize,
            padding: '2px',
          }}
          onClick={() => handleStarClick(index)}
        >
          {index < selectedRating ? (
            <StarFill
              style={{
                color: 'gold',
                fontSize: starSize,
                stroke: 'black',
                strokeWidth: '0.5px',
              }}
            />
          ) : (
            <Star
              style={{
                color: 'gray',
                fontSize: starSize,
                stroke: 'black',
                strokeWidth: '0.5px',
              }}
            />
          )}
        </span>
      ))}
      <div>
        <Button
          variant="primary"
          style={{ marginTop: '10px', fontSize: '16px' }}
          onClick={handleSubmit}
        >
          Enviar avaliação de {selectedRating} estrelas
        </Button>
      </div>
    </div>
  );
};

export default StarRating;
