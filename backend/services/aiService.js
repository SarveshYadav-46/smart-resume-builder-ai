import dns from "dns";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure IPv4 resolution and Google Public DNS are configured for external Google AI APIs
try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Ignore if already set in runtime
}

/**
 * Clean up text returned by Gemini (strip redundant markdown headers or backticks if any)
 */
const cleanAIResponse = (text) => {
  if (!text) return "";
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
};

/**
 * Standardized error handler for Gemini API exceptions with explicit handling
 * for HTTP 400, 401, 404, 429, and 503 status codes.
 */
const handleGeminiError = (error, requestedModel = "gemini-3.8-flash") => {
  console.error("Gemini API Error:", error.message || error);

  const status = error.status || error.statusCode;

  // 429 - Rate limit / Quota exceeded
  if (status === 429 || error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("quota")) {
    const err = new Error("Gemini AI rate limit exceeded. Please wait a few seconds and try again.");
    err.statusCode = 429;
    throw err;
  }

  // 503 - High demand / temporary spike
  if (status === 503 || error.message?.includes("Service Unavailable") || error.message?.includes("high demand")) {
    const err = new Error("Gemini AI is currently experiencing high demand. Spikes in demand are temporary; please retry in a few moments.");
    err.statusCode = 503;
    throw err;
  }

  // 404 - Model not found / deprecated
  if (status === 404 || error.message?.includes("not found") || error.message?.includes("is no longer available")) {
    const err = new Error(
      `The requested Gemini model (${requestedModel}) is not found or no longer available. Please ensure gemini-3.8-flash is configured.`
    );
    err.statusCode = 404;
    throw err;
  }

  // 400 / 401 - Authentication or bad request
  if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("API key not valid")) {
    const err = new Error("Invalid or inactive Google Gemini API Key. Please verify GEMINI_API_KEY in backend/.env.");
    err.statusCode = 401;
    throw err;
  }

  if (status === 400) {
    const err = new Error(error.message || "Bad request to Gemini API. Please check your prompt input.");
    err.statusCode = 400;
    throw err;
  }

  // Generic 500 fallback
  const err = new Error(error.message || "Failed to communicate with Google Gemini AI.");
  err.statusCode = status || 500;
  throw err;
};

/**
 * Core text generation helper using Google Generative AI
 * Defaults to gemini-3.8-flash with fallback cascade to handle 503 demand spikes.
 */
export const generateWithGemini = async (prompt, customModelName) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    const error = new Error(
      "GEMINI_API_KEY is not configured in backend/.env. Please provide a valid Google Gemini API Key."
    );
    error.statusCode = 400;
    throw error;
  }

  const primaryModel = customModelName || process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const genAI = new GoogleGenerativeAI(apiKey);

  // Models to attempt: primary model first, followed by fallbacks for transient 503/429
  const modelsToAttempt = [primaryModel];
  if (primaryModel === "gemini-3.8-flash") {
    modelsToAttempt.push("gemini-3.6-flash", "gemini-3.5-flash", "gemini-3-flash-preview");
  }

  let lastError = null;

  for (let i = 0; i < modelsToAttempt.length; i++) {
    const currentModelName = modelsToAttempt[i];
    try {
      const model = genAI.getGenerativeModel(
        { model: currentModelName },
        { timeout: 12000 }
      );
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return cleanAIResponse(response.text());
    } catch (err) {
      lastError = err;
      const status = err.status || err.statusCode;

      // If transient 503 or 429, try the next model
      if ((status === 503 || status === 429 || err.name === "AbortError" || err.message?.includes("aborted")) && i < modelsToAttempt.length - 1) {
        console.warn(`⚠️ Model "${currentModelName}" returned ${status || "timeout"}. Attempting fallback to "${modelsToAttempt[i + 1]}"...`);
        continue;
      }

      // For fatal errors (400, 401, 404), break immediately
      break;
    }
  }

  handleGeminiError(lastError, primaryModel);
};

/**
 * Improve professional summary with ATS-focused phrasing and action verbs
 */
