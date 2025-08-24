import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page text-center d-flex flex-column justify-content-center align-items-center">
      <div className="hero-section p-5">
        <h1 className="display-4 fw-bold mb-3 text-gradient">
          🎬 Welcome to Movie Ticket Booking
        </h1>
        

        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <Link to="/movies" className="btn btn-primary btn-lg shadow-lg">
            🎟 Browse Movies
          </Link>
          <Link to="/bookings" className="btn btn-success btn-lg shadow-lg">
            📖 My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;