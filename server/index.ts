// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// // Auth handlers
// import { handleSignup, handleLogin, handleLogout, handleGetMe } from "./routes/auth";
// // Optional: Import other route handlers
// import { handleGetProperties, handleGetProperty, handleCreateProperty, handleGetUserProperties } from "./routes/properties";
// import { handleContact } from "./routes/contact";

// const app = express();


// // Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Health check
// app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// // Auth routes
// app.post("/api/auth/signup", handleSignup);
// app.post("/api/auth/login", handleLogin);
// app.post("/api/auth/logout", handleLogout);
// app.get("/api/auth/me", handleGetMe);

// // Example ping route
// app.get("/api/ping", (_req, res) => {
//   const ping = process.env.PING_MESSAGE ?? "ping";
//   res.json({ message: ping });
// });

// // TODO: Add other routes here
// app.get("/api/properties", handleGetProperties);
// app.get("/api/properties/:id", handleGetProperty);
// app.post("/api/properties", handleCreateProperty);
// app.get("/api/users/me/properties", handleGetUserProperties);
// app.post("/api/contact", handleContact);

// // Start backend server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

// export default app;
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Auth handlers
import { handleSignup, handleLogin, handleLogout, handleGetMe } from "./routes/auth";
import { handleGetProperties, handleGetProperty, handleCreateProperty, handleGetUserProperties } from "./routes/properties";
import { handleContact } from "./routes/contact";

// MongoDB connect
import { connectDB } from "./db";  // <- import connectDB

const app = express();

// Connect DB first
connectDB().catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // DB connect failure → exit
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Auth routes
app.post("/api/auth/signup", handleSignup);
app.post("/api/auth/login", handleLogin);
app.post("/api/auth/logout", handleLogout);
app.get("/api/auth/me", handleGetMe);

// Property routes
app.get("/api/properties", handleGetProperties);
app.get("/api/properties/:id", handleGetProperty);
app.post("/api/properties", handleCreateProperty);
app.get("/api/users/me/properties", handleGetUserProperties);
app.post("/api/contact", handleContact);

// Start server
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});


export default app;
