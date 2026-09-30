from github import Github
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from collections import Counter
from github import Github, GithubException
from datetime import datetime, timedelta, timezone
from collections import Counter

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

g = Github(GITHUB_TOKEN)


def get_repo_contents(repo_url: str):
    repo_name = repo_url.removeprefix("https://github.com/")
    repo = g.get_repo(repo_name)
    contents = repo.get_contents("")

    all_files = []

    while contents:
        file_content = contents.pop(0)

        if file_content.type == "dir":
            contents.extend(repo.get_contents(file_content.path))

        elif file_content.type == "file":
            try:
                if file_content.encoding == "base64":
                    decoded = file_content.decoded_content.decode(
                        "utf-8", errors="ignore"
                    )
                    all_files.append({
                        "path": file_content.path,
                        "content": decoded
                    })
            except Exception:
                continue

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