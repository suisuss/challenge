#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BACKEND_ENV="${PROJECT_DIR}/backend/.env"
FRONTEND_ENV="${PROJECT_DIR}/frontend/.env"
SEED_DIR="${PROJECT_DIR}/seed_db"

# ============================================================
# Helper: load a value from a .env file
# ============================================================
env_val() {
  local file="$1" key="$2"
  grep -E "^${key}=" "$file" | head -1 | cut -d'=' -f2-
}

# ============================================================
# Validate prerequisites
# ============================================================
if ! command -v railway &>/dev/null; then
  echo "Error: railway CLI not installed. Run: npm install -g @railway/cli"
  exit 1
fi

if [ ! -f "$BACKEND_ENV" ]; then
  echo "Error: backend/.env not found"
  exit 1
fi

if [ ! -f "$FRONTEND_ENV" ]; then
  echo "Error: frontend/.env not found"
  exit 1
fi

echo "==> Using env files as source of truth"
echo "    Backend:  ${BACKEND_ENV}"
echo "    Frontend: ${FRONTEND_ENV}"

# ============================================================
# 1. Seed the database
# ============================================================
echo ""
echo "==> Fetching Postgres credentials from Railway..."
DB_PUBLIC_URL=$(railway variable get DATABASE_PUBLIC_URL --service Postgres 2>/dev/null || true)

if [ -z "$DB_PUBLIC_URL" ]; then
  echo "Error: Could not fetch DATABASE_PUBLIC_URL from Railway Postgres service."
  echo "Make sure the project is linked and a Postgres service exists."
  exit 1
fi

echo "==> Seeding database schema..."
docker run --rm -v "${SEED_DIR}:/seed_db" postgres:16-alpine \
  psql "${DB_PUBLIC_URL}" -f /seed_db/tables.sql

echo "==> Seeding database data..."
docker run --rm -v "${SEED_DIR}:/seed_db" postgres:16-alpine \
  psql "${DB_PUBLIC_URL}" -f /seed_db/seed-db.sql

echo "==> Database seeded successfully."

# ============================================================
# 2. Generate public domains
# ============================================================
echo ""
echo "==> Generating Railway domains..."
FRONTEND_DOMAIN=$(railway domain --service frontend 2>&1 | grep -oP 'https://\S+' || true)
BACKEND_DOMAIN=$(railway domain --service backend 2>&1 | grep -oP 'https://\S+' || true)

echo "    Frontend: ${FRONTEND_DOMAIN}"
echo "    Backend:  ${BACKEND_DOMAIN}"

# ============================================================
# 3. Set backend environment variables
# ============================================================
echo ""
echo "==> Setting backend environment variables (from backend/.env)..."
railway variable set --service backend \
  "PORT=$(env_val "$BACKEND_ENV" PORT)" \
  "NODE_ENV=production" \
  'DATABASE_URL=${{Postgres.DATABASE_URL}}' \
  "UI_URL=${FRONTEND_DOMAIN}" \
  "API_URL=${BACKEND_DOMAIN}" \
  "COOKIE_DOMAIN=.up.railway.app" \
  "JWT_ACCESS_TOKEN_SECRET=$(env_val "$BACKEND_ENV" JWT_ACCESS_TOKEN_SECRET)" \
  "JWT_REFRESH_TOKEN_SECRET=$(env_val "$BACKEND_ENV" JWT_REFRESH_TOKEN_SECRET)" \
  "CSRF_TOKEN_SECRET=$(env_val "$BACKEND_ENV" CSRF_TOKEN_SECRET)" \
  "JWT_ACCESS_TOKEN_TIME_IN_MS=$(env_val "$BACKEND_ENV" JWT_ACCESS_TOKEN_TIME_IN_MS)" \
  "JWT_REFRESH_TOKEN_TIME_IN_MS=$(env_val "$BACKEND_ENV" JWT_REFRESH_TOKEN_TIME_IN_MS)" \
  "CSRF_TOKEN_TIME_IN_MS=$(env_val "$BACKEND_ENV" CSRF_TOKEN_TIME_IN_MS)" \
  "MAIL_FROM_USER=$(env_val "$BACKEND_ENV" MAIL_FROM_USER)" \
  "EMAIL_VERIFICATION_TOKEN_SECRET=$(env_val "$BACKEND_ENV" EMAIL_VERIFICATION_TOKEN_SECRET)" \
  "EMAIL_VERIFICATION_TOKEN_TIME_IN_MS=$(env_val "$BACKEND_ENV" EMAIL_VERIFICATION_TOKEN_TIME_IN_MS)" \
  "PASSWORD_SETUP_TOKEN_TIME_IN_MS=$(env_val "$BACKEND_ENV" PASSWORD_SETUP_TOKEN_TIME_IN_MS)" \
  "PASSWORD_SETUP_TOKEN_SECRET=$(env_val "$BACKEND_ENV" PASSWORD_SETUP_TOKEN_SECRET)" \
  "RESEND_API_KEY=$(env_val "$BACKEND_ENV" RESEND_API_KEY)"

echo "==> Backend variables set."

# ============================================================
# 4. Set frontend environment variables
# ============================================================
echo ""
echo "==> Setting frontend environment variables (from frontend/.env)..."
railway variable set --service frontend \
  "VITE_API_URL=${BACKEND_DOMAIN}"

echo "==> Frontend variables set."

# ============================================================
# 5. Summary
# ============================================================
echo ""
echo "==> Railway setup complete!"
echo "    Frontend: ${FRONTEND_DOMAIN}"
echo "    Backend:  ${BACKEND_DOMAIN}"
echo ""
echo "NOTE: The secrets in backend/.env are dev defaults."
echo "      For real production, update backend/.env with strong"
echo "      random values and re-run this script."
