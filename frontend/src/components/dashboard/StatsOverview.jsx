import React from "react";
import { FileText, CheckCircle, Award, Sparkles } from "lucide-react";

export const StatsOverview = ({ resumesCount }) => {
  const stats = [
    {
      title: "Resumes Created",
      value: resumesCount,
      change: "+1 this week",
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-600",
    },
    {
      title: "Average ATS Score",
      value: "89%",
      change: "Optimized for Screeners",
      icon: Award,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Completed Resumes",
      value: `${resumesCount > 0 ? resumesCount : 0}`,
      change: "100% formatted",
      icon: CheckCircle,
      color: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50 text-violet-600",
    },
    {
      title: "AI Suggestions Ready",
      value: "Phase 2",
      change: "Integration-Ready Hook",
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {stat.title}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bgLight}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              {stat.change}
            </p>
          </div>
        );
      })}
    </div>
  );
};
