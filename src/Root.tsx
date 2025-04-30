import { Outlet, Link } from "react-router-dom";

export default function Root() {

  return (
    <div className="container">
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <Link to="/" className="nav-link">Game List</Link>
        </li>
        <li className="nav-item">
          <Link to="./cart" className="nav-link">Cart</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
