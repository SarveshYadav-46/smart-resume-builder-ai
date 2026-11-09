import express from "express";
import {
  handleImproveSummary,
  handleImproveExperience,
  handleImproveProject,
  handleSuggestSkills,
  handleGenerateContent,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/improve-summary", handleImproveSummary);
router.post("/improve-experience", handleImproveExperience);
router.post("/improve-project", handleImproveProject);
router.post("/suggest-skills", handleSuggestSkills);
router.post("/generate-content", handleGenerateContent);

export default router;
