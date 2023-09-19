import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieCard from "./component/movieCard";
import MovieDetails from "./component/movieDetails";
import Header from "./component/header";
import "./app.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=7bcb426dacf86ce836cb83650f71cbbb'

  useEffect(() => {
    fetch(API)
    .then((res) => {
      if(!res.ok) {
        throw new Error ('Network response was not ok')
      }
      return res.json()
  })
    .then(data => {
      const firstTen = data.results.slice(0, 10)
      setMovies(firstTen);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [])

  console.log(movies);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: error</div>
        ) : (
        <Routes>
          <Route path="/" element={
            <div>
              <Header />
              <div className="featured">
                <h1>Featured Movies</h1>
                <Link to="/">See more <ion-icon name="chevron-forward-outline"></ion-icon></Link>
              </div>

              <div className="movies">
                {movies.map((movie) => 
                  <div key={movie.id}>
                    <MovieCard {...movie} />
                  </div>
                )}
              </div>
            </div>
          } />
          <Route path="/movie/:movie_id" element={<MovieDetails />} />
        </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;