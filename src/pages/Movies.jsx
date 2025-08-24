import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Movies() {
  const navigate = useNavigate();

  // Movies separated by language
  const moviesByLanguage = {
    English: [
      { id: 1, title: "Inception", duration: "148 mins", synopsis: "A mind-bending thriller" },
      { id: 2, title: "Interstellar", duration: "169 mins", synopsis: "Sci-fi adventure" },
      { id: 3, title: "The Dark Knight", duration: "152 mins", synopsis: "Superhero action" },
      { id: 4, title: "Avengers: Endgame", duration: "181 mins", synopsis: "Superhero epic" },
      { id: 5, title: "Titanic", duration: "195 mins", synopsis: "Romantic tragedy" },
      { id: 6, title: "Jurassic Park", duration: "127 mins", synopsis: "Dinosaur adventure" },
      { id: 7, title: "The Matrix", duration: "136 mins", synopsis: "Sci-fi action" },
      { id: 8, title: "Gladiator", duration: "155 mins", synopsis: "Epic drama" },
      { id: 9, title: "Forrest Gump", duration: "142 mins", synopsis: "Heartwarming drama" },
      { id: 10, title: "The Lion King", duration: "88 mins", synopsis: "Animated classic" },
    ],
    Hindi: [
      { id: 11, title: "3 Idiots", duration: "170 mins", synopsis: "Comedy drama" },
      { id: 12, title: "Baahubali", duration: "159 mins", synopsis: "Epic action saga" },
      { id: 13, title: "Dangal", duration: "161 mins", synopsis: "Sports biopic" },
      { id: 14, title: "PK", duration: "153 mins", synopsis: "Comedy drama" },
      { id: 15, title: "Kabir Singh", duration: "173 mins", synopsis: "Romantic drama" },
      { id: 16, title: "Chhichhore", duration: "143 mins", synopsis: "Comedy drama" },
      { id: 17, title: "Bajrangi Bhaijaan", duration: "159 mins", synopsis: "Drama adventure" },
      { id: 18, title: "Raees", duration: "143 mins", synopsis: "Action drama" },
      { id: 19, title: "War", duration: "154 mins", synopsis: "Action thriller" },
      { id: 20, title: "Mission Mangal", duration: "153 mins", synopsis: "Space drama" },
    ],
    Tamil: [
      { id: 21, title: "Master", duration: "179 mins", synopsis: "Action drama" },
      { id: 22, title: "Soorarai Pottru", duration: "153 mins", synopsis: "Biographical drama" },
      { id: 23, title: "Vikram", duration: "176 mins", synopsis: "Action thriller" },
      { id: 24, title: "Sarkar", duration: "171 mins", synopsis: "Political action" },
      { id: 25, title: "Kaala", duration: "155 mins", synopsis: "Action drama" },
      { id: 26, title: "Mersal", duration: "170 mins", synopsis: "Action thriller" },
      { id: 27, title: "Petta", duration: "179 mins", synopsis: "Action drama" },
      { id: 28, title: "Asuran", duration: "141 mins", synopsis: "Drama action" },
      { id: 29, title: "Bigil", duration: "179 mins", synopsis: "Sports action" },
      { id: 30, title: "Etharkkum Thunindhavan", duration: "140 mins", synopsis: "Action thriller" },
    ],
    Malayalam: [
      { id: 31, title: "Drishyam", duration: "130 mins", synopsis: "Crime thriller" },
      { id: 32, title: "Premam", duration: "150 mins", synopsis: "Romantic drama" },
      { id: 33, title: "Bangalore Days", duration: "150 mins", synopsis: "Coming-of-age drama" },
      { id: 34, title: "Virus", duration: "120 mins", synopsis: "Medical thriller" },
      { id: 35, title: "Kumbalangi Nights", duration: "135 mins", synopsis: "Family drama" },
      { id: 36, title: "Uyare", duration: "130 mins", synopsis: "Inspirational drama" },
      { id: 37, title: "Take Off", duration: "140 mins", synopsis: "Thriller drama" },
      { id: 38, title: "Joji", duration: "125 mins", synopsis: "Drama thriller" },
      { id: 39, title: "Moothon", duration: "148 mins", synopsis: "Action drama" },
      { id: 40, title: "Maheshinte Prathikaaram", duration: "130 mins", synopsis: "Comedy drama" },
    ],
  };

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [visibleCount, setVisibleCount] = useState(8); // initially show 8 movies
  const [searchTerm, setSearchTerm] = useState(""); // search state

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleBookNow = (movie) => {
    navigate("/bookings", { state: { selectedMovie: movie } });
  };

  // Filter movies based on search term
  const filteredMovies = moviesByLanguage[selectedLanguage].filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🎬 Movies</h2>

      {/* Language Tabs */}
      <div className="mb-3">
        {Object.keys(moviesByLanguage).map((lang) => (
          <button
            key={lang}
            className={`btn me-2 mb-2 ${selectedLanguage === lang ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setSelectedLanguage(lang);
              setVisibleCount(8);
              setSearchTerm(""); // reset search when switching language
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Movies List */}
      <div className="card p-3">
        <ul className="list-group">
          {filteredMovies.slice(0, visibleCount).map((movie) => (
            <li
              key={movie.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{movie.title}</strong> ({movie.duration}) <br />
                <small>{movie.synopsis}</small>
              </div>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleBookNow(movie)}
              >
                🎟️ Book Now
              </button>
            </li>
          ))}

          {/* No results message */}
          {filteredMovies.length === 0 && (
            <li className="list-group-item text-center text-muted">
              No movies found.
            </li>
          )}
        </ul>

        {/* Load More Button */}
        {visibleCount < filteredMovies.length && (
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              ➕ Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
