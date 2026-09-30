import { useState } from "react";

export default function SearchBar({ onSubmit, loading }) {
  const [repoUrl, setRepoUrl] = useState("");

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
      <input
        type="text"
        placeholder="https://github.com/owner/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit(repoUrl)}
        style={{
          flex: 1,
          background: "#171a23",
          border: "1px solid #262b38",
          borderRadius: 8,
          padding: "12px 14px",
          color: "#e4e6eb",
          fontSize: 14,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#4d9fff")}
        onBlur={(e) => (e.target.style.borderColor = "#262b38")}
      />
      <button
        onClick={() => onSubmit(repoUrl)}
        disabled={loading}
        style={{
          background: loading ? "#262b38" : "linear-gradient(135deg,#4d9fff,#a78bfa)",
          color: loading ? "#8b8fa3" : "#0f1117",
          border: "none",
          borderRadius: 8,
          padding: "0 22px",
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? "default" : "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {loading ? "Analyzing…" : "Analyze"}
      </button>
    </div>
  );
}