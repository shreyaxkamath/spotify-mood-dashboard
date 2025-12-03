import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MoodScatterplot({ tracks }) {
  const data = tracks.map((t, idx) => ({
    id: idx,
    title: t.title,
    artist: t.artist,
    valence: t.valence,
    energy: t.energy,
    genre: t.genre,
    popularity: t.popularity,
    trackId: t.track_id,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" opacity={0.5} />
        <XAxis
          type="number"
          dataKey="valence"
          domain={[0, 1]}
          stroke="#9f1239"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="number"
          dataKey="energy"
          domain={[0, 1]}
          stroke="#9f1239"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload;

            return (
              <div
                style={{
                  background: "#fff7fb",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "0.85rem",
                  border: "1px solid #f9a8d4",
                  fontSize: "0.8rem",
                }}
              >
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                <div style={{ color: "#6b7280" }}>{p.artist}</div>
                <div style={{ fontSize: "0.75rem", color: "#9f1239" }}>
                  {p.genre} • Popularity {p.popularity}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#4b5563" }}>
                  Valence: {p.valence.toFixed(2)} • Energy:{" "}
                  {p.energy.toFixed(2)}
                </div>
              </div>
            );
          }}
        />
        <Scatter
          data={data}
          fill="#fb9aa8"
          onClick={(point) => {
            if (!point?.payload?.trackId) return;
            window.open(
              `https://open.spotify.com/track/${point.payload.trackId}`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

