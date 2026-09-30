import SectionHeading from "./SectionHeading";
import ScoreRing from "./ScoreRing";

export default function ReadmeHealth({ readme }) {
  return (
    <>
      <SectionHeading tone="readme">README health</SectionHeading>
      <div
        style={{
          background: "#171a23",
          border: "1px solid #262b38",
          borderLeft: "3px solid #4ade80",
          borderRadius: 10,
          padding: 18,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <ScoreRing score={readme?.score ?? 0} color="#4ade80" />
        <div>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
            Grade: {readme?.grade ?? "—"}
          </p>
          <div style={{ marginTop: 8 }}>
            {readme?.improvements?.map((item, i) => (
              <p key={i} style={{ margin: "3px 0", fontSize: 13, color: "#8b8fa3" }}>
                <span style={{ color: "#ff6b6b" }}>✗</span> {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}