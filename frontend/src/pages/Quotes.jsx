// ====================================================================
// File: Movie_Review_System/frontend/src/pages/Quotes.jsx
// ====================================================================

import React, { useState, useEffect } from 'react';

function Quotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [resolvedBackgrounds, setResolvedBackgrounds] = useState([]);

  const quotes = [
    {
      text: "Cinema is a matter of what's in the frame and what's out.",
      author: "Martin Scorsese",
      role: "Director - The Irishman, Goodfellas",
      background: "/images/backgrounds/cinema1.jpg"
    },
    {
      text: "The most honest form of filmmaking is to make a film for yourself.",
      author: "Peter Jackson",
      role: "Director - The Lord of the Rings",
      background: "/images/backgrounds/cinema2.jpg"
    },
    {
      text: "Movies are like an expensive form of therapy for me.",
      author: "Tim Burton",
      role: "Director - Edward Scissorhands, Batman",
      background: "/images/backgrounds/cinema3.jpg"
    },
    {
      text: "I don't think there's any artist of any value who doesn't doubt what they're doing.",
      author: "Francis Ford Coppola",
      role: "Director - The Godfather Trilogy",
      background: "/images/backgrounds/cinema4.jpg"
    },
    {
      text: "Films are 50% visual and 50% sound. Sometimes sound even overplays the visual.",
      author: "David Lynch",
      role: "Director - Mulholland Drive, Blue Velvet",
      background: "/images/backgrounds/cinema1.jpg"
    },
    {
      text: "The whole world is an art house if you have eyes.",
      author: "Wes Anderson",
      role: "Director - The Grand Budapest Hotel",
      background: "/images/backgrounds/cinema2.jpg"
    }
  ];

  // Preload backgrounds and replace missing local files with placeholder images
  useEffect(() => {
    const initial = quotes.map((q) => q.background);
    setResolvedBackgrounds(initial);

    quotes.forEach((q, idx) => {
      const img = new Image();
      img.src = q.background;
      img.onload = () => {
        setResolvedBackgrounds((prev) => {
          const copy = prev.slice();
          copy[idx] = q.background;
          return copy;
        });
      };
      img.onerror = () => {
        const fallback = `https://via.placeholder.com/1920x1080?text=${encodeURIComponent(q.author)}`;
        setResolvedBackgrounds((prev) => {
          const copy = prev.slice();
          copy[idx] = fallback;
          return copy;
        });
      };
    });

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 7000); // Change quote every 7 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleDotClick = (index) => {
    setCurrentQuote(index);
  };

  return (
    <div className="quotes-page">
      <div 
        className="quote-background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${resolvedBackgrounds[currentQuote] || quotes[currentQuote].background})`
        }}
      >
        <div className="quote-content">
          <div className="quote-icon">🎬</div>
          <blockquote className="quote-text">
            "{quotes[currentQuote].text}"
          </blockquote>
          <div className="quote-author">
            <h3>{quotes[currentQuote].author}</h3>
            <p>{quotes[currentQuote].role}</p>
          </div>
          
          <div className="quote-navigation">
            {quotes.map((_, index) => (
              <button
                key={index}
                className={`quote-dot ${index === currentQuote ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="quotes-grid-section">
        <h2>Wisdom from Cinema Masters</h2>
        <div className="quotes-grid">
          {quotes.map((quote, index) => (
            <div key={index} className="quote-card">
              <div className="quote-card-icon">🎭</div>
              <p className="quote-card-text">"{quote.text}"</p>
              <div className="quote-card-author">
                <strong>{quote.author}</strong>
                <span>{quote.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quotes;
