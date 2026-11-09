import React from "react";
import { User, Briefcase, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

export const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo(name, value);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-brand-600" />
          Personal & Contact Information
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Provide your legal name, target job role, contact info, and profile links.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleChange}
              placeholder="e.g. Sarvesh Yadav"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Target Job Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Briefcase className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Full Stack MERN Developer"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="e.g. sarvesh.yadav@example.com"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Location (City, Country)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              placeholder="e.g. Mumbai, Maharashtra, India"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* Portfolio / Website */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Portfolio Website
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </span>
            <input
              type="url"
              name="portfolio"
              value={personalInfo.portfolio}
              onChange={handleChange}
              placeholder="e.g. https://sarvesh.dev"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            LinkedIn Profile
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Linkedin className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleChange}
              placeholder="e.g. linkedin.com/in/sarveshyadav"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>

        {/* GitHub */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            GitHub Profile
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Github className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="github"
              value={personalInfo.github}
              onChange={handleChange}
              placeholder="e.g. github.com/sarveshyadav"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
