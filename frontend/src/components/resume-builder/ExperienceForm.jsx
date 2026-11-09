import React, { useState } from "react";
import { Briefcase, Plus, Trash2, MapPin, Building, Sparkles } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { improveExperienceApi } from "../../services/api";
import { AISuggestionModal } from "../common/AISuggestionModal";

export const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  // AI Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [activeExpId, setActiveExpId] = useState(null);
  const [originalBullets, setOriginalBullets] = useState("");
  const [suggestedBullets, setSuggestedBullets] = useState("");

  const handleAIImproveBullets = async (exp) => {
    if (!exp.description || exp.description.trim().length < 5) {
      alert("Please enter a few bullet points or draft notes first so Gemini can polish them.");
      return;
    }

    setActiveExpId(exp.id);
    setOriginalBullets(exp.description);
    setSuggestedBullets("");
    setIsModalOpen(true);
    setAiLoading(true);
    setAiError(null);

    try {
      const response = await improveExperienceApi({
        role: exp.role,
        company: exp.company,
        description: exp.description,
      });

      if (response && response.data && response.data.improved) {
        setSuggestedBullets(response.data.improved);
      } else {
        throw new Error("No rewritten experience returned by Gemini AI.");
      }
    } catch (err) {
      setAiError(err.message || "Failed to polish experience bullets with Gemini AI.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-600" />
            Work Experience & Internships
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Highlight your relevant career history, internships, and key accomplishments.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all hover:shadow active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Position
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No work experience added yet.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "Add Position" above to add your internships or jobs.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs relative transition-all hover:border-brand-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Position #{index + 1}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAIImproveBullets(exp)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 transition-all hover:scale-102"
                    title="Polish bullet points with Google Gemini"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>✨ AI Polish Bullets</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove this position"
                    aria-label="Remove this position"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Role */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Job Title / Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                    placeholder="e.g. Frontend Developer Intern"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="e.g. Google or Tech Solutions"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      placeholder="e.g. Mumbai, India or Remote"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        placeholder="e.g. Jan 2024"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        placeholder={exp.current ? "Present" : "e.g. Dec 2024"}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => {
                        const isCurrent = e.target.checked;
                        updateExperience(exp.id, "current", isCurrent);
                        if (isCurrent) {
                          updateExperience(exp.id, "endDate", "Present");
                        }
                      }}
                      className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      I currently work in this role
                    </span>
                  </label>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Responsibilities & Key Achievements
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Use "• " bullets for clean parsing
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="• Developed new features using React and Tailwind CSS&#10;• Decreased build times by 25%&#10;• Collaborated with team of 5 engineers"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white leading-relaxed resize-y font-mono text-xs"
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Suggestion Comparison Modal */}
      <AISuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="AI Work Experience Enhancer"
        originalContent={originalBullets}
        suggestedContent={suggestedBullets}
        isLoading={aiLoading}
        error={aiError}
        onApply={(newText) => {
          if (activeExpId) {
            updateExperience(activeExpId, "description", newText);
          }
        }}
        onRetry={() => {
          const exp = experience.find((e) => e.id === activeExpId);
          if (exp) handleAIImproveBullets(exp);
        }}
      />
    </div>
  );
};
