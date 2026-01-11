#!/usr/bin/env bash
set -e

# Install Python dependencies
echo "Installing Python dependencies..."
cd python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..

# Build Rust
echo "Building Rust backend..."
cargo build --release

echo "Build complete!"
