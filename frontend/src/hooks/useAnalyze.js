import { useState } from "react";
import { analyzeRepo } from "../api";

export function useAnalyze() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function analyze(repoUrl) {
    if (!repoUrl.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await analyzeRepo(repoUrl));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, data, analyze };
}