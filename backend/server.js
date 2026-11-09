import dns from "dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { connectDB, configureDNS } from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// 1. Configure Node.js DNS to use Google DNS before any network/database connection
configureDNS();

// 2. Load environment variables from backend/.env regardless of current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config(); // fallback to root .env if present

// 3. Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Build list of allowed CORS origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

// Add FRONTEND_URL or CLIENT_URL from environment (supports comma-separated list)
const configuredFrontend = process.env.FRONTEND_URL || process.env.CLIENT_URL;
if (configuredFrontend) {
  configuredFrontend.split(",").forEach((origin) => {
    const cleanOrigin = origin.trim().replace(/\/+$/, "");
    if (cleanOrigin && !allowedOrigins.includes(cleanOrigin)) {
      allowedOrigins.push(cleanOrigin);
    }
  });
}

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check explicit allowed origins or .vercel.app deployments
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        // In development, allow for smooth testing; in production, log warning
        if (process.env.NODE_ENV !== "production") {
          callback(null, true);
        } else {
          console.warn(`⚠️ CORS: Rejected origin ${origin}`);
          callback(new Error(`CORS policy blocked access from origin: ${origin}`));
        }
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsing Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root Service Ping (Useful for Render Web Service status checks)
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Smart Resume Builder API",
    status: "active",
    version: "1.0.0",
    healthCheck: "/api/health",
    resumesEndpoint: "/api/resumes",
    aiEndpoint: "/api/ai",
  });
});

// API Health Check
app.get("/api/health", (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  const isGeminiConfigured = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() !== "" &&
      process.env.GEMINI_API_KEY !== "your_gemini_api_key_here"
  );

  res.status(200).json({
    status: "online",
    message: "Smart Resume Builder API is running smoothly",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    services: {
      database: isMongoConnected
        ? "Connected (MongoDB Atlas)"
        : "Disconnected / Pending URI in .env",
      geminiAI: isGeminiConfigured
        ? "Configured"
        : "Missing GEMINI_API_KEY in .env",
    },
  });
});

// Mount Routes
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server ONLY after MongoDB connection succeeds
const startServer = async () => {
  try {
    // 1. Connect to MongoDB Atlas first
    await connectDB();

    // 2. Start Express listening
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`🚀 Smart Resume Builder Server running on port ${PORT}`);
      console.log(`📡 Health Check endpoint: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Allowed CORS origins:`, allowedOrigins);
    });

    // Graceful Shutdown helper
    const handleShutdown = (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        try {
          await mongoose.connection.close(false);
          console.log("Server closed. Database connection terminated.");
        } catch (closeErr) {
          console.error("Error closing MongoDB connection:", closeErr);
        } finally {
          process.exit(0);
        }
      });
    };

    process.on("SIGTERM", () => handleShutdown("SIGTERM"));
    process.on("SIGINT", () => handleShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Fatal: Server startup aborted due to database connection error.");
    process.exit(1);
  }
};

startServer();

export default app;
