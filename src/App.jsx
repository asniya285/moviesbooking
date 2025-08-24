import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* ✅ Navbar always at the top */}
        <Navbar />

        {/* ✅ Main content area with spacing */}
        <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5 px-3">
          <div className="w-100" style={{ maxWidth: "1200px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </div>
        </main>

        {/* ✅ Footer always at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;