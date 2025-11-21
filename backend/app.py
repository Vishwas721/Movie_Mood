# ====================================================================
# File: Movie_Review_System/backend/app.py
# Purpose: Flask server that exposes the ML model via a POST API endpoint.
# ====================================================================

import joblib
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

# 1. Define the PREPROCESSING FUNCTION (Must be identical to training!)
# Hardcode NLTK English stopwords to avoid heavy runtime imports
STOPWORDS = set([
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
    'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about',
    'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under',
    'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll',
    'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven',
    "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't",
    'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
])

# Negation words to merge with following token
NEGATIONS = {'not', 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere',
             'none', 'nor', "n't", 'dont', 'doesn', 'didn', 'won', 'wouldn',
             'shouldn', 'couldn', 'isn', 'aren', 'wasn', 'weren', 'hasn', 'haven',
             'hadn', 'can', 'cannot'}

def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    # 1. Remove HTML tags
    text = re.sub(r'<.*?>', '', text)
    # 2. Remove punctuation and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # 3. Lowercase and split into words
    words = text.lower().split()
    
    # 4. Handle negations: merge with following 2-3 words for better context
    negated = []
    i = 0
    while i < len(words):
        if words[i] in NEGATIONS and i + 1 < len(words):
            # Merge negation with next 2-3 words (or until end)
            window_size = min(3, len(words) - i - 1)
            merged = words[i]
            for j in range(1, window_size + 1):
                if words[i+j] not in STOPWORDS or j == 1:  # Always include first word
                    merged += '_' + words[i+j]
                else:
                    break  # Stop at stopword (unless first)
            negated.append(merged)
            i += window_size + 1
        else:
            negated.append(words[i])
            i += 1
    
    # 5. Remove stopwords (but keep negated tokens)
    words = [word for word in negated if word not in STOPWORDS or '_' in word]
    # 6. Rejoin the clean text
    return " ".join(words)


# 2. Setup Flask App
app = Flask(__name__)
# Enable CORS to allow the frontend (running on a different port) to access this API
CORS(app) 

# 3. Load Model and Vectorizer (robust absolute paths based on this file location)
ARTIFACT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(ARTIFACT_DIR, 'sentiment_model.pkl')
VECTORIZER_PATH = os.path.join(ARTIFACT_DIR, 'tfidf_vectorizer.pkl')

try:
    model = joblib.load(MODEL_PATH)
    tfidf_vectorizer = joblib.load(VECTORIZER_PATH)
    print("ML artifacts loaded successfully.")
except Exception as e:
    print(f"ERROR: Failed to load model files. Please run the training script first. Details: {e}")
    model = None
    tfidf_vectorizer = None


# 4. Define the API Endpoint for Prediction
@app.route('/predict_sentiment', methods=['POST'])
def predict():
    if model is None or tfidf_vectorizer is None:
        return jsonify({'error': 'Server error: Model not loaded. Check backend console.'}), 500
        
    data = request.get_json(force=True)
    review_text = data.get('review', '') or data.get('review_text', '')

    if not review_text:
        return jsonify({'error': 'No review text provided.'}), 400

    try:
        # a. Preprocess and Transform
        cleaned_text = preprocess_text(review_text)
        review_features = tfidf_vectorizer.transform([cleaned_text])
        
        # b. Prediction
        prediction = model.predict(review_features)
        
        # c. Convert result
        sentiment_label = 'Positive' if prediction[0] == 1 else 'Negative'
        
        # d. Return result as JSON
        return jsonify({'sentiment': sentiment_label})

    except Exception as e:
        return jsonify({'error': f'Prediction logic failed: {str(e)}'}), 500

# 5. Run the Server
if __name__ == '__main__':
    print("Starting Flask server (no debug reloader)...")
    # Run without debug to avoid reloader spawning a different interpreter
    app.run(port=5000)
