import React, { useState } from "react";
import { Wrench, Plus, X, FolderPlus, Trash2, Sparkles, Loader2, Check } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { suggestSkillsApi } from "../../services/api";

export const SkillsForm = () => {
  const { resumeData, addSkillToCategory, removeSkillFromCategory, addSkillCategory, removeSkillCategory } = useResume();
  const { skills, personalInfo } = resumeData;
  const jobTitle = personalInfo?.jobTitle || "Full Stack Developer";

  const [inputSkills, setInputSkills] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  // AI Suggestion State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiError, setAiError] = useState(null);
  const [addedSkillsMap, setAddedSkillsMap] = useState({});

  const handleSkillInputChange = (catIndex, value) => {
    setInputSkills((prev) => ({ ...prev, [catIndex]: value }));
  };

  const handleAddSkill = (catIndex) => {
    const skillValue = inputSkills[catIndex];
    if (skillValue && skillValue.trim()) {
      addSkillToCategory(catIndex, skillValue.trim());
      setInputSkills((prev) => ({ ...prev, [catIndex]: "" }));
    }
  };

  const handleKeyDown = (e, catIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(catIndex);
    }
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addSkillCategory(newCategoryName);
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  // Trigger Gemini AI skill recommendation
  const handleFetchAISuggestions = async () => {
    setIsAiLoading(true);
    setAiError(null);

    const flatCurrentSkills = skills.flatMap((c) => c.items);

    try {
      const response = await suggestSkillsApi({
        jobTitle,
        currentSkills: flatCurrentSkills,
      });

      if (response && response.data && response.data.suggestedSkills) {
        setAiSuggestions(response.data.suggestedSkills);
      } else {
        throw new Error("No skills suggestions received from Gemini.");
      }
    } catch (err) {
      setAiError(err.message || "Failed to suggest skills with Gemini AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddSuggestedSkill = (skill, catIndex = 0) => {
    addSkillToCategory(catIndex, skill);
    setAddedSkillsMap((prev) => ({ ...prev, [skill]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-600" />
            Technical & Soft Skills
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Organize your key technologies, frameworks, databases, and core proficiencies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* AI Suggest Skills Button */}
          <button
            type="button"
            disabled={isAiLoading}
            onClick={handleFetchAISuggestions}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-sm transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
          >
            {isAiLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-brand-200 animate-pulse" />
            )}
            ✨ AI Suggest Skills
          </button>

          <button
            type="button"
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            {showAddCategory ? "Close Form" : "New Category"}
          </button>
        </div>
      </div>

      {/* AI Suggestions Dynamic Results Box */}
      {aiSuggestions.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-white p-5 rounded-3xl border-2 border-purple-200 shadow-xs animate-fadeIn space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Gemini AI In-Demand Recommendations for: <span className="text-brand-600 underline">{jobTitle}</span>
            </div>
            <button
              onClick={() => setAiSuggestions([])}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Dismiss
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Click any skill tag below to instantly add it to your <strong>{skills[0]?.category || "First"}</strong> category:
          </p>

          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((skill) => {
              const isAdded = addedSkillsMap[skill];
              return (
                <button
                  key={skill}
                  type="button"
                  disabled={isAdded}
                  onClick={() => handleAddSuggestedSkill(skill, 0)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isAdded
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                      : "bg-white border border-purple-200 text-purple-950 hover:border-purple-400 hover:bg-purple-50 shadow-xs hover:scale-105"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> {skill} (Added)
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-purple-600" /> {skill}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {aiError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          {aiError}
        </div>
      )}

      {/* New Category Box */}
      {showAddCategory && (
        <form
          onSubmit={handleCreateCategory}
          className="bg-brand-50/50 p-4 rounded-2xl border border-brand-200/70 flex flex-col sm:flex-row items-center gap-3 animate-fadeIn"
        >
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name (e.g. Cloud Platforms, Testing)"
            className="w-full sm:flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
          >
            Create Category
          </button>
        </form>
      )}

      {/* Skill Categories */}
      <div className="space-y-5">
        {skills.map((category, catIndex) => (
          <div
            key={catIndex}
            className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs transition-all hover:border-brand-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {category.category}
              </span>
              {skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkillCategory(catIndex)}
                  className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors text-xs flex items-center gap-1"
                  title="Remove Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Delete Category</span>
                </button>
              )}
            </div>

            {/* Input field to add skill */}
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={inputSkills[catIndex] || ""}
                onChange={(e) => handleSkillInputChange(catIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, catIndex)}
                placeholder={`Add skill in ${category.category} (press Enter)`}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(catIndex)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2">
              {category.items.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No skills added in this group yet.</p>
              ) : (
                category.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/60 hover:bg-slate-200/60 transition-colors group"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkillFromCategory(catIndex, skillIndex)}
                      className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
