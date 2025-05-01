import { Outlet, NavLink } from "react-router-dom";

export default function Root() {

  return (
    <div className="container">
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">Game List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="./cart" className="nav-link">Cart</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
