import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Bookings() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [editId, setEditId] = useState(null); 

  // Ticket prices
  const ticketPrices = {
    Royal: 190,
    Club: 150,
    Executive: 130,
  };

  // Load bookings from backend
  useEffect(() => {
    axios.get("https://movieticket-backend.onrender.com/bookings").then((res) => {
      setBookings(res.data);
    });

    // Pre-fill movie if passed from Movies.jsx
    if (location.state?.selectedMovie) {
      setMovie(location.state.selectedMovie.title);
    }
  }, [location.state]);

  // Calculate total
  const calculateTotal = () => {
    if (!ticketType || !seats) return 0;
    return ticketPrices[ticketType] * parseInt(seats, 10);
  };

  // Add or Update Booking
  const handleSaveBooking = async () => {
    if (!movie || !date || !time || !seats || !ticketType) {
      alert("Please fill all fields");
      return;
    }

    const totalAmount = calculateTotal();
    const bookingData = { movie, date, time, seats, ticketType, totalAmount };

    try {
      if (editId) {
        // Update existing booking
        await axios.put(`http://localhost:3001/bookings/${editId}`, {
          ...bookingData,
          id: editId,
        });
        setBookings(
          bookings.map((b) => (b.id === editId ? { ...bookingData, id: editId } : b))
        );
        alert("✏️ Booking updated successfully!");
        setEditId(null);
      } else {
        // Add new booking
        const res = await axios.post("http://localhost:3001/bookings", {
          ...bookingData,
          rating: null,
        });
        setBookings([...bookings, res.data]);
        alert(`✅ Booking successful! Total Amount: ₹${totalAmount}`);
      }

      // Reset form
      setMovie("");
      setDate("");
      setTime("");
      setSeats("");
      setTicketType("");
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  // Edit booking (load values into form)
  const handleEditBooking = (booking) => {
    setEditId(booking.id);
    setMovie(booking.movie);
    setDate(booking.date);
    setTime(booking.time);
    setSeats(booking.seats);
    setTicketType(booking.ticketType);
  };

  // Cancel (Delete) booking
  const handleCancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      setBookings(bookings.filter((b) => b.id !== id));
      alert("❌ Booking cancelled");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Rating update
  const handleRatingChange = async (id, newRating) => {
    try {
      await axios.patch(`http://localhost:3001/bookings/${id}`, { rating: newRating });
      setBookings(bookings.map((b) => (b.id === id ? { ...b, rating: newRating } : b)));
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="mb-4">🎟️ My Bookings</h2>

      {/* Booking Form */}
      <div className="card p-4 mb-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h5 className="mb-3">{editId ? "✏️ Edit Booking" : "Book a Ticket"}</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Movie Title"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Select Show Time</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="3:00 PM">3:00 PM</option>
          <option value="6:00 PM">6:00 PM</option>
          <option value="9:00 PM">9:00 PM</option>
          <option value="12:00 AM">12:00 AM</option>
        </select>
        <select
          className="form-control mb-2"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="">Select Ticket Type</option>
          <option value="Royal">Royal - ₹190</option>
          <option value="Club">Club - ₹150</option>
          <option value="Executive">Executive - ₹130</option>
        </select>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Number of Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        {/* Total Amount */}
        {ticketType && seats && (
          <div className="alert alert-info p-2 text-center">
            💰 Total Amount: <strong>₹{calculateTotal()}</strong>
          </div>
        )}

        <button className="btn btn-primary w-100" onClick={handleSaveBooking}>
          {editId ? "💾 Update Booking" : "➕ Add Booking"}
        </button>
      </div>

      {/* Booking List */}
      {bookings.length > 0 && (
        <div className="card p-3" style={{ width: "100%", maxWidth: "600px" }}>
          <h5>Bookings List</h5>
          <ul className="list-group">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="list-group-item d-flex justify-content-between align-items-start flex-wrap"
              >
                <div>
                  <strong>{b.movie}</strong> ({b.ticketType}) <br />
                  Date: {b.date} | Time: {b.time} | Seats: {b.seats} <br />
                  💰 Amount: ₹{b.totalAmount} <br />
                  Rating:{" "}
                  {b.rating ? (
                    <span>{b.rating} ⭐</span>
                  ) : (
                    <span className="text-muted">Not Rated Yet</span>
                  )}
                </div>
                <div className="d-flex flex-column gap-2">
                  <select
                    className="form-select w-auto"
                    value={b.rating || ""}
                    onChange={(e) => handleRatingChange(b.id, e.target.value)}
                  >
                    <option value="">Rate</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                  </select>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditBooking(b)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleCancelBooking(b.id)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Bookings;
