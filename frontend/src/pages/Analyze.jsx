// ====================================================================
// File: Movie_Review_System/frontend/src/pages/Analyze.jsx
// ====================================================================

import React, { useState } from 'react';
import axios from 'axios';

function Analyze() {
  const [review, setReview] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://127.0.0.1:5000/predict_sentiment';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSentiment(null);
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        review_text: review,
      });
      
      setSentiment(response.data.sentiment);
    } catch (err) {
      console.error("API Call Error:", err);
      const errMsg = err.response?.data?.error || "Connection refused. Is Flask server running on port 5000?";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <h2>🔍 Analyze Movie Review</h2>
      <p>Paste a movie review below to classify its sentiment using our advanced AI model.</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="e.g., 'The direction was brilliant and the ending was heartwarming.'"
          rows="8"
          required
        ></textarea>
        <button type="submit" disabled={loading || !review}>
          {loading ? '🔄 Analyzing...' : '🚀 Analyze Sentiment'}
        </button>
      </form>

      {error && <div className="result error">❌ Error: {error}</div>}
      
      {sentiment && (
        <div className={`result ${sentiment.toLowerCase()}`}>
          <h3>Prediction Result:</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {sentiment === 'Positive' ? '😊 Positive' : '😞 Negative'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Analyze;
