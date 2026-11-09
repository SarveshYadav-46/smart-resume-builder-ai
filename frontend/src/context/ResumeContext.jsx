import React, { createContext, useContext, useState, useEffect } from "react";
import { initialSampleResume } from "../data/sampleResume";
import { initialDashboardResumes } from "../data/mockResumes";
import {
  getResumesApi,
  getResumeByIdApi,
  createResumeApi,
  updateResumeApi,
  deleteResumeApi,
  checkHealthApi,
} from "../services/api";

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialSampleResume);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [activeTemplate, setActiveTemplate] = useState("modern"); // 'modern' | 'classic'
  const [accentColor, setAccentColor] = useState("indigo"); // 'indigo' | 'emerald' | 'sky' | 'slate'
  
  // Dashboard & Server State
  const [dashboardResumes, setDashboardResumes] = useState([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [serverStatus, setServerStatus] = useState({ online: false, message: "Checking backend..." });

  // Load resumes from MongoDB on initial mount
  useEffect(() => {
    fetchResumesFromBackend();
    verifyServerHealth();
  }, []);

  const verifyServerHealth = async () => {
    try {
      const health = await checkHealthApi();
      setServerStatus({ online: true, ...health });
    } catch {
      setServerStatus({ online: false, message: "Backend offline (connect port 5000)" });
    }
  };

  /**
   * Fetch all resumes from MongoDB Atlas
   */
  const fetchResumesFromBackend = async () => {
    setIsLoadingResumes(true);
    try {
      const response = await getResumesApi();
      if (response && response.data) {
        // Map database documents to clean dashboard format
        const mapped = response.data.map((doc) => ({
          id: doc._id,
          title: doc.title || (doc.personalInfo?.fullName ? `${doc.personalInfo.fullName}'s Resume` : "Untitled Resume"),
          targetRole: doc.targetRole || doc.personalInfo?.jobTitle || "Software Engineer",
          template: doc.activeTemplate === "classic" ? "Classic ATS" : "Modern Clean",
          lastModified: doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : "Recently",
          completion: 95,
          atsScore: 90,
          status: "Ready",
          themeColor: doc.accentColor || "indigo",
          rawData: doc,
        }));
        setDashboardResumes(mapped);
      }
    } catch {
      // If backend is not yet started or MongoDB pending, fall back to initial mock resumes
      setDashboardResumes(initialDashboardResumes);
    } finally {
      setIsLoadingResumes(false);
    }
  };

  /**
   * Save current resume state to MongoDB Atlas (Create or Update)
   */
  const saveResumeToBackend = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: resumeData.personalInfo?.fullName
          ? `${resumeData.personalInfo.fullName}'s Resume`
          : "Full Stack Developer Resume",
        targetRole: resumeData.personalInfo?.jobTitle || "Software Engineer",
        personalInfo: resumeData.personalInfo,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
        certifications: resumeData.certifications || [],
        activeTemplate,
        accentColor,
      };

      let response;
      if (currentResumeId) {
        response = await updateResumeApi(currentResumeId, payload);
      } else {
        response = await createResumeApi(payload);
        if (response?.data?._id) {
          setCurrentResumeId(response.data._id);
        }
      }

      // Refresh resumes list in dashboard
      await fetchResumesFromBackend();

      return {
        success: true,
        message: currentResumeId ? "Resume updated in MongoDB Atlas" : "Resume created and saved to MongoDB Atlas",
        data: response.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Failed to save resume to MongoDB Atlas",
      };
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Load a specific resume from MongoDB Atlas into the builder
   */
  const loadResumeFromBackend = async (id) => {
    try {
      const response = await getResumeByIdApi(id);
      if (response && response.data) {
        const doc = response.data;
        setCurrentResumeId(doc._id);
        setResumeData({
          personalInfo: doc.personalInfo || initialSampleResume.personalInfo,
          experience: doc.experience || [],
          education: doc.education || [],
          skills: doc.skills || [],
          projects: doc.projects || [],
          certifications: doc.certifications || [],
        });
        if (doc.activeTemplate) setActiveTemplate(doc.activeTemplate);
        if (doc.accentColor) setAccentColor(doc.accentColor);
        return { success: true };
      }
    } catch (err) {
      // If offline, check if in local dashboardResumes
      const local = dashboardResumes.find((r) => r.id === id);
      if (local && local.rawData) {
        const doc = local.rawData;
        setCurrentResumeId(doc._id);
        setResumeData({
          personalInfo: doc.personalInfo || initialSampleResume.personalInfo,
          experience: doc.experience || [],
          education: doc.education || [],
          skills: doc.skills || [],
          projects: doc.projects || [],
          certifications: doc.certifications || [],
        });
        return { success: true };
      }
      return { success: false, message: err.message };
    }
  };

  /**
   * Delete a resume from MongoDB Atlas
   */
  const deleteResumeFromBackend = async (id) => {
    try {
      await deleteResumeApi(id);
      setDashboardResumes((prev) => prev.filter((r) => r.id !== id));
      if (currentResumeId === id) {
        setCurrentResumeId(null);
      }
      return { success: true };
    } catch {
      // Fallback local deletion
      setDashboardResumes((prev) => prev.filter((r) => r.id !== id));
      return { success: true };
    }
  };

  // Update Personal Info
  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Update Professional Summary
  const updateSummary = (value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        summary: value,
      },
    }));
  };

  // Work Experience Operations
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "New Role / Position",
      company: "Company Name",
      location: "City, Country",
      startDate: "2024",
      endDate: "Present",
      current: true,
      description: "Describe your key contributions, achievements, and technologies used...",
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  // Education Operations
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "College / University Name",
      degree: "Degree Title",
      fieldOfStudy: "Major / Field",
      startDate: "2021",
      endDate: "2025",
      location: "City, Country",
      gpa: "Grade / GPA",
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Projects Operations
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "New Project Name",
      techStack: "React, Node.js, Tailwind CSS",
      liveLink: "",
      githubLink: "",
      description: "Brief overview of what the application does, problems it solves, and technologies leveraged.",
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  // Certifications Operations
  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: "Certification Name",
      issuer: "Issuing Organization",
      issueDate: "2024",
      credentialUrl: "",
      credentialId: "",
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert],
    }));
  };

  const updateCertification = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeCertification = (id) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((item) => item.id !== id),
    }));
  };

  // Skills Operations
  const addSkillToCategory = (catIndex, skillName) => {
    if (!skillName.trim()) return;
    setResumeData((prev) => {
      const updatedSkills = [...prev.skills];
      if (updatedSkills[catIndex]) {
        updatedSkills[catIndex] = {
          ...updatedSkills[catIndex],
          items: [...updatedSkills[catIndex].items, skillName.trim()],
        };
      }
      return { ...prev, skills: updatedSkills };
    });
  };

  const removeSkillFromCategory = (catIndex, skillIndex) => {
    setResumeData((prev) => {
      const updatedSkills = [...prev.skills];
      if (updatedSkills[catIndex]) {
        updatedSkills[catIndex] = {
          ...updatedSkills[catIndex],
          items: updatedSkills[catIndex].items.filter((_, idx) => idx !== skillIndex),
        };
      }
      return { ...prev, skills: updatedSkills };
    });
  };

  const addSkillCategory = (categoryName) => {
    if (!categoryName.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: categoryName.trim(), items: [] }],
    }));
  };

  const removeSkillCategory = (catIndex) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== catIndex),
    }));
  };

  // Reset & Clear
  const resetToSample = () => {
    setResumeData(initialSampleResume);
    setCurrentResumeId(null);
  };

  const clearAll = () => {
    setResumeData({
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        portfolio: "",
        linkedin: "",
        github: "",
        summary: "",
      },
      experience: [],
      education: [],
      skills: [
        { category: "Frontend", items: [] },
        { category: "Backend", items: [] },
        { category: "Tools", items: [] },
      ],
      projects: [],
      certifications: [],
    });
    setCurrentResumeId(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        currentResumeId,
        setCurrentResumeId,
        activeTemplate,
        setActiveTemplate,
        accentColor,
        setAccentColor,
        dashboardResumes,
        isLoadingResumes,
        isSaving,
        serverStatus,
        fetchResumesFromBackend,
        saveResumeToBackend,
        loadResumeFromBackend,
        deleteResumeFromBackend,
        updatePersonalInfo,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        addSkillToCategory,
        removeSkillFromCategory,
        addSkillCategory,
        removeSkillCategory,
        resetToSample,
        clearAll,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
