import { Star, StarFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const StarRating = ({ totalStars = 5, initialRating = 0, onSubmit, pedidoStatus, starSize = '40px' }) => {
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleStarClick = (index) => {
    if (initialRating) {
      return;
    } else {
      setSelectedRating(index + 1);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedRating);
    }
  };

  return (
    <div>
      <div>
        <h5>Envie sua avaliação!</h5>
      </div>
      <div>
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
                }}
              />
            ) : (
              <Star
                style={{
                  color: 'gray',
                  fontSize: starSize,
                }}
              />
            )}
          </span>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button
          variant={initialRating ? 'secondary' : 'success'}
          style={{ marginTop: '10px', fontSize: '16px' }}
          onClick={!initialRating ? handleSubmit : null}
          disabled={pedidoStatus !== 'Entregue' || initialRating}
        >
          {initialRating ? 'Pedido Avaliado!' : 'Enviar Avaliação'}
        </Button>
      </div>
    </div>
  );
};

export default StarRating;
