import dns from "dns";
import mongoose from "mongoose";

/**
 * Configure Node.js DNS to use Google DNS (8.8.8.8, 8.8.4.4).
 * This resolves the querySrv ECONNREFUSED error on Windows/ISP environments
 * where the default system DNS fails to resolve MongoDB Atlas SRV records.
 */
export const configureDNS = () => {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (error) {
    console.warn("⚠️ Warning: Could not set custom DNS servers:", error.message);
  }
};

// Configure DNS immediately when module is imported
configureDNS();

/**
 * Connect to MongoDB Atlas
 * Ensures DNS configuration runs before MongoDB connection initialization.
 */
export const connectDB = async () => {
  // Re-verify DNS configuration prior to connection
  configureDNS();

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    const errorMsg = "MONGODB_URI is not set in backend/.env. Please verify your environment configuration.";
    console.error(`❌ ${errorMsg}`);
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Atlas Connected Successfully");
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database Name: ${conn.connection.name}`);

    // Listen for runtime connection events
    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB runtime connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB connection lost. Reconnection in progress...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected successfully.");
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    console.error("👉 Please verify your MongoDB Atlas cluster URI, network access (IP 0.0.0.0/0 whitelist), and user credentials.");
    throw error;
  }
};
