import {
  improveSummaryService,
  improveExperienceService,
  improveProjectService,
  suggestSkillsService,
  generateContentService,
} from "../services/aiService.js";

/**
 * @desc    Improve professional summary via Gemini
 * @route   POST /api/ai/improve-summary
 */
export const handleImproveSummary = async (req, res, next) => {
  try {
    const { summary, jobTitle } = req.body;
    const result = await improveSummaryService({ summary, jobTitle });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Improve experience bullet points via Gemini
 * @route   POST /api/ai/improve-experience
 */
export const handleImproveExperience = async (req, res, next) => {
  try {
    const { role, company, description } = req.body;
    const result = await improveExperienceService({ role, company, description });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Improve project descriptions via Gemini
 * @route   POST /api/ai/improve-project
 */
export const handleImproveProject = async (req, res, next) => {
  try {
    const { title, techStack, description } = req.body;
    const result = await improveProjectService({ title, techStack, description });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Suggest relevant in-demand skills via Gemini
 * @route   POST /api/ai/suggest-skills
 */
export const handleSuggestSkills = async (req, res, next) => {
  try {
    const { jobTitle, currentSkills } = req.body;
    const result = await suggestSkillsService({ jobTitle, currentSkills });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate general resume content via Gemini
 * @route   POST /api/ai/generate-content
 */
export const handleGenerateContent = async (req, res, next) => {
  try {
    const { section, prompt } = req.body;
    const result = await generateContentService({ section, prompt });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
