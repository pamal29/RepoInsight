import { SECTIONS } from "../constants";

export default function SectionHeading({ tone, children }) {
  const s = SECTIONS[tone];
  return (
    <h3
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "28px 0 12px",
        fontSize: 13,
        fontWeight: 600,
        color: s.color,
        textTransform: "uppercase",
        letterSpacing: 0.8,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: "inline-block" }} />
      {children}
    </h3>
  );
}