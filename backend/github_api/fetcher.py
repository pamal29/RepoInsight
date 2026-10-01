import io
import os
import zipfile
import requests
from collections import Counter
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from github import Github, GithubException

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

g = Github(GITHUB_TOKEN, per_page=100)

SKIP_DIRS = {"node_modules", ".git", "dist", "build", "venv", ".venv",
             "__pycache__", "vendor", ".next", "target"}
MAX_FILE_BYTES = 200_000
MAX_FILES = 500


def get_repo_contents(repo_url: str):
    repo_name = repo_url.removeprefix("https://github.com/").rstrip("/")
    repo = g.get_repo(repo_name)

    if repo.size > 100_000:
        raise ValueError("Repository too large to analyze")

    resp = requests.get(repo.get_archive_link("zipball"), timeout=60)
    resp.raise_for_status()

    all_files = []
    with zipfile.ZipFile(io.BytesIO(resp.content)) as zf:
        for info in zf.infolist():
            if info.is_dir() or info.file_size > MAX_FILE_BYTES:
                continue

            path = info.filename.split("/", 1)[1] if "/" in info.filename else info.filename
            if not path or any(part in SKIP_DIRS for part in path.split("/")):
                continue

            raw = zf.read(info)
            if b"\x00" in raw:
                continue

            all_files.append({"path": path, "content": raw.decode("utf-8", errors="ignore")})
            if len(all_files) >= MAX_FILES:
                break

    return all_files

def get_commit_activity(repo_url: str, max_commits: int = 500):
 
    repo_name = repo_url.removeprefix("https://github.com/").rstrip("/")
    empty = {
        "total_commits": 0,
        "last_30_days": 0,
        "longest_streak_days": 0,
        "contributors": {},
    }

    try:
        repo = g.get_repo(repo_name)
        cutoff = datetime.now(timezone.utc) - timedelta(days=30)

        total = 0
        last_30 = 0
        contributors = Counter()
        commit_days = set()

        for commit in repo.get_commits()[:max_commits]:
            total += 1

            date = commit.commit.author.date if commit.commit.author else None
            if date:
                if date.tzinfo is None:
                    date = date.replace(tzinfo=timezone.utc)
                commit_days.add(date.date())
                if date >= cutoff:
                    last_30 += 1

            author = (
                commit.author.login
                if commit.author
                else (commit.commit.author.name if commit.commit.author else "unknown")
            )
            contributors[author] += 1

        # longest run of consecutive days with at least one commit
        longest = current = 0
        prev = None
        for day in sorted(commit_days):
            current = current + 1 if prev and (day - prev).days == 1 else 1
            longest = max(longest, current)
            prev = day

        return {
            "total_commits": total,
            "last_30_days": last_30,
            "longest_streak_days": longest,
            "contributors": dict(contributors.most_common(10)),
            "truncated": total >= max_commits,
        }

    except GithubException as e:
        return {**empty, "error": str(e)}