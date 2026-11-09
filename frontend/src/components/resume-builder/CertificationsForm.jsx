import React from "react";
import { Award, Plus, Trash2, Calendar, Globe, Hash, Building } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

export const CertificationsForm = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const certifications = resumeData.certifications || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" />
            Certifications & Licenses
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Showcase your industry certifications, official accreditations, and technical badges.
          </p>
        </div>

        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all hover:shadow active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No certifications added yet.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "Add Certification" above to feature your AWS, Meta, Google, or other certificates.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs relative transition-all hover:border-brand-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-600" />
                  Certification #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCertification(cert.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove this certification"
                  aria-label="Remove this certification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Certification Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Certification Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                    placeholder="e.g. Meta Certified Front-End Developer or AWS Solutions Architect"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                {/* Issuing Organization */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Issuing Organization <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      placeholder="e.g. Meta, Amazon Web Services, Google"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Issue Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Issue Date / Year
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(cert.id, "issueDate", e.target.value)}
                      placeholder="e.g. Aug 2024 or 2024"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Credential ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Credential ID (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Hash className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={cert.credentialId || ""}
                      onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                      placeholder="e.g. META-FED-884920"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                </div>

                {/* Credential URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Verification URL (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Globe className="w-4 h-4" />
                    </span>
                    <input
                      type="url"
                      value={cert.credentialUrl || ""}
                      onChange={(e) => updateCertification(cert.id, "credentialUrl", e.target.value)}
                      placeholder="e.g. https://coursera.org/verify/..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
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
