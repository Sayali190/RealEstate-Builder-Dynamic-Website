import path from "path";
import app from "./index";
import { connectDB } from "./db";   // ⬅️ MongoDB import
import * as express from "express";

const port = process.env.PORT || 3000;

async function startServer() {
  // 🔑 MongoDB connect FIRST
  await connectDB();

  
  //const app = createServer();

  // In production, serve the built SPA files
  const __dirname = import.meta.dirname;
  const distPath = path.join(__dirname, "../spa");

  // Serve static files
  app.use(express.static(distPath));

  // Handle React Router - serve index.html for all non-API routes
  // app.get("*", (req, res) => {
  //   if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
  //     return res.status(404).json({ error: "API endpoint not found" });
  //   }
  //   res.sendFile(path.join(distPath, "index.html"));
  // });
  app.get(/^(?!\/api\/|\/health).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});


  app.listen(port, () => {
    console.log(`🚀 Fusion Starter server running on port ${port}`);
    console.log(`📱 Frontend: http://localhost:${port}`);
    console.log(`🔧 API: http://localhost:${port}/api`);
  });
}

startServer();

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
