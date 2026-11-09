import React, { useState } from "react";
import { FileText, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { improveSummaryApi } from "../../services/api";
import { AISuggestionModal } from "../common/AISuggestionModal";

export const SummaryForm = () => {
  const { resumeData, updateSummary } = useResume();
  const summary = resumeData.personalInfo.summary || "";
  const jobTitle = resumeData.personalInfo.jobTitle || "Full Stack Developer";

  // AI Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [suggestedSummary, setSuggestedSummary] = useState("");

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const charCount = summary.length;

  const handleAIImprove = async () => {
    if (!summary.trim()) {
      alert("Please write a draft or select a starter template below first before improving with AI.");
      return;
    }

    setIsModalOpen(true);
    setAiLoading(true);
    setAiError(null);
    setSuggestedSummary("");

    try {
      const response = await improveSummaryApi({
        summary,
        jobTitle,
      });

      if (response && response.data && response.data.improved) {
        setSuggestedSummary(response.data.improved);
      } else {
        throw new Error("No suggestion returned from Gemini AI.");
      }
    } catch (err) {
      setAiError(err.message || "Failed to generate AI suggestion. Check backend server and GEMINI_API_KEY.");
    } finally {
      setAiLoading(false);
    }
  };

  const starterTemplates = [
    {
      title: "MERN Stack Developer",
      text: "Passionate Full Stack MERN Developer with hands-on experience designing and deploying scalable web applications using React.js, Node.js, Express, and MongoDB. Strong focus on clean code, RESTful API architecture, and delivering high-performance, user-centric experiences.",
    },
    {
      title: "MCA / CS Graduate",
      text: "Ambitious and detail-oriented Computer Science graduate with strong foundations in data structures, algorithms, and modern full-stack web technologies. Proven problem solver eager to contribute to collaborative engineering teams and build high-impact software solutions.",
    },
    {
      title: "Frontend Specialist",
      text: "Creative Frontend Developer skilled in React.js, Tailwind CSS, and TypeScript. Experienced in translating complex design mockups into responsive, accessible, and pixel-perfect web interfaces with modern state management.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            Professional Summary
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            A concise 3-4 sentence elevator pitch summarizing your core tech strengths, career highlights, and target role.
          </p>
        </div>

        {/* AI Action Button */}
        <button
          type="button"
          onClick={handleAIImprove}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-md shadow-brand-500/20 hover:shadow-brand-500/30 hover:scale-102 active:scale-98 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-200 animate-pulse" />
          ✨ Improve with Gemini AI
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-slate-700">
            Summary Statement <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} characters</span>
          </div>
        </div>

        <textarea
          rows={6}
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write your professional summary here or choose from the starter templates below..."
          className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white leading-relaxed resize-y"
        ></textarea>
      </div>

      {/* Starter Templates */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2.5">
          <Sparkles className="w-4 h-4 text-brand-600" />
          Need inspiration? Click a starter template to apply:
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {starterTemplates.map((item, idx) => (
            <div
              key={idx}
              onClick={() => updateSummary(item.text)}
              className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/20 cursor-pointer transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600">
                  {item.title}
                </span>
                <span className="text-[11px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Use this template →
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ATS Best Practice Tips */}
      <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-brand-50/50 p-3.5 rounded-xl border border-brand-100">
        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Recruiter Tip:</strong> Aim for 40–80 words. Include your primary job title, key technical skills (e.g. React, Node.js), and a measurable achievement or clear career goal.
        </p>
      </div>

      {/* AI Suggestion Comparison Modal */}
      <AISuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="AI Professional Summary Optimizer"
        originalContent={summary}
        suggestedContent={suggestedSummary}
        isLoading={aiLoading}
        error={aiError}
        onApply={(newText) => updateSummary(newText)}
        onRetry={handleAIImprove}
      />
    </div>
  );
};
