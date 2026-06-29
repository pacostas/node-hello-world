const { createServer } = require("http");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "production";

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

const server = createServer((req, res) => {
  log(`${req.method} ${req.url}`);

  if (req.url.match(/\/health/) && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
    );
  } else if (req.url.match(/\/live/) && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ status: "alive", timestamp: new Date().toISOString() }),
    );
  } else if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Hello from Node.js!",
        version: "0.0.1",
        environment: ENV,
        uptime: process.uptime(),
      }),
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.on("error", (err) => {
  log(`Server error: ${err.message}`);
  process.exit(1);
});

process.on("SIGTERM", () => {
  log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  log("SIGINT received, shutting down gracefully");
  server.close(() => {
    log("Server closed");
    process.exit(0);
  });
});

server.listen(PORT, () => {
  log(`Server running on port ${PORT} in ${ENV} mode`);
  log(`Health check: http://localhost:${PORT}/health`);
  log(`Liveness check: http://localhost:${PORT}/live`);
});
