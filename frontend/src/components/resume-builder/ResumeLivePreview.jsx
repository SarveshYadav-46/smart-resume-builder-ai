import React, { useState } from "react";
import { Printer, Layout, Palette, Download, Loader2, Check, AlertCircle } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { ModernTemplate } from "../templates/ModernTemplate";
import { MinimalTemplate } from "../templates/MinimalTemplate";
import { downloadResumePdf, printResumePdf, getResumeFilename } from "../../utils/pdfExport";

export const ResumeLivePreview = () => {
  const { resumeData, activeTemplate, setActiveTemplate, accentColor, setAccentColor } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const candidateName = resumeData.personalInfo?.fullName || "Candidate";
  const expectedFilename = getResumeFilename(candidateName);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setDownloadSuccess(false);
    setErrorMessage("");

    try {
      await downloadResumePdf({ fullName: candidateName });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (error) {
      console.error("PDF export error:", error);
      setErrorMessage(
        error.message || "Failed to generate PDF. You can also use the Print button to Save as PDF."
      );
      setTimeout(() => setErrorMessage(""), 8000);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    printResumePdf({ fullName: candidateName });
  };

  const colors = [
    { id: "indigo", name: "Indigo", bg: "bg-indigo-600", border: "border-indigo-600" },
    { id: "emerald", name: "Emerald", bg: "bg-emerald-600", border: "border-emerald-600" },
    { id: "sky", name: "Sky", bg: "bg-sky-600", border: "border-sky-600" },
    { id: "slate", name: "Slate", bg: "bg-slate-800", border: "border-slate-800" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Error alert banner if PDF generation fails */}
      {errorMessage && (
        <div className="no-print mb-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage("")}
            className="text-rose-500 hover:text-rose-700 font-bold ml-2 text-sm px-1.5 py-0.5 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* Preview Action Toolbar */}
      <div className="no-print bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline-flex items-center gap-1">
            <Layout className="w-3.5 h-3.5 text-brand-600" />
            Template:
          </span>
          <div className="flex rounded-xl p-1 bg-slate-100 border border-slate-200/80 text-xs font-medium">
            <button
              onClick={() => setActiveTemplate("modern")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTemplate === "modern"
                  ? "bg-white text-brand-600 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Modern Clean
            </button>
            <button
              onClick={() => setActiveTemplate("classic")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTemplate === "classic"
                  ? "bg-white text-brand-600 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Classic ATS
            </button>
          </div>
        </div>

        {/* Accent Colors (Indigo, Emerald, Sky, Slate) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden md:inline-flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            Accent:
          </span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setAccentColor(c.id)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium transition-all ${
                  accentColor === c.id
                    ? "bg-white shadow-xs font-semibold text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title={c.name}
              >
                <span className={`w-3 h-3 rounded-full ${c.bg}`}></span>
                <span className="text-[11px] capitalize">{c.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls: PDF Download & Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm transition-all hover:shadow active:scale-95 disabled:opacity-60 ${
              downloadSuccess
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-brand-600 hover:bg-brand-700"
            }`}
            title={`Download A4 PDF as ${expectedFilename}`}
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : downloadSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>
              {isExporting
                ? "Generating PDF..."
                : downloadSuccess
                ? "Downloaded!"
                : "Download PDF"}
            </span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 shadow-xs transition-all active:scale-95"
            title="Open browser print dialog"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Live Preview Paper Container */}
      <div className="flex-1 bg-slate-100/80 p-3 sm:p-6 rounded-2xl border border-slate-200/80 overflow-y-auto flex justify-center items-start">
        <div
          id="resume-preview-container"
          className="w-full max-w-[800px] shadow-xl rounded-lg overflow-hidden transition-all bg-white border border-slate-200"
        >
          {activeTemplate === "modern" ? (
            <ModernTemplate data={resumeData} accentColor={accentColor} />
          ) : (
            <MinimalTemplate data={resumeData} accentColor={accentColor} />
          )}
        </div>
      </div>
    </div>
  );
};
