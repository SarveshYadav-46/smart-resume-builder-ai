import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit3, Copy, Trash2, Clock, Sparkles, Database } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

export const ResumeCard = ({ resume, onDuplicate, onDelete }) => {
  const navigate = useNavigate();
  const { loadResumeFromBackend } = useResume();

  const handleEditClick = async () => {
    await loadResumeFromBackend(resume.id);
    navigate("/create-resume");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Draft":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Mini Visual Preview Header */}
      <div className="relative h-44 bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/40 p-4 border-b border-slate-100 flex flex-col justify-between overflow-hidden">
        {/* Decorative Mini Resume Sheet */}
        <div className="absolute inset-x-8 top-4 bottom-0 bg-white rounded-t-lg shadow-sm border border-slate-200/70 p-3 flex flex-col space-y-2 group-hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-[10px] font-bold">
              {resume.title.charAt(0)}
            </div>
            <div className="space-y-1 flex-1">
              <div className="h-2 bg-slate-300 rounded w-20"></div>
              <div className="h-1.5 bg-slate-200 rounded w-14"></div>
            </div>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-1 bg-slate-100 rounded w-full"></div>
            <div className="h-1 bg-slate-100 rounded w-5/6"></div>
            <div className="h-1 bg-slate-100 rounded w-4/6"></div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
            <span>Template: {resume.template}</span>
            <span className="font-medium text-brand-600">ATS {resume.atsScore}%</span>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-xs ${getStatusBadge(
              resume.status
            )}`}
          >
            {resume.status}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-slate-600 border border-slate-200 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-500" />
            ATS {resume.atsScore}%
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors line-clamp-1">
                {resume.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{resume.targetRole}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium text-slate-600">Completion</span>
              <span className="font-semibold text-slate-900">{resume.completion}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${resume.completion}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated {resume.lastModified}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={handleEditClick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 hover:text-brand-700 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Resume
          </button>

          {onDuplicate && (
            <button
              onClick={() => onDuplicate(resume.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Duplicate Resume"
              aria-label="Duplicate Resume"
            >
              <Copy className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onDelete(resume.id)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Resume"
            aria-label="Delete Resume"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
