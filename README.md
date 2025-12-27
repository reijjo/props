# Props

Player Props for Sports Betting / Fantasy Sports

# How to use

## Live

Deploying this a bit later

## Locally

### Install `Bun` (adding link later) and `Rust` (adding link later) so everything works fine

### Frontend

#### Do this stuff in the **./client** folder:

- First `bun install`
- Start the frontend `bun dev`

### Backend

#### Do this stuff in the **./server** folder:

- Run the server with 'hot reload' -> `cargo watch -x fmt -x run`
- `fmt` is a code formatter that cleans your code on every load

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

### Frontend

Make sure that you are in the **./client** folder

`bun run test` runs all the tests

**Unit tests**

- `bun run test:unit` runs unit tests
- `bun run test:unit:cover` shows the coverage of the unit tests

**e2e tests**

- `bun run test:e2e` runs the e2e tests
- `bun run test:e2e:report` runs the e2e tests and shows Playwright report
- `bun run test:e2e:ui` runs the e2e tests with ui

### Backend

Make sure that you are in the **./server** folder

- `cargo test` runs all the tests
- `cargo llvm-cov --html --open` shows the full test coverage report
- `cargo llvm-cov` text summary
