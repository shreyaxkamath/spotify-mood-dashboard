import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function groupByPopularityBands(tracks) {
  const bands = [
    { label: "0–20", min: 0, max: 20 },
    { label: "20–40", min: 20, max: 40 },
    { label: "40–60", min: 40, max: 60 },
    { label: "60–80", min: 60, max: 80 },
    { label: "80–100", min: 80, max: 100 },
  ];

  return bands.map((band) => {
    const subset = tracks.filter(
      (t) => t.popularity >= band.min && t.popularity < band.max
    );

    if (!subset.length) {
      return {
        band: band.label,
        avgValence: 0,
        avgEnergy: 0,
      };
    }

    const avgValence =
      subset.reduce((sum, t) => sum + t.valence, 0) / subset.length;

    const avgEnergy =
      subset.reduce((sum, t) => sum + t.energy, 0) / subset.length;

    return {
      band: band.label,
      avgValence,
      avgEnergy,
    };
  });
}

export default function MoodByPopularityChart({ tracks }) {
  const data = useMemo(
    () => groupByPopularityBands(tracks),
    [tracks]
  );

  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f9a8d4"
          opacity={0.5}
        />

        <XAxis
          dataKey="band"
          stroke="#9f1239"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          domain={[0, 1]}
          stroke="#9f1239"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          formatter={(value) => value.toFixed(2)}
          contentStyle={{
            backgroundColor: "#fff7fb",
            borderRadius: "0.75rem",
            border: "1px solid #f9a8d4",
            fontSize: "0.8rem",
          }}
          labelStyle={{ color: "#9f1239" }}
        />

        {/* Average Energy */}
        <Line
          type="monotone"
          dataKey="avgEnergy"
          name="Average energy"
          stroke="#a5b4fc"
          strokeWidth={3}
          dot={false}
        />

        {/* Average Valence */}
        <Line
          type="monotone"
          dataKey="avgValence"
          name="Average valence"
          stroke="#f9a8d4"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

