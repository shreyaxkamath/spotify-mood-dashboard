import React from "react";

const MOOD_OPTIONS = [
  "All",
  "Happy & Energetic",
  "Happy & Chill",
  "Sad & Energetic",
  "Sad & Chill",
];

export default function FiltersPanel({
  popularityRange,
  setPopularityRange,
  genres,
  selectedGenre,
  setSelectedGenre,
  selectedMood,
  setSelectedMood,
}) {
  const handlePopChange = (e, idx) => {
    const value = Number(e.target.value);
    const next = [...popularityRange];
    next[idx] = value;
    if (next[0] <= next[1]) {
      setPopularityRange(next);
    }
  };

  return (
    <>
      <h2 style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}>Filters</h2>
      <div className="filters-row">
        <div className="filter-group">
          <label>Popularity range</label>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="number"
              min={0}
              max={100}
              value={popularityRange[0]}
              onChange={(e) => handlePopChange(e, 0)}
            />
            <span>to</span>
            <input
              type="number"
              min={0}
              max={100}
              value={popularityRange[1]}
              onChange={(e) => handlePopChange(e, 1)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Mood quadrant</label>
          <div className="mood-buttons">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood}
                type="button"
                className={
                  "mood-button" + (selectedMood === mood ? " active" : "")
                }
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

