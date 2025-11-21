// ====================================================================
// File: Movie_Review_System/frontend/src/pages/About.jsx
// ====================================================================

import React from 'react';

function About() {
  return (
    <div className="page-content about-page">
      <h2>📊 About CineScope AI</h2>
      <p>
        Welcome to <strong>CineScope AI</strong> — an advanced sentiment analysis platform that leverages
        cutting-edge Natural Language Processing to classify movie reviews with exceptional accuracy.
      </p>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">90.5%</div>
          <div className="stat-label">Model Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50K</div>
          <div className="stat-label">Training Reviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">20K</div>
          <div className="stat-label">Feature Dimensions</div>
        </div>
      </div>

      <h3>✨ Key Features</h3>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h4>Advanced ML Model</h4>
          <p>Logistic Regression trained on 50,000 IMDB reviews with TF-IDF vectorization and bigram support.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h4>Negation Handling</h4>
          <p>Sophisticated preprocessing that captures phrases like "not good" and "would not recommend."</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h4>Real-time Analysis</h4>
          <p>Instant sentiment classification with a responsive React frontend and Flask API backend.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h4>High Accuracy</h4>
          <p>Achieved 90.5% accuracy on test data with balanced precision and recall across both classes.</p>
        </div>
      </div>

      <h3>🛠️ Tech Stack</h3>
      <div className="tech-stack">
        <div className="tech-category">
          <h4>Frontend</h4>
          <ul>
            <li>⚛️ React 18 with Vite</li>
            <li>🎨 Custom CSS with dark theme</li>
            <li>📡 Axios for API calls</li>
            <li>🧭 React Router for navigation</li>
          </ul>
        </div>
        <div className="tech-category">
          <h4>Backend</h4>
          <ul>
            <li>🐍 Flask (Python)</li>
            <li>🔧 Flask-CORS for cross-origin</li>
            <li>📦 Joblib for model persistence</li>
            <li>🌐 RESTful API design</li>
          </ul>
        </div>
        <div className="tech-category">
          <h4>Machine Learning</h4>
          <ul>
            <li>🧠 scikit-learn</li>
            <li>📊 TF-IDF Vectorization</li>
            <li>🎲 Logistic Regression</li>
            <li>📚 NLTK for preprocessing</li>
          </ul>
        </div>
      </div>

      <h3>🚀 How It Works</h3>
      <ol className="process-steps">
        <li><strong>Text Preprocessing:</strong> Removes HTML tags, handles negations, filters stopwords</li>
        <li><strong>Feature Extraction:</strong> TF-IDF vectorization with unigrams and bigrams (20K features)</li>
        <li><strong>Classification:</strong> Logistic Regression with class balancing predicts sentiment</li>
        <li><strong>Result Display:</strong> Real-time sentiment classification with visual feedback</li>
      </ol>
    </div>
  );
}
export default About;
