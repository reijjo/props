# Props

**Player Props for Sports Betting / Fantasy Sports**

Real-time NBA player statistics, injury reports, and team data for making informed betting decisions.

Landing page
<img width="1399" height="737" alt="Screenshot 2026-01-11 at 17 07 29" src="https://github.com/user-attachments/assets/e738b176-fdaa-4f18-b347-ffff3795c836" />

Team page
<img width="1399" height="737" alt="Screenshot 2026-01-11 at 17 08 24" src="https://github.com/user-attachments/assets/feb6de1d-b948-436d-a5a8-6a73f52e9ef9" />



<details>
  <summary>More images</summary>
  
  <p></p>
  <p>NBA Home</p>
  <img width="1399" height="737" alt="Screenshot 2026-01-11 at 17 07 59" src="https://github.com/user-attachments/assets/14e36ea1-7d8e-4186-8178-7b804a991f39" />
  
  <p></p>
  <p>Player page</p>
  <img width="1399" height="737" alt="Screenshot 2026-01-11 at 17 09 10" src="https://github.com/user-attachments/assets/788972c7-b904-4f0d-827f-7dbbd14f39ff" />
  
  <p></p>
  <p>Mobile landing page</p>
  <img width="299" height="650" alt="Screenshot 2026-01-11 at 17 10 13" src="https://github.com/user-attachments/assets/4d564c6c-1c87-417d-9d4b-4251071b782c" />
  
  <p></p>
  <p>Mobile NBA Home</p>
  <img width="299" height="650" alt="Screenshot 2026-01-11 at 17 10 30" src="https://github.com/user-attachments/assets/e0d10009-bfab-4bbf-a653-36b7436401ad" />

  <p></p>
  <p>Mobile team page</p>
  <img width="299" height="650" alt="Screenshot 2026-01-11 at 17 12 18" src="https://github.com/user-attachments/assets/1ce59ac4-23ed-43eb-b01c-6fc39031545d" />

  <p></p>
  <p>Mobile player page</p>
  <img width="299" height="650" alt="Screenshot 2026-01-11 at 17 12 46" src="https://github.com/user-attachments/assets/10a44461-28bb-4505-a29a-c08116331f00" />
</details>

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
- [nbainjuries](https://github.com/mxufc29/nbainjuries) - Daily injury reports

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
