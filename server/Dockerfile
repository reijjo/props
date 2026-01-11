FROM rust:bookworm as builder

# Install system dependencies (Java, Python)
RUN apt-get update && apt-get install -y \
    default-jre \
    default-jdk \
    python3 \
    python3-venv \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/default-java
ENV PATH=$JAVA_HOME/bin:$PATH

WORKDIR /app

# Copy current directory (which is already server/)
COPY . .

# Install Python dependencies
RUN cd python && \
    python3 -m venv .venv && \
    . .venv/bin/activate && \
    pip install --no-cache-dir -r requirements.txt

# Build Rust
RUN cargo build --release

# Runtime stage (same Debian version as builder)
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    default-jre \
    python3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/default-java
ENV PATH="/app/bin:$JAVA_HOME/bin:$PATH"

WORKDIR /app

# Copy Python venv and scripts
COPY --from=builder /app/python /app/python

# Create structure that matches your code's expectation
# Your code does: current_exe().parent().parent().parent() = /app
# So binary needs to be at: /app/target/release/server
RUN mkdir -p /app/target/release
COPY --from=builder /app/target/release/server /app/target/release/server

EXPOSE 8080

CMD ["/app/target/release/server"]
