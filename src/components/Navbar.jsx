import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div className="container">
      {/* Brand */}
      <Link className="navbar-brand fw-bold fs-3 text-warning" to="/">
        🎬 CineLuxe
      </Link>

      {/* Toggler */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="ms-auto d-flex">
          <Link className="btn btn-outline-light me-2" to="/movies">
            Movies
          </Link>
          <Link className="btn btn-outline-light" to="/bookings">
            My Bookings
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
