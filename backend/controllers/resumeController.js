import mongoose from "mongoose";
import { Resume } from "../models/Resume.js";

/**
 * Guard to verify MongoDB Atlas connection is healthy
 */
const checkDbConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      success: false,
      message:
        "MongoDB Atlas is not connected. Please verify MONGODB_URI in your environment variables.",
    });
    return false;
  }
  return true;
};

/**
 * @desc    Create a new resume document in MongoDB
 * @route   POST /api/resumes
 */
export const createResume = async (req, res, next) => {
  try {
    if (!checkDbConnection(res)) return;

    const resumeData = req.body;

    // Use full name as title if title is not provided
    if (!resumeData.title && resumeData.personalInfo?.fullName) {
      resumeData.title = `${resumeData.personalInfo.fullName}'s Resume`;
    }

    const newResume = new Resume(resumeData);
    const savedResume = await newResume.save();

    res.status(201).json({
      success: true,
      message: "Resume successfully saved to MongoDB Atlas",
      data: savedResume,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all resumes
 * @route   GET /api/resumes
 */
export const getResumes = async (req, res, next) => {
  try {
    if (!checkDbConnection(res)) return;

    const resumes = await Resume.find().sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a single resume by ID
 * @route   GET /api/resumes/:id
 */
export const getResumeById = async (req, res, next) => {
  try {
    if (!checkDbConnection(res)) return;

    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: `Resume with ID '${id}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing resume
 * @route   PUT /api/resumes/:id
 */
export const updateResume = async (req, res, next) => {
  try {
    if (!checkDbConnection(res)) return;

    const { id } = req.params;
    const updateData = req.body;

    const updatedResume = await Resume.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: `Resume with ID '${id}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully in MongoDB Atlas",
      data: updatedResume,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a resume from MongoDB
 * @route   DELETE /api/resumes/:id
 */
export const deleteResume = async (req, res, next) => {
  try {
    if (!checkDbConnection(res)) return;

    const { id } = req.params;
    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({
        success: false,
        message: `Resume with ID '${id}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume permanently deleted from MongoDB Atlas",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
