# ---- Build stage ----
FROM golang:1.25-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/server

# ---- Dev stage ----
FROM golang:1.25-alpine AS dev

RUN go install github.com/air-verse/air@v1.64.5

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

EXPOSE 5008

CMD ["air", "-c", ".air.toml"]

# ---- Prod stage ----
FROM alpine:3.21 AS prod

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/server .

EXPOSE 5008

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:5008/api/v1/health || exit 1

CMD ["./server"]
