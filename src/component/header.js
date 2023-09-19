import React, { useState } from 'react';
import './header.css';
import imdb from './images/imdb image.png';
import pepper from './images/Pepper.png';
import tvImage from './images/tv image.png';

export default function Header() {
    const [error, setError] = useState(null);
    const [searchMovies, setSearchMovies] = useState('')

    const API = 'https://api.themoviedb.org/3/search/movie?api_key=7bcb426dacf86ce836cb83650f71cbbb&query='

    const handleSearch = (e) => {
        e.preventDefault();

        fetch(API)
        .then(res => res.json())
        .then((data) => setSearchMovies(data.results))
        .catch((error) => setError(error.message))
    }
  return (
    <div>
        <header>
          <div className="container">
            <div className="logo">
              <img src={tvImage} alt="logo" width="50px" height="50px" />
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
                <img src={imdb} alt="imdb" height="17px" width="35px" />
                <p>86.0/100</p>
              </div>
              <div className="pepper">
                <img src={pepper} alt="Pepper" />
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
    </div>
  )
}