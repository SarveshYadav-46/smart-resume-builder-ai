import dotenv from "dotenv";
dotenv.config();

import {
  improveSummaryService,
  improveExperienceService,
  suggestSkillsService
} from "./services/aiService.js";

async function testAIService() {
  console.log("=================================================");
  console.log("          Testing Gemini AI Services             ");
  console.log("=================================================");

  try {
    // 1. Test Summary Improvement
    console.log("\n[Test 1] Testing improveSummaryService...");
    const summaryResult = await improveSummaryService({
      jobTitle: "Senior MERN Stack Engineer",
      summary: "I build websites with React, Node.js and MongoDB and have good experience with coding."
    });
    console.log("✅ Summary improved successfully!");
    console.log("Target Role:", summaryResult.targetRole);
    console.log("Original:\n", summaryResult.original);
    console.log("Improved:\n", summaryResult.improved);

    // 2. Test Skills Suggestion
    console.log("\n[Test 2] Testing suggestSkillsService...");
    const skillsResult = await suggestSkillsService({
      jobTitle: "Full Stack Developer",
      currentSkills: ["React", "Node.js"]
    });
    console.log("✅ Skills suggested successfully!");
    console.log("Suggested Skills Count:", skillsResult.suggestedSkills.length);
    console.log("Skills:", skillsResult.suggestedSkills.slice(0, 8).join(", "));

    // 3. Test Experience Improvement
    console.log("\n[Test 3] Testing improveExperienceService...");
    const expResult = await improveExperienceService({
      role: "Software Engineer",
      company: "Acme Corp",
      description: "Worked on frontend and backend APIs. Fixed database bugs and made page load faster."
    });
    console.log("✅ Experience improved successfully!");
    console.log("Improved Points:\n", expResult.improved);

    console.log("\n=================================================");
    console.log("🎉 ALL GEMINI AI TESTS PASSED SUCCESSFULLY!");
    console.log("=================================================");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Gemini AI Test Failed:", error.message);
    if (error.statusCode) console.error("Status Code:", error.statusCode);
    process.exit(1);
  }
}

testAIService();
