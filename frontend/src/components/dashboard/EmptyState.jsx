import React from "react";
import { Link } from "react-router-dom";
import { FilePlus, Sparkles } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center shadow-inner mb-4">
        <FilePlus className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No resumes found</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
        Start building your first professional, ATS-friendly resume with our modern builder.
      </p>
      <div className="mt-6">
        <Link
          to="/create-resume"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-brand-200" />
          Create First Resume
        </Link>
      </div>
    </div>
  );
};
