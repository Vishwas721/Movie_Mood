# Script to download IMDB 50K dataset
# Run this in the ml_development folder

import pandas as pd
import requests
import os

print("Attempting to download IMDB dataset...")

# Try downloading from a direct source
url = "https://github.com/Ankit152/IMDB-sentiment-analysis/raw/master/IMDB-Dataset.csv"

try:
    print("Downloading from GitHub mirror...")
    df = pd.read_csv(url)
    df.to_csv('IMDB Dataset.csv', index=False)
    print(f"✓ Successfully downloaded {len(df)} reviews!")
    print(f"  - Positive: {(df['sentiment'] == 'positive').sum()}")
    print(f"  - Negative: {(df['sentiment'] == 'negative').sum()}")
except Exception as e:
    print(f"Download failed: {e}")
    print("\nPlease manually download from:")
    print("https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews")
