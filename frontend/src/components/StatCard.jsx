import { SECTIONS } from "../constants";

export default function StatCard({ tone, label, value, sub }) {
  const s = SECTIONS[tone];
  return (
    <div
      style={{
        background: "#171a23",
        border: "1px solid #262b38",
        borderLeft: `3px solid ${s.color}`,
        borderRadius: 10,
        padding: "16px 18px",
        minWidth: 150,
        flex: "1 1 150px",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, letterSpacing: 0.3, color: "#8b8fa3" }}>{label}</p>
      <p
        style={{
          margin: "6px 0 0",
          fontSize: 22,
          fontWeight: 600,
          color: "#e4e6eb",
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        }}
      >
        {value}
      </p>
      {sub && <p style={{ margin: "4px 0 0", fontSize: 12, color: s.color }}>{sub}</p>}
    </div>
  );
}