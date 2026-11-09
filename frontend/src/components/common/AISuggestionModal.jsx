import React from "react";
import { Sparkles, Check, X, Loader2, AlertCircle, ArrowRight } from "lucide-react";

export const AISuggestionModal = ({
  isOpen,
  onClose,
  title = "AI Optimization Suggestion",
  originalContent,
  suggestedContent,
  isLoading,
  error,
  onApply,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-100 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {title}
              </h3>
              <p className="text-[11px] text-brand-100">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Analyzing with Google Gemini...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Optimizing phrasing, quantifying achievements, and enhancing ATS keyword density.
              </p>
            </div>
          ) : error ? (
            <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-left space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Gemini AI Assistance Error
              </div>
              <p className="text-xs text-rose-600 leading-relaxed">
                {error}
              </p>
              {error.includes("GEMINI_API_KEY") && (
                <div className="mt-2 text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-rose-200 font-mono">
                  👉 Add your key in <code>backend/.env</code>:<br />
                  <span className="text-brand-600">GEMINI_API_KEY=AIzaSy...</span>
                </div>
              )}
              {onRetry && (
                <div className="pt-2">
                  <button
                    onClick={onRetry}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Original Content Box */}
              {originalContent && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    <span>Original Version</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                    {originalContent}
                  </p>
                </div>
              )}

              {/* Improved AI Version Box */}
              <div className="bg-gradient-to-br from-brand-50/70 via-indigo-50/40 to-white rounded-2xl p-5 border-2 border-brand-300 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-brand-700 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    AI-Optimized Suggestion
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-100 text-brand-800 font-semibold">
                    ATS Enhanced
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-900 leading-relaxed whitespace-pre-line font-medium bg-white/80 p-3.5 rounded-xl border border-brand-100">
                  {suggestedContent}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isLoading && !error && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            >
              Keep Original (Reject)
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(suggestedContent);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-500/25 transition-all hover:scale-102 active:scale-98"
            >
              <Check className="w-4 h-4" />
              Accept & Apply Suggestion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
