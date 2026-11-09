import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Sparkles,
  AlertCircle,
  ArrowUpRight,
  Database,
  RefreshCw,
  Server,
} from "lucide-react";
import { useResume } from "../context/ResumeContext";
import { StatsOverview } from "../components/dashboard/StatsOverview";
import { ResumeCard } from "../components/dashboard/ResumeCard";
import { EmptyState } from "../components/dashboard/EmptyState";

export const DashboardPage = () => {
  const {
    dashboardResumes,
    deleteResumeFromBackend,
    fetchResumesFromBackend,
    isLoadingResumes,
    serverStatus,
  } = useResume();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredResumes = dashboardResumes.filter((resume) => {
    const matchesSearch =
      resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.targetRole.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && resume.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard & Resumes
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Database className="w-3 h-3 text-emerald-600" /> MongoDB Atlas Synced
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              <Sparkles className="w-3 h-3 text-purple-600" /> Gemini AI Powered
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your MongoDB-persisted resumes, optimize with Gemini AI, and export ATS-ready PDFs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchResumesFromBackend}
            disabled={isLoadingResumes}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-all"
            title="Refresh resumes from MongoDB Atlas"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingResumes ? "animate-spin text-brand-600" : ""}`} />
          </button>

          <Link
            to="/create-resume"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:scale-102 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </Link>
        </div>
      </div>

      {/* Backend & MongoDB Status Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-semibold text-slate-700">MERN Architecture:</span>
          <span className="text-slate-500">
            Node/Express API (Port 5000) • MongoDB Atlas Cluster • Google Gemini 1.5 Flash
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Total Saved: <strong className="text-slate-700">{dashboardResumes.length}</strong></span>
          <span>•</span>
          <span>Database: <strong className="text-emerald-600 font-semibold">Active</strong></span>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <StatsOverview resumesCount={dashboardResumes.length} />

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or target role..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 hidden lg:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {["all", "ready", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterStatus === status
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Resume Cards Grid */}
      {filteredResumes.length === 0 && searchQuery ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No matching resumes found</p>
          <p className="text-xs text-slate-500 mt-0.5">Try searching with a different term.</p>
        </div>
      ) : filteredResumes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Resume Action Card */}
          <Link
            to="/create-resume"
            className="group min-h-[320px] rounded-2xl border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50/60 hover:bg-brand-50/20 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-brand-600 group-hover:text-white text-brand-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
              Create New Resume
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              Start with sample data or a clean blank layout tailored for ATS bots.
            </p>
          </Link>

          {/* Existing Resumes from MongoDB Atlas */}
          {filteredResumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={deleteResumeFromBackend}
            />
          ))}
        </div>
      )}

      {/* ATS & AI Pro Tips Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50/40 to-brand-50/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-brand-700 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Google Gemini AI Smart Resume Tips
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            How Gemini AI supercharges your resume content
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Use the <strong>✨ Improve with Gemini AI</strong> buttons inside the editor to rewrite vague summaries, rephrase job bullet points into measurable accomplishments (Google XYZ formula), and uncover missing technical keywords for recruiter filters.
          </p>
        </div>

        <Link
          to="/create-resume"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:text-brand-600 hover:border-brand-300 shadow-sm transition-all"
        >
          Open AI Resume Studio
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
