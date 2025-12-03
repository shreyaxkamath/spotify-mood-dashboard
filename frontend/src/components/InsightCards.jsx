import React, { useMemo } from "react";

export default function InsightCards({ tracks }) {
  const stats = useMemo(() => {
    const count = tracks.length;
    if (!count) {
      return {
        count,
        topGenre: null,
        avgPopularity: null,
        explicitShare: null,
        dominantMood: null,
      };
    }

    const genreCounts = new Map();
    let popSum = 0;
    let explicitCount = 0;
    const moodCounts = new Map();

    for (const t of tracks) {
      genreCounts.set(t.genre, (genreCounts.get(t.genre) || 0) + 1);
      popSum += t.popularity;
      if (t.explicit) explicitCount += 1;
      moodCounts.set(
        t.mood_quadrant,
        (moodCounts.get(t.mood_quadrant) || 0) + 1
      );
    }

    const topGenre =
      [...genreCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const avgPopularity = popSum / count;

    const moodArray = [...moodCounts.entries()].sort((a, b) => b[1] - a[1]);
    const dominantMood = moodArray.length
      ? {
          mood: moodArray[0][0],
          share: (moodArray[0][1] / count) * 100,
        }
      : null;

    const explicitShare = (explicitCount / count) * 100;

    return {
      count,
      topGenre,
      avgPopularity,
      explicitShare,
      dominantMood,
    };
  }, [tracks]);

  const { count, topGenre, avgPopularity, explicitShare, dominantMood } = stats;

  if (!count) {
    return <p className="helper-text">No tracks match the current filters.</p>;
  }

  return (
    <div className="stats-strip">
      <div className="stat-pill">
        <div className="stat-label">Tracks</div>
        <div className="stat-value">{count.toLocaleString()}</div>
      </div>

      {topGenre && (
        <div className="stat-pill">
          <div className="stat-label">Top genre</div>
          <div className="stat-value">{topGenre}</div>
        </div>
      )}

      {dominantMood && (
        <div className="stat-pill">
          <div className="stat-label">Dominant mood</div>
          <div className="stat-value">
            {dominantMood.mood} ({dominantMood.share.toFixed(0)}%)
          </div>
        </div>
      )}

      {avgPopularity !== null && (
        <div className="stat-pill">
          <div className="stat-label">Avg popularity</div>
          <div className="stat-value">
            {avgPopularity.toFixed(1)}/100
          </div>
        </div>
      )}

      {explicitShare !== null && (
        <div className="stat-pill">
          <div className="stat-label">Explicit</div>
          <div className="stat-value">
            {explicitShare.toFixed(1)}%
          </div>
        </div>
      )}
    </div>
  );
}

