import React from 'react';
import { Link } from 'react-router-dom';
import './movieCard.css'

const MovieCard = (props) => {

    const IMG = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div>
        <div className='movie-card' data-testid='movie-card'>
            <Link to={`/movie/${props.id}`}>
            <div className='poster' data-testid='movie-poster'>
                <img src={IMG + props.poster_path} alt='movie poster'/>
            </div>

            <div className='info'>
                <p className='title' data-testid='movie-title'>{props.title}</p>
                <p className='release-date' data-testid='movie-release-date'>{props.release_date}</p>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default MovieCard