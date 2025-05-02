import { Form, Button } from 'react-bootstrap';

interface ReviewFormProps {
  newReview: { name: string; content: string; gameId: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ReviewForm({ newReview, handleChange, handleSubmit }: ReviewFormProps) {
  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your name"
          value={newReview.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Game ID</Form.Label>
        <Form.Control
          type="text"
          name="gameId"
          placeholder="Enter the game ID"
          value={newReview.gameId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
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