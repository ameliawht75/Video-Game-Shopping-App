import { Form, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

interface ReviewFormProps {
  newReview: { name: string; content: string; gameId: string; rating: number };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent, rating: number) => void; // Ensure handleSubmit accepts rating
}

const colors = {
  orange: "#F2C265",
  grey: "a9a9a9"
};

const stars = Array(5).fill(0);

export default function ReviewForm({ newReview, handleChange, handleSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleMouseOverStar = (value: number) => {
    setHover(value);
  };

  const handleMouseLeaveStar = () => {
    setHover(0);
  };

  const handleClickStar = (value: number) => {
    setRating(value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e, rating); // Pass rating to handleSubmit
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your name"
          value={newReview.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="gameId">
        <Form.Label>Game</Form.Label>
        <Form.Control
          type="text"
          name="gameId"
          placeholder="Name of the game"
          value={newReview.gameId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <div>
          {stars.map((_, index) => (
            <FaStar
              key={index}
              size={24}
              color={(hover || rating) > index ? colors.orange : colors.grey}
              onClick={() => handleClickStar(index + 1)}
              onMouseOver={() => handleMouseOverStar(index + 1)}
              onMouseLeave={handleMouseLeaveStar}
            />
          ))}
        </div>
        <p>({rating} Stars)</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          placeholder="Write your review"
          value={newReview.content}
          onChange={handleChange}
          rows={3}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit Review
      </Button>
    </Form>
  );
}