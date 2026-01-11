# Props

**Player Props for Sports Betting / Fantasy Sports**

Real-time NBA player statistics, injury reports, and team data for making informed betting decisions.

## 🚀 Live Demo

**Frontend:** [https://ropsit.netlify.app/](https://ropsit.netlify.app/)
**Backend API:** Deployed on Render

## ✨ Features

- 📊 Real-time NBA player statistics and league leaders
- 🏥 Daily injury reports with game status
- 🏀 Team information and rosters
- ⚡ Fast API with intelligent caching
- 🎨 Modern, responsive UI built with SvelteKit

## 🛠️ Tech Stack

**Frontend:**

- SvelteKit + TypeScript
- Bun runtime
- Deployed on Netlify

**Backend:**

- Rust (Axum web framework)
- Python (NBA data fetching)
- Java (PDF parsing for injury reports)
- Deployed on Render with Docker

## 📋 Prerequisites

- **Bun** (latest) - [Install Bun](https://bun.sh)
- **Rust** (1.85+) - [Install Rust](https://rustup.rs)
- **Python** 3.10+
- **Java Runtime Environment** (JRE) 8+ (required for PDF parsing)

## 🚦 Getting Started

### Frontend Setup

```bash
cd client
bun install
bun dev
```

The frontend will be available at http://localhost:5173

### Backend Setup

```bash
cd server
cargo watch -x fmt -x run
```

The API will be available at http://localhost:3001

### Python Environment

```bash
cd server/python
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## 📁 Project Structure

```text
props/
├── client/          # SvelteKit frontend
│   ├── src/
│   └── tests/
├── server/          # Rust backend
│   ├── src/
│   ├── python/      # Python scripts for NBA data
│   └── tests/
└── Dockerfile       # Production deployment
```

## 🧪 Testing

### Frontend Tests

```bash
cd client

# Run all tests
bun run test

# Unit tests
bun run test:unit
bun run test:unit:cover

# E2E tests (Playwright)
bun run test:e2e
bun run test:e2e:ui
bun run test:e2e:report
```

### Backend Tests

```bash
cd server

# Run all tests
cargo test

# Coverage report (HTML)
cargo llvm-cov --html --open

# Coverage summary (terminal)
cargo llvm-cov
```

## 📚 Data Sources

- [nba_api](https://github.com/swar/nba_api) - Official NBA statistics
- [nbainjuries](https://www.nbainjuries.com/) - Daily injury reports

## 🐳 Docker Deployment

The project uses a multi-stage Docker build for production:

```bash
docker build -t props-backend .
docker run -p 8080:8080 props-backend
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.
