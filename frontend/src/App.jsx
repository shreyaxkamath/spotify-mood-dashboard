import React, { useMemo, useState } from "react";
import tracksData from "./data/tracks.json";
import FiltersPanel from "./components/FiltersPanel.jsx";
import MoodByPopularityChart from "./components/MoodByPopularityChart.jsx";
import MoodScatterplot from "./components/MoodScatterplot.jsx";
import GenreProfileChart from "./components/GenreProfileChart.jsx";
import InsightCards from "./components/InsightCards.jsx";

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [popularityRange, setPopularityRange] = useState([0, 100]);
  const [selectedMood, setSelectedMood] = useState("All");

  const genres = useMemo(() => {
    const set = new Set(tracksData.map((t) => t.genre));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredTracks = useMemo(() => {
    return tracksData.filter((t) => {
      const popOk =
        t.popularity >= popularityRange[0] &&
        t.popularity <= popularityRange[1];
      const genreOk = selectedGenre === "All" || t.genre === selectedGenre;
      const moodOk =
        selectedMood === "All" || t.mood_quadrant === selectedMood;
      return popOk && genreOk && moodOk;
    });
  }, [selectedGenre, popularityRange, selectedMood]);

    return (
    <div className="app-root">
      <header style={{ marginBottom: "1.5rem" }}>
        <div className="meta-pill">
          <span>🎵 Spotify Audio Features • React • Recharts</span>
        </div>
        <h1>How Pop Music Feels</h1>
        <p className="subtitle">
          Explore how genre, popularity, and emotion interact in Spotify tracks.
          Use the controls below to focus on a specific slice of music and see
          how its mood profile changes.
        </p>
      </header>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "0.9rem" }}>
        <p className="helper-text">
          1) Pick a genre, 2) choose a mood (or leave on All), 3) adjust
          popularity — the stats and charts below update instantly.
        </p>
        <FiltersPanel
          popularityRange={popularityRange}
          setPopularityRange={setPopularityRange}
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
        />
      </div>

      {/* Compact stats */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <InsightCards tracks={filteredTracks} />
      </div>

      {/* Three side-by-side visualizations */}
      <div className="viz-grid" style={{ marginBottom: "1.25rem" }}>
        <div className="card">
          <h2>Mood by popularity</h2>
          <p className="helper-text">
            Average valence (positiveness) and energy across popularity bands.
          </p>
          <MoodByPopularityChart tracks={filteredTracks} />
        </div>

        <div className="card">
          <h2>Mood map of tracks</h2>
          <p className="helper-text">
            Each point is a track positioned by valence (x) and energy (y).
            Hover or click to explore individual songs.
          </p>
          <MoodScatterplot tracks={filteredTracks} />
        </div>

        <div className="card">
          <h2>Genre mood profiles</h2>
          <p className="helper-text">
            Average valence, energy, and danceability for top genres in this
            selection.
          </p>
          <GenreProfileChart tracks={filteredTracks} />
        </div>
      </div>
    </div>
  );
}

