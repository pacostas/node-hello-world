# Node Simple App

A lightweight Node.js HTTP server with health check endpoints.

## Usage

### Start the server

```bash
npm start
```

### Development mode

```bash
npm run dev
```

The server will start on port 3000 by default, or use the `PORT` environment variable if set.

## Endpoints

### `GET /`

Returns a JSON response with server information.

**Response:**

```json
{
  "message": "Hello from Node.js!",
  "version": "0.0.1",
  "environment": "production",
  "uptime": 123.456
}
```

### `GET /health`

Health check endpoint for monitoring and load balancers.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-06-29T12:00:00.000Z"
}
```

### `GET /live`

Liveness probe endpoint for Kubernetes.

**Response:**

```json
{
  "status": "alive",
  "timestamp": "2026-06-29T12:00:00.000Z"
}
```

## Environment Variables

| Variable   | Description      | Default      |
| ---------- | ---------------- | ------------ |
| `PORT`     | Server port      | `3000`       |
| `NODE_ENV` | Environment mode | `production` |
