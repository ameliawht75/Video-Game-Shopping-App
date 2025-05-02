import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary text-white p-3 mb-4">
      <h1 className="mb-0">Video Game Buy, Sell, and Review</h1>
      <nav>
        <Link to="/" className="text-white me-3">Home</Link>
        <Link to="/cart" className="text-white me-3">Cart</Link>
        <Link to="/reviews" className="text-white me-3">Reviews</Link>
        <Link to="/sell" className="text-white">Sell</Link>
      </nav>
    </header>
  );
}