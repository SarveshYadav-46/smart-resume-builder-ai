import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  RotateCcw,
  Trash2,
  Eye,
  Edit3,
  ChevronRight,
  ChevronLeft,
  Printer,
  Download,
  Sparkles,
  Save,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Database,
  Check,
} from "lucide-react";
import { useResume } from "../context/ResumeContext";
import { PersonalInfoForm } from "../components/resume-builder/PersonalInfoForm";
import { SummaryForm } from "../components/resume-builder/SummaryForm";
import { ExperienceForm } from "../components/resume-builder/ExperienceForm";
import { EducationForm } from "../components/resume-builder/EducationForm";
import { SkillsForm } from "../components/resume-builder/SkillsForm";
import { ProjectsForm } from "../components/resume-builder/ProjectsForm";
import { CertificationsForm } from "../components/resume-builder/CertificationsForm";
import { ResumeLivePreview } from "../components/resume-builder/ResumeLivePreview";
import { downloadResumePdf, printResumePdf, getResumeFilename } from "../utils/pdfExport";

export const CreateResumePage = () => {
  const {
    resetToSample,
    clearAll,
    resumeData,
    saveResumeToBackend,
    isSaving,
    currentResumeId,
  } = useResume();

  const [activeTab, setActiveTab] = useState("personal");
  const [mobileView, setMobileView] = useState("editor"); // 'editor' | 'preview'
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [saveNotification, setSaveNotification] = useState(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const candidateName = resumeData.personalInfo?.fullName || "Candidate";
  const expectedPdfName = getResumeFilename(candidateName);

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    setPdfDownloaded(false);
    try {
      await downloadResumePdf({ fullName: candidateName });
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3500);
    } catch (err) {
      console.error("PDF generation failed:", err);
      printResumePdf({ fullName: candidateName });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    printResumePdf({ fullName: candidateName });
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
  ];

  const currentSectionIndex = sections.findIndex((s) => s.id === activeTab);

  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveTab(sections[currentSectionIndex + 1].id);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveTab(sections[currentSectionIndex - 1].id);
    }
  };

  const handleSaveToDatabase = async () => {
    const result = await saveResumeToBackend();
    setSaveNotification(result);
    setTimeout(() => {
      setSaveNotification(null);
    }, 4500);
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Builder Sticky Sub-Navbar */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-16 z-30 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Back & Document Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                  {resumeData.personalInfo.fullName
                    ? `${resumeData.personalInfo.fullName}'s Resume`
                    : "Untitled Resume"}
                </h2>
                {currentResumeId && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Database className="w-3 h-3 text-emerald-600" /> Saved in Atlas
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Phase 4 Complete • Production Ready • MongoDB Atlas & Gemini AI
              </p>
            </div>
          </div>

          {/* Quick Actions (Save, Sample, Clear, Download PDF, Print) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Save to MongoDB Atlas Button */}
            <button
              onClick={handleSaveToDatabase}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
              title="Save to MongoDB Atlas Database"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSaving ? "Saving..." : currentResumeId ? "Update Resume" : "Save to Atlas"}</span>
            </button>

            <button
              onClick={resetToSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              title="Fill all sections with realistic sample data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Sample Data</span>
              <span className="sm:hidden">Sample</span>
            </button>

            {showClearConfirm ? (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl animate-fadeIn">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-[11px] font-semibold text-rose-700">Reset all?</span>
                <button
                  onClick={() => {
                    clearAll();
                    setShowClearConfirm(false);
                  }}
                  className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Clear all fields"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            {/* Direct Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm transition-all hover:scale-102 active:scale-98 disabled:opacity-60 ${
                pdfDownloaded
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-brand-600 hover:bg-brand-700 shadow-brand-500/20"
              }`}
              title={`Download A4 PDF as ${expectedPdfName}`}
            >
              {isExportingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : pdfDownloaded ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>
                {isExportingPdf
                  ? "Generating..."
                  : pdfDownloaded
                  ? "Downloaded!"
                  : "Download PDF"}
              </span>
            </button>

            {/* Browser Print Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 shadow-xs transition-all"
              title="Print via browser dialog"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Save Status Notification Banner */}
        {saveNotification && (
          <div
            className={`mt-2 p-2.5 rounded-xl text-xs font-medium flex items-center justify-between animate-fadeIn ${
              saveNotification.success
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {saveNotification.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              <span>{saveNotification.message}</span>
            </div>
            <button
              onClick={() => setSaveNotification(null)}
              className="text-slate-400 hover:text-slate-600 text-xs px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 flex items-center justify-center">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl w-full max-w-xs text-xs font-semibold">
            <button
              onClick={() => setMobileView("editor")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                mobileView === "editor"
                  ? "bg-white text-brand-600 shadow-xs"
                  : "text-slate-600"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor Form
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                mobileView === "preview"
                  ? "bg-white text-brand-600 shadow-xs"
                  : "text-slate-600"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Studio Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              mobileView === "preview" ? "hidden lg:block" : "block"
            }`}
          >
            {/* Horizontal Section Selector Tabs */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveTab(sec.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-brand-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {sec.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Section Form Box */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm">
              {renderActiveForm()}

              {/* Bottom Step Navigation */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentSectionIndex === 0}
                  onClick={handlePrevSection}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Section
                </button>

                <div className="text-xs text-slate-600 font-medium hidden sm:block">
                  Section {currentSectionIndex + 1} of {sections.length}
                </div>

                <button
                  type="button"
                  disabled={currentSectionIndex === sections.length - 1}
                  onClick={handleNextSection}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next Section
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Sticky A4 Preview */}
          <div
            className={`lg:col-span-6 lg:sticky lg:top-36 ${
              mobileView === "editor" ? "hidden lg:block" : "block"
            }`}
          >
            <ResumeLivePreview />
          </div>
        </div>
      </div>
    </div>
  );
};
