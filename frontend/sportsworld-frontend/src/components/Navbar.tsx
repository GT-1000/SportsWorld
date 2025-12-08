import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SportsWorld ⚽</div>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/admin">Admin Athletes</Link>
        <Link to="/register">Register Athlete</Link>
      </div>
    </nav>
  );
}