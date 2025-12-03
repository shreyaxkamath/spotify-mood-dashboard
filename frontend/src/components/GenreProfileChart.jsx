import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function GenreProfileChart({ tracks }) {
  const data = useMemo(() => {
    const byGenre = new Map();

    for (const t of tracks) {
      if (!byGenre.has(t.genre)) {
        byGenre.set(t.genre, {
          genre: t.genre,
          valenceSum: 0,
          energySum: 0,
          danceSum: 0,
          count: 0,
        });
      }
      const row = byGenre.get(t.genre);
      row.valenceSum += t.valence;
      row.energySum += t.energy;
      row.danceSum += t.danceability;
      row.count += 1;
    }

    return Array.from(byGenre.values())
      .filter((g) => g.count >= 50)
      .map((g) => ({
        genre: g.genre,
        avgValence: g.valenceSum / g.count,
        avgEnergy: g.energySum / g.count,
        avgDanceability: g.danceSum / g.count,
      }))
      .sort((a, b) => b.avgEnergy - a.avgEnergy)
      .slice(0, 8);
  }, [tracks]);

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" opacity={0.5} />

        <XAxis
          dataKey="genre"
          stroke="#9f1239"
          fontSize={11}
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
          formatter={(v) => v.toFixed(2)}
          contentStyle={{
            backgroundColor: "#fff7fb",
            borderRadius: "0.75rem",
            border: "1px solid #f9a8d4",
            fontSize: "0.8rem",
          }}
          labelStyle={{ color: "#9f1239" }}
        />

        <Legend wrapperStyle={{ fontSize: "0.8rem" }} />

        <Bar dataKey="avgDanceability" name="Danceability" fill="#bbf7d0" />
        <Bar dataKey="avgEnergy" name="Energy" fill="#a5b4fc" />
        <Bar dataKey="avgValence" name="Valence" fill="#f9a8d4" />
      </BarChart>
    </ResponsiveContainer>
  );
}

