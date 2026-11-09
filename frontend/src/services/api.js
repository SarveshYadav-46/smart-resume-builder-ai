// Normalize API Base URL, removing trailing slashes and ensuring /api suffix
const rawUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").trim().replace(/\/+$/, "");
const API_BASE_URL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl}/api`;

/**
 * Generic fetch wrapper with standard error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.statusCode = res.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
      const offlineError = new Error(
        "Could not connect to the backend server. Please verify your backend server is running on http://localhost:5000."
      );
      offlineError.statusCode = 503;
      throw offlineError;
    }
    throw err;
  }
};

// ==========================================
// RESUME CRUD API METHODS
// ==========================================

export const getResumesApi = async () => {
  return await apiRequest("/resumes");
};

export const getResumeByIdApi = async (id) => {
  return await apiRequest(`/resumes/${id}`);
};

export const createResumeApi = async (resumeData) => {
  return await apiRequest("/resumes", {
    method: "POST",
    body: JSON.stringify(resumeData),
  });
};

export const updateResumeApi = async (id, resumeData) => {
  return await apiRequest(`/resumes/${id}`, {
    method: "PUT",
    body: JSON.stringify(resumeData),
  });
};

export const deleteResumeApi = async (id) => {
  return await apiRequest(`/resumes/${id}`, {
    method: "DELETE",
  });
};

// ==========================================
// GOOGLE GEMINI AI API METHODS
// ==========================================

export const improveSummaryApi = async ({ summary, jobTitle }) => {
  return await apiRequest("/ai/improve-summary", {
    method: "POST",
    body: JSON.stringify({ summary, jobTitle }),
  });
};

export const improveExperienceApi = async ({ role, company, description }) => {
  return await apiRequest("/ai/improve-experience", {
    method: "POST",
    body: JSON.stringify({ role, company, description }),
  });
};

export const improveProjectApi = async ({ title, techStack, description }) => {
  return await apiRequest("/ai/improve-project", {
    method: "POST",
    body: JSON.stringify({ title, techStack, description }),
  });
};

export const suggestSkillsApi = async ({ jobTitle, currentSkills }) => {
  return await apiRequest("/ai/suggest-skills", {
    method: "POST",
    body: JSON.stringify({ jobTitle, currentSkills }),
  });
};

export const generateContentApi = async ({ section, prompt }) => {
  return await apiRequest("/ai/generate-content", {
    method: "POST",
    body: JSON.stringify({ section, prompt }),
  });
};

export const checkHealthApi = async () => {
  return await apiRequest("/health");
};
