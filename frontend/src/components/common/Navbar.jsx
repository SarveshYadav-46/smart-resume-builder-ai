import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Sparkles, LayoutDashboard, Menu, X, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors flex items-center gap-1.5">
                ResumAI
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Phase 4 • Ready
                </span>
              </span>
              <span className="text-[11px] text-slate-600 hidden sm:block">
                Smart Resume Builder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-brand-600 bg-brand-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-brand-600 bg-brand-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/create-resume"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/create-resume")
                  ? "text-brand-600 bg-brand-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              Resume Editor
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-600" />
              My Resumes
            </Link>

            <Link
              to="/create-resume"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-brand-200 animate-pulse" />
              Create Resume
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive("/")
                ? "bg-brand-50 text-brand-600 font-semibold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive("/dashboard")
                ? "bg-brand-50 text-brand-600 font-semibold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/create-resume"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive("/create-resume")
                ? "bg-brand-50 text-brand-600 font-semibold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Resume Editor
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/create-resume"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-brand-200" />
              Start Building Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
