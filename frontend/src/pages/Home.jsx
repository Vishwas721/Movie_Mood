// ====================================================================
// File: Movie_Review_System/frontend/src/pages/Home.jsx
// ====================================================================

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const popularMovies = [
    { id: 1, title: 'The Shawshank Redemption', rating: '⭐ 9.3', poster: '/images/posters/shawshank.jpg' },
    { id: 2, title: 'The Dark Knight', rating: '⭐ 9.0', poster: '/images/posters/dark-knight.jpg' },
    { id: 3, title: 'Inception', rating: '⭐ 8.8', poster: '/images/posters/inception.jpg' },
    { id: 4, title: 'Kantara', rating: '⭐ 8.9', poster: '/images/posters/pulp-fiction.jpg' },
    { id: 5, title: 'Forrest Gump', rating: '⭐ 8.8', poster: '/images/posters/forrest-gump.jpg' },
    { id: 6, title: 'The Matrix', rating: '⭐ 8.7', poster: '/images/posters/matrix.jpg' },
  ];

  const recentReviews = [
    {
      id: 1,
      movie: 'The Shawshank Redemption',
      text: 'An absolute masterpiece! The storytelling, acting, and cinematography are all top-notch.',
      sentiment: 'positive',
    },
    {
      id: 2,
      movie: 'The Dark Knight',
      text: 'Heath Ledger performance as the Joker is legendary. Best superhero movie ever made!',
      sentiment: 'positive',
    },
    {
      id: 3,
      movie: 'Inception',
      text: 'Mind-bending plot but a bit confusing. Not for everyone, but worth watching.',
      sentiment: 'positive',
    },
    {
      id: 4,
      movie: 'Movie X',
      text: 'Terrible pacing and weak plot. Would not recommend watching this one.',
      sentiment: 'negative',
    },
  ];

  return (
    <div className="page-content home-content">
      <div className="hero">
        <h1>🎬 Movie Review Analyzer</h1>
        <p>Discover popular movies and analyze sentiment from reviews using advanced AI</p>
        <Link to="/analyze">
          <button style={{ marginTop: '2rem' }}>Analyze a Review</button>
        </Link>
      </div>

      <section>
        <h3>🍿 Popular Movies</h3>
        <div className="movies-grid">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://via.placeholder.com/500x750?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
              </div>
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-rating">{movie.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews">
        <h3>💬 Recent Reviews</h3>
        {recentReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <span className="review-movie">{review.movie}</span>
              <span className={`review-sentiment ${review.sentiment}`}>
                {review.sentiment === 'positive' ? '👍 Positive' : '👎 Negative'}
              </span>
            </div>
            <div className="review-text">{review.text}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
