import StatCard from "./StatCard";

export default function OverviewStats({ data }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
      <StatCard tone="language" label="Total files" value={data.total_files ?? "—"} />
      <StatCard
        tone="language"
        label="Primary language"
        value={data.language_info?.primary_language ?? "—"}
      />
      <StatCard
        tone="architecture"
        label="Architecture"
        value={data.architecture?.pattern ?? "—"}
      />
      <StatCard
        tone="complexity"
        label="Complexity"
        value={data.complexity?.complexity_level ?? "—"}
        sub={
          data.complexity?.total_lines
            ? `${data.complexity.total_lines.toLocaleString()} lines`
            : undefined
        }
      />
    </div>
  );
}