import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieCard from "./component/movieCard";
import MovieDetails from "./component/movieDetails";
import "./app.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=7bcb426dacf86ce836cb83650f71cbbb'
  const SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=7bcb426dacf86ce836cb83650f71cbbb&query='

  useEffect(() => {
    fetch(API)
    .then((res) => {
      if(!res.ok) {
        throw new Error ('Network response was not ok')
      }
      return res.json()
  })
    .then(data => {
      setMovies(data.results);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [])

  console.log(movies);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(SEARCH + searchMovies)
    .then(res => res.json())
    .then(data => setSearchMovies(data.results))
    .catch((error) => setError(error.message));
  }

  return (
    <Router>
      <div className="App">
        <header>
          <div className="container">
            <div className="logo">
              <img src="images/tv image.png" alt="logo" width="50px" height="50px" />
              <p>Movie Box</p>
            </div>
            <form>
              <div className="search">
                <input type="text" placeholder="What do you want to watch?" 
                  onChange={(e) => setSearchMovies(e.target.value)} />
                <ion-icon name="search-outline" onClick={handleSearch}></ion-icon>
              </div>
            </form>
            <div className="signIn">
              <p>Sign In</p>
              <ion-icon name="reorder-two-outline"></ion-icon>
            </div>
          </div>
        </header>
        <section>
          <div className="description">
            <h1>John Wick 3: Parabellum</h1>
            <div className="properties">
              <div className="imdb">
                <img src="./images/imdb image.png" alt="imdb" height="17px" width="35px" />
                <p>86.0/100</p>
              </div>
              <div className="pepper">
                <img src="./images/Pepper.png" alt="Pepper" />
                <p>97%</p>
              </div> 
            </div>
            <p>John Wick is on the run after killing a member of the international assassins guild, and 
              with a $14 million price tag on his head he is the target of hitmen and women everywhere
            </p>
            <div className="watch-btn">
              <ion-icon name="play-circle-outline"></ion-icon>
              <a href="#">WATCH TRAILER</a>
            </div>
          </div>
        </section>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: error</div>
        ) : (
        <Routes>
          <Route path="/" element={
            <div>
              <div className="featured">
                <h1>Featured Movies</h1>
                <Link to="#">See more <ion-icon name="chevron-forward-outline"></ion-icon></Link>
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
          <Route path="/movie/:external_id" element={<MovieDetails />} />
        </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;