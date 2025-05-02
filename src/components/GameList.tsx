import { useState } from "react";
import type { Game } from "../types";
import { useLoaderData, Link } from "react-router-dom";
import { Card, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";

export const gamesListLoader = async () => {
  try {
    const response = await fetch("http://localhost:3000/games");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load games:", error);
    return [];
  }
};

export default function GameList() {
  const games = useLoaderData() as Game[];
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Loading indicator for adding to cart
  const [error, setError] = useState<null | string>(null); // Error handling

  const addToCart = async (gameId: number) => {
    const newCartItem = {
      gameId: gameId,
      amount: 1,
    };
    setIsAddingToCart(true);
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        body: JSON.stringify(newCartItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError("There was an error adding the item to the cart: " + response.statusText);
      }
    } catch (error: any) {
      setError("There was an error adding the item to the cart: " + error.message);
    }
    setIsAddingToCart(false);
  };

  return (
    <Container className="py-4">
      <h2 className="display-5 mb-4 text-center">Check Out Our Games!</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4">
        {games.length === 0 ? (
          <Col>
            <p className="text-muted text-center">No games found</p>
          </Col>
        ) : (
          games.map((game) => (
            <Col key={game.id} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <Card.Text>
                    <strong>Genre:</strong> {game.genre}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${game.price.toFixed(2)}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/games/${game.id}`} className="btn btn-secondary">
                      Details
                    </Link>
                    <Button
                      variant="primary"
                      disabled={isAddingToCart}
                      onClick={() => addToCart(game.id)}
                    >
                      {isAddingToCart ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Adding...
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
