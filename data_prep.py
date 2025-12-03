import pandas as pd
from pathlib import Path

# -------- CONFIG --------
RAW_CSV_PATH = Path("data/spotify_tracks.csv")
OUT_JSON_PATH = Path("frontend/src/data/tracks.json")
OUT_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)

print(f"Reading CSV from {RAW_CSV_PATH.resolve()}")

df = pd.read_csv(RAW_CSV_PATH)

# Drop unnamed index column if exists
if "Unnamed: 0" in df.columns:
    df = df.drop(columns=["Unnamed: 0"])

# Rename for nicer frontend names
df = df.rename(columns={
    "track_name": "title",
    "artists": "artist",
    "track_genre": "genre"
})

# Keep most relevant columns
cols = [
    "track_id",
    "title",
    "artist",
    "album_name",
    "genre",
    "popularity",
    "duration_ms",
    "explicit",
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo",
    "time_signature"
]

df = df[cols].dropna(
    subset=[
        "title", "artist", "genre",
        "popularity", "valence",
        "energy", "danceability", "tempo"
    ]
)

# Add duration in minutes
df["duration_min"] = df["duration_ms"] / 60000

# Popularity bands
def popularity_band(pop):
    if pop < 20:
        return "0–20"
    elif pop < 40:
        return "20–40"
    elif pop < 60:
        return "40–60"
    elif pop < 80:
        return "60–80"
    else:
        return "80–100"

df["popularity_band"] = df["popularity"].apply(popularity_band)

# Mood quadrant labels
def mood_quadrant(row):
    v = row["valence"]
    e = row["energy"]
    if v >= 0.5 and e >= 0.5:
        return "Happy & Energetic"
    elif v >= 0.5 and e < 0.5:
        return "Happy & Chill"
    elif v < 0.5 and e >= 0.5:
        return "Sad & Energetic"
    else:
        return "Sad & Chill"

df["mood_quadrant"] = df.apply(mood_quadrant, axis=1)

# Clean genre punctuation
df["genre"] = df["genre"].astype(str).str.strip()

# Keep sample for fast load
if len(df) > 8000:
    df = df.sample(8000, random_state=42)

# Output columns
final_cols = [
    "track_id",
    "title",
    "artist",
    "album_name",
    "genre",
    "popularity",
    "popularity_band",
    "duration_min",
    "explicit",
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo",
    "time_signature",
    "mood_quadrant"
]

df = df[final_cols]

# Write json
OUT_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
df.to_json(OUT_JSON_PATH, orient="records")

print(f"Saved {len(df)} tracks to {OUT_JSON_PATH}")

