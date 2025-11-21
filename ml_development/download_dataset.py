import pandas as pd
import urllib.request
import zipfile
import os

print("Downloading IMDB dataset (this may take a few minutes)...")

# Download the dataset
url = "https://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz"
filename = "aclImdb_v1.tar.gz"

try:
    # Alternative: Use Kaggle's CSV version which is easier
    # Download from: https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews
    print("Please download the IMDB dataset from:")
    print("https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews")
    print("\nDownload 'IMDB Dataset.csv' and place it in the ml_development folder.")
    print("\nAlternatively, running a smaller version with synthetic data...")
    
except Exception as e:
    print(f"Error: {e}")
