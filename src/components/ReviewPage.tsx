//Review page for users to leave reviews of game.  Wanted it to do a sort but something with how I set up the API wouldn't allow.

import { useEffect, useState } from 'react';
import { Alert, ListGroup, Container, Row, Col } from 'react-bootstrap';
import ReviewForm from './ReviewForm';

const API_URL = 'https://6813fd32225ff1af1627a47a.mockapi.io/api/games/reviews';

interface Review {
  id: string;
  name: string;
  content: string;
  gameId: string;
  rating: number; //Added rating even though MockAPI didn't have it.
}

function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', content: '', gameId: '', rating: 0 }); 
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching reviews');
      }
    };

    fetchReviews();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent, rating: number) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReview, rating }), 
      });
      if (!res.ok) {
        throw new Error('Failed to submit review');
      }
      const data = await res.json();
      setReviews([...reviews, data]);
      setNewReview({ name: '', content: '', gameId: '', rating: 0 }); // Reset form
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the review');
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4">Game Reviews</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <ReviewForm
            newReview={newReview}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <h2 className="mb-3">All Reviews</h2>
          <ListGroup>
            {reviews.map((review) => (
              <ListGroup.Item key={review.id} className="mb-2">
                <strong>{review.name}</strong> (Game: {review.gameId})
                <p>{review.content}</p>
                <div>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>
                      {index < review.rating ? '⭐' : '☆'//Two different star icons as I could not figure out how to get mock API to show stars.
                      } 
                    </span>
                  ))}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ReviewPage;
