import React, { useState } from "react";
import { FolderGit2, Plus, Trash2, Globe, Github, Code2, Sparkles } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { improveProjectApi } from "../../services/api";
import { AISuggestionModal } from "../common/AISuggestionModal";

export const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  // AI Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [activeProjId, setActiveProjId] = useState(null);
  const [originalDesc, setOriginalDesc] = useState("");
  const [suggestedDesc, setSuggestedDesc] = useState("");

  const handleAIImproveProject = async (proj) => {
    if (!proj.description || proj.description.trim().length < 5) {
      alert("Please provide a basic project overview or draft notes first so Gemini can optimize it.");
      return;
    }

    setActiveProjId(proj.id);
    setOriginalDesc(proj.description);
    setSuggestedDesc("");
    setIsModalOpen(true);
    setAiLoading(true);
    setAiError(null);

    try {
      const response = await improveProjectApi({
        title: proj.title,
        techStack: proj.techStack,
        description: proj.description,
      });

      if (response && response.data && response.data.improved) {
        setSuggestedDesc(response.data.improved);
      } else {
        throw new Error("No suggestion returned by Gemini AI.");
      }
    } catch (err) {
      setAiError(err.message || "Failed to enhance project description with Gemini AI.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-brand-600" />
            Key Projects
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Showcase your best technical projects, personal builds, and open-source contributions.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all hover:shadow active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No projects added yet.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "Add Project" above to highlight your best applications and repositories.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs relative transition-all hover:border-brand-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Project #{index + 1}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAIImproveProject(proj)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 transition-all hover:scale-102"
                    title="Optimize project description with Google Gemini"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>✨ AI Enhance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove this project"
                    aria-label="Remove this project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                    placeholder="e.g. Smart Resume Builder"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Tech Stack Used <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Code2 className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={proj.techStack}
                      onChange={(e) => updateProject(proj.id, "techStack", e.target.value)}
                      placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind CSS"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Live URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Live Demo Link
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Globe className="w-4 h-4" />
                    </span>
                    <input
                      type="url"
                      value={proj.liveLink}
                      onChange={(e) => updateProject(proj.id, "liveLink", e.target.value)}
                      placeholder="e.g. https://myproject.dev"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    GitHub Repository Link
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Github className="w-4 h-4" />
                    </span>
                    <input
                      type="url"
                      value={proj.githubLink}
                      onChange={(e) => updateProject(proj.id, "githubLink", e.target.value)}
                      placeholder="e.g. https://github.com/username/project"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Overview & Highlights
                  </label>
                  <textarea
                    rows={4}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                    placeholder="• Built a full-stack platform featuring responsive UI and real-time state management.&#10;• Implemented secure JWT user auth and RESTful endpoints.&#10;• Deployed on Vercel with automated CI/CD pipeline."
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
        title="AI Project Highlights Enhancer"
        originalContent={originalDesc}
        suggestedContent={suggestedDesc}
        isLoading={aiLoading}
        error={aiError}
        onApply={(newText) => {
          if (activeProjId) {
            updateProject(activeProjId, "description", newText);
          }
        }}
        onRetry={() => {
          const p = projects.find((item) => item.id === activeProjId);
          if (p) handleAIImproveProject(p);
        }}
      />
    </div>
  );
};
