# RepoInsight

**GitHub repository intelligence platform.** Paste any public GitHub repo URL and get an instant breakdown of its tech stack, architecture, complexity, documentation quality, and commit activity.

<!-- Add a screenshot or GIF of the dashboard here -->
<!-- ![RepoInsight dashboard](docs/dashboard.png) -->

<!-- Add live demo link once deployed -->
<!-- **Live demo:** https://your-app.vercel.app -->

---

## Features

- **Language breakdown**: primary language and distribution across the repo
- **Framework detection**: identifies frameworks and libraries (Flask, FastAPI, React, Spring, etc.)
- **Architecture detection**: infers the project's architectural style (MVC, microservices, monolith, etc.)
- **Complexity scoring**: estimates project complexity from file count and code volume
- **README health score**: rates documentation quality with a visual score ring
- **Commit activity**: total commits, commits in the last 30 days, longest streak, and contributor count
- **Visual dashboard**: clean, component-based React UI with charts and stat cards

---

## Tech Stack

| Layer    | Technologies                                   |
| -------- | ---------------------------------------------- |
| Backend  | Python, FastAPI, PyGithub, python-dotenv       |
| Frontend | React, Vite, Tailwind CSS, Chart.js, Axios     |

---

## Project Structure

```
RepoInsight-AI/
├── backend/
│   ├── main.py                 # FastAPI app, POST /analyze
│   ├── github_api/
│   │   └── fetcher.py          # GitHub data fetching (repo, contents, commits)
│   ├── analyzers/              # language, framework, complexity, architecture, README scorer
│   ├── requirements.txt
│   └── .env                    # GITHUB_TOKEN (not committed)
└── frontend/
    └── src/
        ├── components/         # SearchBar, OverviewStats, FrameworksSection,
        │                       # ReadmeHealth, CommitActivity, StatCard, Pill,
        │                       # SectionHeading, ScoreRing
        ├── hooks/useAnalyze.js
        ├── api.js
        └── App.jsx
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- A [GitHub personal access token](https://github.com/settings/tokens) (no special scopes needed for public repos)

### 1. Clone the repository

```bash
git clone https://github.com/pamal29/RepoInsight-AI.git
cd RepoInsight-AI
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GITHUB_TOKEN=your_github_token
```

> A token raises the GitHub API limit from 60 to 5,000 requests per hour.

Run the server:

```bash
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000` (interactive docs at `/docs`).

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` (Vite default).

---

## API

### `POST /analyze`

Analyzes a public GitHub repository.

**Request**

```
POST /analyze?repo_url=https://github.com/user/repo
```

**Example response**

```json
{
  "total_files": 120,
  "language_info": {
    "Python": 60,
    "JavaScript": 40
  },
  "frameworks": ["FastAPI", "React"],
  "architecture": "MVC",
  "complexity": {
    "total_files": 120,
    "total_lines": 3500,
    "complexity_score": 87.5
  },
  "readme_score": {
    "score": 82,
    "max": 100
  },
  "commit_activity": {
    "total_commits": 342,
    "last_30_days": 28,
    "longest_streak": 9,
    "contributors": 4
  }
}
```

---

## Roadmap

- [ ] Faster file scanning via the Git Trees API
- [ ] Language distribution chart using `repo.get_languages()`
- [ ] Commit timeline chart and top contributors
- [ ] Rate-limit handling and result caching
- [ ] More analyzers: tests, CI/CD, license, dependency detection
- [ ] Overall repository health score
- [ ] Security checks (exposed secrets, missing `.gitignore`)
- [ ] Contributor analysis
- [ ] Compare two repositories
- [ ] Dark mode
- [ ] Docker setup
- [ ] Deployment (Render/Railway for backend, Vercel for frontend)

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## License

Distributed under the MIT License. See `LICENSE` for details.

## Author

**Pamal**: [github.com/pamal29](https://github.com/pamal29)
