import React from "react";
import { ExternalLink } from "lucide-react";

export const MinimalTemplate = ({ data, accentColor = "indigo" }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const colorMap = {
    indigo: {
      text: "text-indigo-900",
      border: "border-indigo-600",
      accent: "text-indigo-700",
    },
    emerald: {
      text: "text-emerald-900",
      border: "border-emerald-700",
      accent: "text-emerald-800",
    },
    sky: {
      text: "text-sky-900",
      border: "border-sky-600",
      accent: "text-sky-700",
    },
    slate: {
      text: "text-slate-900",
      border: "border-slate-800",
      accent: "text-slate-800",
    },
  };

  const theme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      id="resume-document"
      className="resume-sheet bg-white w-full text-slate-900 p-8 sm:p-10 font-sans shadow-sm print:p-0 print:shadow-none min-h-[297mm] box-border"
    >
      {/* Centered ATS Minimalist Header */}
      <header className={`text-center border-b-2 ${theme.border} pb-4 mb-5 break-inside-avoid`}>
        <h1 className="text-2xl font-bold tracking-tight uppercase text-slate-900">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className={`text-xs font-semibold uppercase tracking-wider ${theme.accent} mt-1`}>
          {personalInfo.jobTitle || "Your Target Job Title"}
        </p>

        {/* Contact Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span>
              •{" "}
              <a
                href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-slate-900"
              >
                LinkedIn
              </a>
            </span>
          )}
          {personalInfo.github && (
            <span>
              •{" "}
              <a
                href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-slate-900"
              >
                GitHub
              </a>
            </span>
          )}
          {personalInfo.portfolio && (
            <span>
              •{" "}
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
                Portfolio
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-4 text-xs">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="break-inside-avoid">
            <h2 className={`font-bold uppercase tracking-wider text-xs border-b border-slate-300 pb-0.5 mb-1.5 ${theme.text}`}>
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className={`font-bold uppercase tracking-wider text-xs border-b border-slate-300 pb-0.5 mb-2 ${theme.text}`}>
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-600 text-[11px]">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700 text-xs italic mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-600">
                      {exp.description
                        .split("\n")
                        .filter((l) => l.trim().length > 0)
                        .map((b, i) => (
                          <li key={i}>{b.replace(/^[•\-\*]\s*/, "")}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className={`font-bold uppercase tracking-wider text-xs border-b border-slate-300 pb-0.5 mb-2 ${theme.text}`}>
              Technical Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-900">
                      {proj.title}
                      {proj.techStack && (
                        <span className="font-normal text-slate-600 italic ml-2">
                          | {proj.techStack}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] space-x-2 text-slate-500">
                      {proj.liveLink && (
                        <a href={proj.liveLink} target="_blank" rel="noreferrer" className="underline">
                          Demo
                        </a>
                      )}
                      {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="underline">
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-600 mt-1">
                      {proj.description
                        .split("\n")
                        .filter((l) => l.trim().length > 0)
                        .map((b, i) => (
                          <li key={i}>{b.replace(/^[•\-\*]\s*/, "")}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className={`font-bold uppercase tracking-wider text-xs border-b border-slate-300 pb-0.5 mb-1.5 ${theme.text}`}>
              Technical Proficiencies
            </h2>
            <div className="space-y-1">
              {skills.map((cat, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-semibold text-slate-800">{cat.category}: </span>
                  <span className="text-slate-600">{cat.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className={`font-bold uppercase tracking-wider text-xs border-b border-slate-300 pb-0.5 mb-1.5 ${theme.text}`}>
              Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <div>
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    <span className="text-slate-600 italic ml-1">— {cert.issuer}</span>
                    {cert.credentialId && (
                      <span className="text-slate-400 text-[10px] ml-1.5">(ID: {cert.credentialId})</span>
                    )}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {cert.issueDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className={`font-bold uppercase tracking-wider text-xs border-b border-slate-300 pb-0.5 mb-1.5 ${theme.text}`}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {edu.institution} {edu.location ? `, ${edu.location}` : ""}
                    </span>
                    <span className="text-slate-600 text-[11px]">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-700">
                    <span>
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </span>
                    {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
