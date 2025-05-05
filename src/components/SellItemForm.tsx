//Creates a form and page for users to sell their games and updates the database on th home page.

import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

export default function SellItemForm() {
  const [newItem, setNewItem] = useState({
    title: "",
    genre: "",
    price: "",
    condition: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => { //Found this on stack overflow.  Stared from the example and added from other sources and comments on original post.
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:3000/games", { //Will be using the db.json file 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price), // Ensure price is a number
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the item. Please try again.");
      }

      setSuccessMessage("Item successfully added!");
      setNewItem({ title: "", genre: "", price: "", condition: "", }); // Reset form
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

//Thought about having this be a component but decided to leave as is since the parent -> child -> grandchild was a too much for me to handle at the moment.
//Also wanted to try out drop-downs.
  return (
    <Container className="py-4"> 
      <h2 className="mb-4">Sell Your Game</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter the item title"
            value={newItem.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Label>Genre</Form.Label> 
        <Form.Select aria-label="Default select example" >
          <option>Select Genre of Game</option> 
          <option value="1">RPG</option>
          <option value="2">Puzzle</option>
          <option value="3">FPS</option>
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter the item price"
            value={newItem.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Label>Condition</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Condition of Game</option>
          <option value="1">New</option>
          <option value="2">Used</option>
        </Form.Select>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sell Item"}
        </Button>
      </Form>
    </Container>
  );
}