export const improveSummaryService = async ({ summary, jobTitle }) => {
  if (!summary || summary.trim().length < 5) {
    const err = new Error("Please provide a summary of at least 5 characters to improve.");
    err.statusCode = 400;
    throw err;
  }

  const prompt = `You are an expert tech recruiter and ATS resume optimization specialist.
Improve the following professional summary for a candidate targeting the role: "${jobTitle || "Software Engineer"}".

Rules:
1. Make it professional, concise, and impactful (between 40 and 75 words).
2. Highlight technical strengths, problem solving, and career value proposition.
3. Use active voice and avoid first-person pronouns (I, me, my) where possible.
4. Output ONLY the improved summary text directly without conversational prefixes or quotes.

Original Summary:
"${summary}"`;

  const improved = await generateWithGemini(prompt);

  return {
    original: summary,
    improved,
    targetRole: jobTitle || "Software Engineer",
  };
};

/**
 * Rewrite work experience descriptions into high-impact Google XYZ bullet points
 */
export const improveExperienceService = async ({ role, company, description }) => {
  if (!description || description.trim().length < 5) {
    const err = new Error("Please provide an experience description of at least 5 characters to improve.");
    err.statusCode = 400;
    throw err;
  }

  const prompt = `You are a FAANG executive resume writer.
Rewrite the following work experience bullet points for the position "${role || "Developer"}" at "${company || "Company"}".

Rules:
1. Convert each point to use the high-impact format: "Accomplished [X] as measured by [Y] by doing [Z]".
2. Begin every bullet with a strong action verb (Engineered, Architected, Accelerated, Reduced, Deployed, Streamlined).
3. Where exact metrics are missing, provide realistic placeholders or professional impact framing (e.g. improved performance, optimized response times).
4. Output ONLY the revised bullet points, each starting with "• ". Do not wrap in markdown quotes.

Original Experience Points:
"${description}"`;

  const improved = await generateWithGemini(prompt);

  return {
    original: description,
    improved,
    role: role || "Developer",
    company: company || "Company",
  };
};

/**
 * Improve project descriptions highlighting technical challenges and achievements
 */
export const improveProjectService = async ({ title, techStack, description }) => {
  if (!description || description.trim().length < 5) {
    const err = new Error("Please provide a project description of at least 5 characters to enhance.");
    err.statusCode = 400;
    throw err;
  }

  const prompt = `You are a senior tech lead reviewing a candidate's portfolio.
Improve the description of the technical project "${title || "Project"}" built with "${techStack || "Modern Tech Stack"}".

Rules:
1. Emphasize architectural decisions, key engineering challenges solved, and tangible project outcomes.
2. Format as 2-3 concise, bulleted points starting with "• ".
3. Highlight technologies from the tech stack naturally.
4. Output ONLY the improved bullet points directly.

Original Description:
"${description}"`;

  const improved = await generateWithGemini(prompt);

  return {
    original: description,
    improved,
    title: title || "Project",
  };
};

/**
 * Suggest high-demand technical skills for a specific target job title
 */
export const suggestSkillsService = async ({ jobTitle, currentSkills = [] }) => {
  const existingList = Array.isArray(currentSkills) ? currentSkills.join(", ") : currentSkills;

  const prompt = `You are a technical career advisor.
For a candidate targeting the role: "${jobTitle || "Full Stack Developer"}", suggest 12-16 current in-demand technical skills that tech companies and ATS filters look for.

The candidate already lists: [${existingList}]. Suggest complementary, high-value skills they might be missing.

Respond in strict JSON format:
{
  "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5", "Skill6", "Skill7", "Skill8"]
}
Output valid JSON only with no extra commentary.`;

  const cleaned = await generateWithGemini(prompt);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback regex extract if model added text
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        parsed = { skills: JSON.parse(match[0]) };
      } catch {
        parsed = { skills: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Git", "REST APIs"] };
      }
    } else {
      parsed = {
        skills: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Git", "REST APIs"],
      };
    }
  }

  return {
    targetRole: jobTitle || "Full Stack Developer",
    suggestedSkills: parsed.skills || [],
  };
};

/**
 * General purpose content generator for custom resume queries
 */
export const generateContentService = async ({ section, prompt }) => {
  if (!prompt || prompt.trim().length < 3) {
    const err = new Error("Please provide a prompt for content generation.");
    err.statusCode = 400;
    throw err;
  }

  const fullPrompt = `You are an expert resume writer. Generate polished, ATS-ready resume content for the section: "${section || "General"}".
Request: "${prompt}"

Rules:
1. Provide concise, professional, ready-to-use resume phrasing.
2. Avoid conversational chatter; output only the resume text.`;

  const generatedContent = await generateWithGemini(fullPrompt);

  return {
    generatedContent,
  };
};
