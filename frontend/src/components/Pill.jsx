import { SECTIONS } from "../constants";

export default function Pill({ tone, children }) {
  const s = SECTIONS[tone];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: s.bg,
        color: s.color,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}