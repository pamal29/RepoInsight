import SectionHeading from "./SectionHeading";
import StatCard from "./StatCard";

export default function CommitActivity({ activity }) {
  return (
    <>
      <SectionHeading tone="commits">Commit activity</SectionHeading>
      {activity?.error && (
        <p style={{ color: "#ff6b6b", fontSize: 13, margin: "0 0 10px" }}>
          Couldn't load commits: {activity.error}
        </p>
      )}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <StatCard
          tone="commits"
          label="Total commits"
          value={activity?.total_commits ?? 0}
          sub={activity?.truncated ? "500+ (capped)" : undefined}
        />
        <StatCard tone="commits" label="Last 30 days" value={activity?.last_30_days ?? 0} />
        <StatCard
          tone="commits"
          label="Longest streak"
          value={activity?.longest_streak_days ?? 0}
          sub="days"
        />
      </div>
    </>
  );
}