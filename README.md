# Props

Player Props for Sports Betting

# How to use

## Live

Deploying this a bit later

## Locally

### 1. Install `Bun` (adding link later) and `Rust` (adding link later) so everything works fine

### Frontend

#### Do this stuff in the **./client** folder:

- First `cd client` -> `bun install`
- Start the frontend `bun dev`

### Backend

Coming soon...

### Python

More instructions coming soon...

```sh
cd server/python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

- Uses <https://github.com/swar/nba_api/> for the NBA data

## Testing

### Backend

Make sure that you are in the **./server** folder

- `cargo test` runs all the tests
- `cargo llvm-cov --html --open` shows the full test coverage report
- `cargo llvm cov` text summary
