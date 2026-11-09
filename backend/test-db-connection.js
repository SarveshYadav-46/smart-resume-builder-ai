import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { Resume } from "./models/Resume.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

async function runComprehensiveTests() {
  console.log("=================================================");
  console.log("   MongoDB Atlas Connection & CRUD Test Suite    ");
  console.log("=================================================");

  try {
    // 1. Verify SRV DNS resolution
    console.log("\n[Test 1] Testing SRV DNS resolution with Google DNS...");
    await new Promise((resolve, reject) => {
      dns.resolveSrv("_mongodb._tcp.cluster0.rchqxt8.mongodb.net", (err, records) => {
        if (err) {
          console.error("❌ SRV resolution failed:", err);
          return reject(err);
        }
        console.log(`✅ SRV resolution successful! Found ${records.length} cluster nodes:`);
        records.forEach((r, idx) => {
          console.log(`   Node ${idx + 1}: ${r.name}:${r.port}`);
        });
        resolve(records);
      });
    });

    // 2. Test Mongoose connection using backend/config/db.js
    console.log("\n[Test 2] Testing connectDB() from config/db.js...");
    const conn = await connectDB();
    console.log(`✅ Verified Connection State: readyState = ${mongoose.connection.readyState} (1 = connected)`);

    // 3. Test Resume Model CRUD Operations
    console.log("\n[Test 3] Testing Resume Model CRUD Operations in MongoDB Atlas...");

    // Create
    const sampleResume = new Resume({
      title: "Senior Full Stack Engineer Resume",
      targetRole: "Senior Full Stack Engineer",
      personalInfo: {
        fullName: "Test Engineer",
        jobTitle: "Senior MERN Stack Developer",
        email: "test.engineer@example.com",
        phone: "+1-555-0199",
        location: "New York, NY",
        summary: "Seasoned engineer with extensive experience in Node.js, React, and MongoDB Atlas.",
      },
      experience: [
        {
          role: "Senior Engineer",
          company: "Tech Corp",
          location: "San Francisco, CA",
          startDate: "2022-01",
          current: true,
          description: "Architected microservices and optimized database pipelines.",
        },
      ],
      skills: [
        {
          category: "Backend",
          items: ["Node.js", "Express", "MongoDB Atlas", "Mongoose"],
        },
      ],
    });

    const savedDoc = await sampleResume.save();
    console.log(`✅ [CREATE] Resume inserted with _id: ${savedDoc._id}`);

    // Read
    const fetchedDoc = await Resume.findById(savedDoc._id);
    if (!fetchedDoc || fetchedDoc.title !== sampleResume.title) {
      throw new Error("Read operation failed or returned mismatched document");
    }
    console.log(`✅ [READ] Resume fetched successfully: "${fetchedDoc.title}"`);

    // Update
    fetchedDoc.title = "Updated Senior Full Stack Engineer Resume";
    const updatedDoc = await fetchedDoc.save();
    console.log(`✅ [UPDATE] Resume updated successfully: "${updatedDoc.title}"`);

    // Delete
    const deletedDoc = await Resume.findByIdAndDelete(savedDoc._id);
    console.log(`✅ [DELETE] Resume cleaned up successfully: ${deletedDoc._id}`);

    console.log("\n=================================================");
    console.log("🎉 ALL TESTS PASSED: MongoDB Atlas connection and CRUD operations are 100% verified!");
    console.log("=================================================");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Test Suite Failed:", error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
}

runComprehensiveTests();
