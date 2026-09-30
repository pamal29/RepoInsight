export default function ScoreRing({ score = 0, color }) {
  const size = 72;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#262b38" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
        strokeLinecap="round"
      />
      <text
        x={size / 2}
        y={size / 2}
        fill="#e4e6eb"
        fontSize="18"
        fontWeight="600"
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
      >
        {pct}
      </text>
    </svg>
  );
}