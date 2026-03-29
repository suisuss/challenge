# ---- Base ----
FROM node:20-bookworm-slim AS base

WORKDIR /app

COPY package.json ./

RUN npm install

# ---- Dev stage ----
FROM base AS dev

EXPOSE 5173

CMD ["npx", "vite", "--host", "0.0.0.0", "--open", "false"]

# ---- Build stage (for prod) ----
FROM base AS build

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY . .

RUN npx vite build

# ---- Prod stage ----
FROM caddy:2.8-alpine AS prod

WORKDIR /srv
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -q --spider http://localhost:3000/ || exit 1
