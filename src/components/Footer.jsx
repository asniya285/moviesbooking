import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => (
  <footer className="bg-dark text-light pt-5 pb-3 mt-5">
    <div className="container">
      <div className="row">
        {/* About Section */}
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold">🎬 CineLuxe</h5>
          <p className="small text-muted">
            Book, edit, or cancel your favorite movie tickets with ease.
            Enjoy a seamless movie experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold">Quick Links</h6>
          <ul className="list-unstyled">
            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
            <li><a href="/movies" className="text-light text-decoration-none">Movies</a></li>
            <li><a href="/bookings" className="text-light text-decoration-none">My Bookings</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="col-md-3 mb-4">
          <h6 className="fw-bold">Support</h6>
          <ul className="list-unstyled">
            <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
            <li><a href="#" className="text-light text-decoration-none">Terms & Conditions</a></li>
            <li><a href="#" className="text-light text-decoration-none">Help & Support</a></li>
            <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="col-md-3 mb-4">
          <h6 className="fw-bold mb-3">Follow Us</h6>
          <div className="d-flex gap-3">
            <a href="#" className="text-light fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light fs-5">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-light fs-5">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-light fs-5">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-light opacity-25" />
      <div className="text-center small">
        © {new Date().getFullYear()} CineLuxe. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
