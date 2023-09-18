import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './movieDetails.css'

function MovieDetails() {
    const { movie_id } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const IMG = 'https://image.tmdb.org/t/p/w500/'

    useEffect(() => {
      const API = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7bcb426dacf86ce836cb83650f71cbbb`;

      fetch(API)
      .then((res) => {
        if(!res.ok){
          throw new Error('Newtork response was not ok')
        }
        return res.json();
    })
      .then(data => setMovies(data))
      .catch((error) => setError(error.message))
    }, [])

    if(movies.length === 0){
      return <div>Loading...</div>;
    }

    if(error) {
      return <div>Error: {error}</div>
    }

  return (
    <div className='movie-details'>
        <img src={IMG + movies.poster_path} alt='movie poster'/>
        <h2 data-testid="movie-title">{movies.original_title}</h2>
        <p data-testid="movie-release-date">{(new Date(movies.release_date).toUTCString()).slice(0, -4)}</p>
        <p data-testid="movie-runtime">{movies.runtime}</p>
        <p data-testid="movie-overview">{movies.overview}</p>
        <button>Close</button>
    </div>
  )
}

export default MovieDetails;