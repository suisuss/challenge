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

COPY tsconfig.json ./

EXPOSE 5007

CMD ["npx", "tsx", "watch", "src/server.ts"]

# ---- Prod stage ----
FROM base AS prod

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npx tsc

RUN npm prune --omit=dev

RUN rm -rf src tsconfig.json

COPY public ./public

EXPOSE 5007

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5007/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

CMD ["node", "dist/server.js"]
