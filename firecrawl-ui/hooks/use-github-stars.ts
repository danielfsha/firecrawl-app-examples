import { useEffect, useState } from "react";

type GithubStarsState = {
  stars: number | null;
  loading: boolean;
  error: string | null;
};

export function useGithubStars(owner: string, repo: string): GithubStarsState {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;

    let cancelled = false;

    async function fetchStars() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch GitHub repo data");
        }

        const data = await res.json();

        if (!cancelled) {
          setStars(data.stargazers_count ?? 0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStars();

    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  return { stars, loading, error };
}
