import React from "react";
import { GraduationCap, Plus, Trash2, Calendar, MapPin, Award } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

export const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            Education & Qualifications
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Add your degrees, certifications, college, or university history.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all hover:shadow active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No education entries added yet.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "Add Education" above to include your university or college degrees.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs relative transition-all hover:border-brand-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Degree / Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove this education entry"
                  aria-label="Remove this education entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Degree */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Degree Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="e.g. Master of Computer Applications (MCA)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                {/* Major / Field of study */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                    placeholder="e.g. Computer Science, Information Technology"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                {/* Institution */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Institution / University Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="e.g. University of Mumbai"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                      placeholder="e.g. Mumbai, India"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* GPA / Grade */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Grade / GPA / Percentage
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Award className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="e.g. 8.8 / 10 CGPA or 85%"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Start Year
                    </label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      End / Expected Year
                    </label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      placeholder="e.g. 2025"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
