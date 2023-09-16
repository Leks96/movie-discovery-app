import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails({ movie, onClose }) {
    const { external_id } = useParams();
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState('');

    useEffect =(() => {
      const API = 'https://api.themoviedb.org/3/find/${external_id}?api_key=7bcb426dacf86ce836cb83650f71cbbb'

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

    if(!movie){
      return <div>Loading...</div>;
    }

    if(error) {
      return <div>Error: {error}</div>
    }

  return (
    <div className='movie-details'>
        <h2 data-testid="movie-title">{movie.title}</h2>
        <p data-testid="movie-release-date">{movie.release_date}</p>
        <p data-testid="movie-runtime">{movie.runtime}</p>
        <p data-testid="movie-overview">{movie.overview}</p>
        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default MovieDetails;