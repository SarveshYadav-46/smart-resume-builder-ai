import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  id: { type: String, default: () => `exp-${Date.now()}` },
  role: { type: String, default: "" },
  company: { type: String, default: "" },
  location: { type: String, default: "" },
  startDate: { type: String, default: "" },
  endDate: { type: String, default: "" },
  current: { type: Boolean, default: false },
  description: { type: String, default: "" },
});

const EducationSchema = new mongoose.Schema({
  id: { type: String, default: () => `edu-${Date.now()}` },
  institution: { type: String, default: "" },
  degree: { type: String, default: "" },
  fieldOfStudy: { type: String, default: "" },
  startDate: { type: String, default: "" },
  endDate: { type: String, default: "" },
  location: { type: String, default: "" },
  gpa: { type: String, default: "" },
});

const SkillCategorySchema = new mongoose.Schema({
  category: { type: String, default: "Skills" },
  items: [{ type: String }],
});

const ProjectSchema = new mongoose.Schema({
  id: { type: String, default: () => `proj-${Date.now()}` },
  title: { type: String, default: "" },
  techStack: { type: String, default: "" },
  liveLink: { type: String, default: "" },
  githubLink: { type: String, default: "" },
  description: { type: String, default: "" },
});

const CertificationSchema = new mongoose.Schema({
  id: { type: String, default: () => `cert-${Date.now()}` },
  name: { type: String, default: "" },
  issuer: { type: String, default: "" },
  issueDate: { type: String, default: "" },
  credentialUrl: { type: String, default: "" },
  credentialId: { type: String, default: "" },
});

const ResumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },
    targetRole: {
      type: String,
      default: "Software Engineer",
      trim: true,
    },
    personalInfo: {
      fullName: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      portfolio: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      summary: { type: String, default: "" },
    },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillCategorySchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    activeTemplate: {
      type: String,
      enum: ["modern", "classic"],
      default: "modern",
    },
    accentColor: {
      type: String,
      enum: ["indigo", "emerald", "sky", "slate"],
      default: "indigo",
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model("Resume", ResumeSchema);
