#!/usr/bin/env bash
set -e

# Install Java (required for nbainjuries package)
echo "Installing Java..."
apt-get update
apt-get install -y default-jre

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/default-java
export PATH=$JAVA_HOME/bin:$PATH

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
