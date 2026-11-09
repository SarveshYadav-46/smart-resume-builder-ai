import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award } from "lucide-react";

export const ModernTemplate = ({ data, accentColor = "indigo" }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const colorMap = {
    indigo: {
      primary: "text-indigo-600",
      border: "border-indigo-600",
      bgLight: "bg-indigo-50 text-indigo-700",
      accentBar: "bg-indigo-600",
      chip: "border-indigo-200 bg-indigo-50/60 text-indigo-800",
    },
    emerald: {
      primary: "text-emerald-700",
      border: "border-emerald-600",
      bgLight: "bg-emerald-50 text-emerald-800",
      accentBar: "bg-emerald-600",
      chip: "border-emerald-200 bg-emerald-50/60 text-emerald-800",
    },
    sky: {
      primary: "text-sky-600",
      border: "border-sky-600",
      bgLight: "bg-sky-50 text-sky-800",
      accentBar: "bg-sky-600",
      chip: "border-sky-200 bg-sky-50/60 text-sky-800",
    },
    slate: {
      primary: "text-slate-800",
      border: "border-slate-800",
      bgLight: "bg-slate-100 text-slate-800",
      accentBar: "bg-slate-800",
      chip: "border-slate-200 bg-slate-100 text-slate-800",
    },
  };

  const theme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      id="resume-document"
      className="resume-sheet bg-white w-full text-slate-800 p-8 sm:p-10 font-sans shadow-sm print:p-0 print:shadow-none min-h-[297mm] box-border"
    >
      {/* Top Accent Bar */}
      <div className={`h-1.5 w-full ${theme.accentBar} mb-6 rounded-full print:rounded-none`}></div>

      {/* Header Section */}
      <header className="border-b border-slate-200 pb-5 mb-5 break-inside-avoid">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className={`text-base font-semibold ${theme.primary} mt-1`}>
          {personalInfo.jobTitle || "Your Target Job Title"}
        </p>

        {/* Contact Info Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </span>
          )}

          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}

          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}

          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Portfolio
              </a>
            </span>
          )}

          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <a
                href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </span>
          )}

          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <a
                href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Main Body Flow */}
      <div className="space-y-5 text-xs leading-normal">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              Work Experience & Internships
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-[13px]">
                      {exp.role}
                    </span>
                    <span className="text-slate-500 text-[11px] font-medium">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      {exp.company}
                    </span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>

                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600 text-xs mt-1">
                      {exp.description
                        .split("\n")
                        .filter((line) => line.trim().length > 0)
                        .map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {bullet.replace(/^[•\-\*]\s*/, "")}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-[13px]">
                        {proj.title}
                      </span>
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-0.5 text-[10px] ${theme.primary} hover:underline font-semibold`}
                        >
                          Demo <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-[10px] text-slate-500 hover:underline font-semibold"
                        >
                          Code <Github className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.techStack && (
                    <p className="text-[11px] font-semibold text-slate-600 mb-1">
                      Tech Stack: <span className="text-slate-500 font-normal">{proj.techStack}</span>
                    </p>
                  )}

                  {proj.description && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-600 text-xs">
                      {proj.description
                        .split("\n")
                        .filter((line) => line.trim().length > 0)
                        .map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {bullet.replace(/^[•\-\*]\s*/, "")}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical & Core Skills */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Skills
            </h2>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="flex flex-wrap items-baseline text-xs">
                  <span className="font-bold text-slate-800 w-32 shrink-0">
                    {cat.category}:
                  </span>
                  <span className="text-slate-700 flex-1">
                    {cat.items.join(" • ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              Certifications & Accreditations
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex flex-wrap items-baseline justify-between gap-1 break-inside-avoid">
                  <div>
                    <span className="font-bold text-slate-900 text-xs">
                      {cert.name}
                    </span>
                    <span className="text-slate-600 text-xs ml-1.5">
                      — {cert.issuer}
                    </span>
                    {cert.credentialId && (
                      <span className="text-slate-400 text-[10px] ml-2">
                        (ID: {cert.credentialId})
                      </span>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-0.5 text-[10px] ${theme.primary} hover:underline ml-2 font-medium`}
                      >
                        Verify <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  {cert.issueDate && (
                    <span className="text-slate-500 text-[11px] font-medium">
                      {cert.issueDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
              Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-xs">
                      {edu.degree} {edu.fieldOfStudy ? `– ${edu.fieldOfStudy}` : ""}
                    </span>
                    <span className="text-slate-500 text-[11px] font-medium">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 text-xs">
                    <span>{edu.institution} {edu.location ? `(${edu.location})` : ""}</span>
                    {edu.gpa && (
                      <span className="font-semibold text-slate-700 text-[11px]">
                        Grade: {edu.gpa}
                      </span>
                    )}
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
