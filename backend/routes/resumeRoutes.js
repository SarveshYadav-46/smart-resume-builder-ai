import express from "express";
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.route("/")
  .post(createResume)
  .get(getResumes);

router.route("/:id")
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

export default router;
