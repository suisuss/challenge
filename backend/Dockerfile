# ---- Base stage: shared setup ----
FROM node:20-bookworm-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./

# ---- Dev stage ----
FROM base AS dev

RUN npm ci

EXPOSE 5007

CMD ["node", "--watch-path=./src", "./src/server.js"]

# ---- Prod dependencies ----
FROM base AS prod-deps

RUN npm ci --omit=dev

# ---- Prod stage ----
FROM node:20-bookworm-slim AS prod

WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5007

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5007/api/v1', (r) => { process.exit(r.statusCode === 404 ? 0 : 1) }).on('error', () => process.exit(1))"

CMD ["node", "./src/server.js"]
