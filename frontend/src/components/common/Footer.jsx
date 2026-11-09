import React from "react";
import { Link } from "react-router-dom";
import { FileText, Heart, Github, Linkedin, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">
                ResumAI
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Phase 1 of the Smart Resume Builder application. Designed for speed, ATS compliance, and modern career presentation.
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-600 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-600 transition-colors">
                  Dashboard & Resumes
                </Link>
              </li>
              <li>
                <Link to="/create-resume" className="hover:text-brand-600 transition-colors">
                  Resume Editor & Live Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Live Real-time A4 Preview
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ATS-Friendly Structure
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Instant PDF Print Styling
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Dynamic Section Arrays
              </li>
            </ul>
          </div>

          {/* Phase 1 Badge */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-brand-700 font-semibold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              Phase 1 Milestone
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Frontend Architecture, Responsive UI/UX, Dynamic Forms, Sample Previews & Routing.
            </p>
            <div className="mt-2 text-[10px] text-brand-600 font-medium bg-brand-100/60 px-2 py-1 rounded inline-block">
              Tech Stack: React + Vite + Tailwind CSS
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
          <p>© {new Date().getFullYear()} ResumAI. Crafted with React & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            Built with modern MERN Stack standards <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
