"""
Train script for Movie_Review_System.
Saves `sentiment_model.pkl` and `tfidf_vectorizer.pkl` into ../backend/
"""
import os
import argparse
import re
import nltk
import pandas as pd
from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Ensure NLTK stopwords available
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

STOPWORDS = set(stopwords.words('english'))

# Negation words to merge with following token
NEGATIONS = {'not', 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere', 
             'none', 'nor', "n't", 'dont', 'doesn', 'didn', 'won', 'wouldn', 
             'shouldn', 'couldn', 'isn', 'aren', 'wasn', 'weren', 'hasn', 'haven', 
             'hadn', 'can', 'cannot'}

def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    text = re.sub(r'<.*?>', ' ', text)
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    words = text.lower().split()
    
    # Handle negations: merge with following 2-3 words for better context
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
    
    # Remove stopwords (but keep negated tokens)
    words = [w for w in negated if w not in STOPWORDS or '_' in w]
    return ' '.join(words)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--sample', type=int, default=None, help='Optional sample size for faster training')
    args = parser.parse_args()
    workdir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(workdir, 'IMDB Dataset.csv')
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"{csv_path} not found. Place IMDB Dataset.csv in ml_development/")

    print('Loading dataset...')
    df = pd.read_csv(csv_path)
    print(f'Rows: {len(df)}')

    df['sentiment'] = df['sentiment'].map({'positive': 1, 'negative': 0})
    df['cleaned_review'] = df['review'].apply(preprocess_text)

    # quick checks
    print('Class distribution:')
    print(df['sentiment'].value_counts())

    # Optional down-sample for speed while preserving class balance
    if args.sample and args.sample < len(df):
        per_class = max(args.sample // 2, 1)
        df = df.groupby('sentiment', group_keys=False).apply(lambda g: g.sample(n=per_class, random_state=42))
        print(f"Down-sampled to {len(df)} rows ({per_class} per class)")

    X = df['cleaned_review']
    y = df['sentiment']

    # stratify split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    print(f'Train size: {len(X_train)}, Test size: {len(X_test)}')

    print('Vectorizing...')
    # Use unigrams and bigrams with higher capacity for rare phrases
    tfidf = TfidfVectorizer(max_features=20000, ngram_range=(1,2), min_df=2)
    X_train_vec = tfidf.fit_transform(X_train)
    X_test_vec = tfidf.transform(X_test)
    print('Feature dimension:', X_train_vec.shape)

    print('Training LogisticRegression...')
    model = LogisticRegression(max_iter=2000, class_weight='balanced')
    model.fit(X_train_vec, y_train)

    print('Evaluating...')
    y_pred = model.predict(X_test_vec)
    print('Accuracy:', accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred, digits=4))

    backend_dir = os.path.abspath(os.path.join(workdir, '..', 'backend'))
    os.makedirs(backend_dir, exist_ok=True)
    model_path = os.path.join(backend_dir, 'sentiment_model.pkl')
    vec_path = os.path.join(backend_dir, 'tfidf_vectorizer.pkl')

    print('Saving artifacts...')
    joblib.dump(model, model_path)
    joblib.dump(tfidf, vec_path)
    print('Artifacts saved to', backend_dir)

if __name__ == '__main__':
    main()
