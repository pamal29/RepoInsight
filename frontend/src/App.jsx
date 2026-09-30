import { useAnalyze } from "./hooks/useAnalyze";
import SearchBar from "./components/SearchBar";
import OverviewStats from "./components/OverviewStats";
import FrameworksSection from "./components/FrameworksSection";
import ReadmeHealth from "./components/ReadmeHealth";
import CommitActivity from "./components/CommitActivity";

export default function App() {
  const { loading, error, data, analyze } = useAnalyze();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        color: "#e4e6eb",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        padding: "48px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "linear-gradient(135deg,#4d9fff,#a78bfa)",
            }}
          />
          <span style={{ fontSize: 13, color: "#8b8fa3", letterSpacing: 0.5 }}>repo analysis</span>
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 600, margin: "0 0 28px", letterSpacing: -0.5 }}>
          RepoInsight <span style={{ color: "#4d9fff" }}>AI</span>
        </h1>

        <SearchBar onSubmit={analyze} loading={loading} />

        {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginTop: 8 }}>{error}</p>}

        {data && (
          <div style={{ marginTop: 12 }}>
            <OverviewStats data={data} />
            <FrameworksSection frameworks={data.frameworks} />
            <ReadmeHealth readme={data.readme_score} />
            <CommitActivity activity={data.commit_activity} />
          </div>
        )}
      </div>
    </div>
  );
}