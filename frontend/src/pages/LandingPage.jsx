import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  FileCheck2,
  Zap,
  Layout,
  Shield,
  Layers,
  CheckCircle2,
  MousePointerClick,
  Download,
  Star,
  Users,
  Eye,
} from "lucide-react";

export const LandingPage = () => {
  const features = [
    {
      icon: Eye,
      title: "Real-Time Live Preview",
      desc: "Instant side-by-side visualization. Watch your resume update synchronously as you type every character.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: FileCheck2,
      title: "ATS-Compliant Architecture",
      desc: "Built according to strict Applicant Tracking System guidelines. Standard headers, clean fonts, and zero parsing errors.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Layers,
      title: "Dynamic Modular Sections",
      desc: "Easily add, reorder, or customize Personal Info, Work History, Education, Skills, and Technical Projects.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: Download,
      title: "One-Click PDF Export",
      desc: "Pixel-perfect print-ready formatting formatted specifically for standard A4 sheets with zero clunky margins.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Layout,
      title: "Curated Designer Templates",
      desc: "Switch between modern tech layouts and timeless classic formats with custom accent color customization.",
      color: "from-sky-500 to-cyan-600",
    },
    {
      icon: Zap,
      title: "AI Suggestions Ready",
      desc: "Engineered with modular hooks ready for Phase 2 Gemini AI bullet-point generation and smart keyword scoring.",
      color: "from-pink-500 to-rose-600",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Enter Your Credentials",
      desc: "Fill in your background using structured inputs for work history, skills, education, and portfolio links.",
    },
    {
      step: "02",
      title: "Customize & Live Preview",
      desc: "Select your preferred template style, pick brand accents, and preview your A4 resume in real time.",
    },
    {
      step: "03",
      title: "Download & Land Interviews",
      desc: "Export your clean ATS-friendly PDF instantly and start applying to top tech companies with confidence.",
    },
  ];

  return (
    <div className="space-y-24 py-8 sm:py-14">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-64 bg-gradient-to-tr from-brand-300/30 via-indigo-200/20 to-purple-200/30 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        {/* Phase 4 Launch Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-xs animate-pulse">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Phase 4 Complete • Full MERN & Gemini AI Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Craft ATS-Optimized Resumes with{" "}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Precision & Speed
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Build recruiter-approved, ATS-friendly resumes in minutes. Featuring live synchronous previews, dynamic section controls, and modern SaaS typography.
        </p>

        {/* Primary Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/create-resume"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 text-brand-200" />
            Build Your Resume Free
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow transition-all duration-200"
          >
            Explore Dashboard
          </Link>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            No sign-up required for preview
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            100% ATS Screener Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Instant One-Click PDF Print
          </span>
        </div>

        {/* Hero Product Mockup Preview */}
        <div className="mt-12 relative max-w-5xl mx-auto">
          <div className="rounded-3xl p-2 bg-gradient-to-b from-slate-200/80 via-slate-100 to-white shadow-2xl border border-slate-200/80">
            <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden p-4 sm:p-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="ml-2 text-xs font-semibold text-slate-600">
                    Live Split-Screen Studio • ResumAI
                  </span>
                </div>
                <Link
                  to="/create-resume"
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Open In Editor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mockup Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 space-y-3">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-50 text-brand-600 text-[11px] font-semibold">
                    <MousePointerClick className="w-3.5 h-3.5" /> Dynamic Form Fields
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Effortless Data Input with Instant Visual Feedback
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Edit personal details, company achievements, education, and technical skills with instant A4 layout re-rendering.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                      <span className="font-semibold text-slate-800">Sarvesh Yadav</span>
                      <p className="text-slate-500 text-[11px]">Full Stack MERN Developer • Mumbai</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                      <span className="font-semibold text-slate-800">TechPulse Digital Solutions</span>
                      <p className="text-slate-500 text-[11px]">Frontend Developer Intern • 2025 – Present</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
                  <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-md">
                    <div className="h-1 bg-brand-600 w-full mb-3 rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-extrabold text-sm uppercase text-slate-900">
                          Sarvesh Yadav
                        </h4>
                        <p className="text-[11px] font-semibold text-brand-600">
                          Full Stack MERN Developer
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-600 font-medium">
                        mumbai, india
                      </span>
                    </div>
                    <div className="h-0.5 bg-slate-100 w-full my-2"></div>
                    <div className="space-y-1.5 text-[10px] text-slate-600">
                      <p className="font-semibold text-slate-800 uppercase tracking-wider text-[9px]">
                        EXPERIENCE
                      </p>
                      <p className="text-slate-700 font-medium">
                        Frontend Developer Intern — TechPulse Digital Solutions
                      </p>
                      <p className="text-slate-500">
                        • Engineered scalable dashboard interfaces using React, Tailwind CSS, and Vite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
            Engineered for Success
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Build a Winning Resume
          </h3>
          <p className="text-sm text-slate-500 mt-3">
            Designed from the ground up for modern software engineers, developers, and tech professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-brand-300 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              Simple 3-Step Process
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              From Blank Slate to Interview Ready
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-brand-500/20 block mb-2">
                    {st.step}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-600">
                  Step {idx + 1} of 3
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-brand-100 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Ready to create your resume?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Supercharge your career with an ATS-optimized resume today.
            </h3>
            <p className="text-brand-100 text-xs sm:text-sm mt-3 leading-relaxed">
              Join students, graduates, and developers creating clean, professional resumes in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/create-resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-brand-600 font-bold text-sm hover:bg-brand-50 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-brand-600" />
                Launch Resume Builder
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/20 transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
