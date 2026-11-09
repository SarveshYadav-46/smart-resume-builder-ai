export const initialSampleResume = {
  personalInfo: {
    fullName: "Sarvesh Yadav",
    jobTitle: "Full Stack MERN Developer",
    email: "sarvesh.yadav@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra, India",
    portfolio: "https://sarvesh.dev",
    linkedin: "https://linkedin.com/in/sarveshyadav",
    github: "https://github.com/sarveshyadav",
    summary:
      "Passionate and results-driven Full Stack Developer with expertise in building responsive, scalable web applications using React.js, Node.js, Express.js, and MongoDB. Strong background in UI/UX architecture, state management, and RESTful API integration. Dedicated to clean code, performance optimization, and creating seamless user journeys.",
  },
  experience: [
    {
      id: "exp-1",
      role: "Frontend Developer Intern",
      company: "TechPulse Digital Solutions",
      location: "Mumbai, India",
      startDate: "Jan 2025",
      endDate: "Present",
      current: true,
      description:
        "Engineered scalable dashboard interfaces using React, Tailwind CSS, and Vite, resulting in a 35% improvement in page load speed.\nCollaborated with UI/UX designers to translate Figma mockups into reusable, accessible component libraries.\nIntegrated asynchronous REST APIs and implemented responsive state management with React Context.",
    },
    {
      id: "exp-2",
      role: "Junior Web Developer",
      company: "NexGen Software Innovations",
      location: "Pune, India",
      startDate: "Jun 2024",
      endDate: "Dec 2024",
      current: false,
      description:
        "Developed and maintained client-facing web applications using JavaScript, Tailwind CSS, and Node.js.\nRefactored legacy codebases to modern ES6+ standards, boosting application responsiveness.\nImplemented client-side form validation and interactive search filters for 10,000+ daily active records.",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of Mumbai",
      degree: "Master of Computer Applications (MCA)",
      fieldOfStudy: "Computer Science & Application Software",
      startDate: "2023",
      endDate: "2025",
      location: "Mumbai, India",
      gpa: "8.8 / 10 CGPA",
    },
    {
      id: "edu-2",
      institution: "Maharashtra College of Science & Commerce",
      degree: "Bachelor of Computer Applications (BCA)",
      fieldOfStudy: "Information Technology",
      startDate: "2020",
      endDate: "2023",
      location: "Mumbai, India",
      gpa: "8.5 / 10 CGPA",
    },
  ],
  skills: [
    { category: "Frontend", items: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Redux Toolkit", "Vite"] },
    { category: "Backend & DB", items: ["Node.js", "Express.js", "RESTful APIs", "MongoDB", "Mongoose", "PostgreSQL"] },
    { category: "Tools & DevOps", items: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Docker Basics"] },
    { category: "Core & Soft Skills", items: ["Data Structures & Algorithms", "UI/UX Design Systems", "Agile / Scrum", "Problem Solving", "Team Collaboration"] },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Smart Resume Builder with AI Suggestions",
      techStack: "React, Vite, Tailwind CSS, React Router, Lucide Icons",
      liveLink: "https://resumai.dev",
      githubLink: "https://github.com/sarveshyadav/smart-resume-builder",
      description:
        "A modern SaaS-style web application featuring live A4 resume previewing, customizable modular sections, and dynamic data state architecture.\nEngineered responsive split-screen layouts, instant print-ready PDF styling, and intuitive form controls for personal details, experience, projects, and skills.",
    },
    {
      id: "proj-2",
      title: "DevCollab - Real-Time Team Task Manager",
      techStack: "MERN Stack, Tailwind CSS, JWT Auth",
      liveLink: "https://devcollab.demo.app",
      githubLink: "https://github.com/sarveshyadav/devcollab-app",
      description:
        "Built a full-stack Kanban task management platform featuring secure JWT authentication, role-based access control, and intuitive drag-and-drop task workflows.\nDesigned REST APIs with Express and MongoDB handling user boards, activity feeds, and progress metrics.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Meta Certified Front-End Developer",
      issuer: "Meta / Coursera",
      issueDate: "Aug 2024",
      credentialUrl: "https://coursera.org/verify/meta-frontend",
      credentialId: "META-FED-884920",
    },
    {
      id: "cert-2",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "Jan 2024",
      credentialUrl: "https://aws.amazon.com/verification",
      credentialId: "AWS-CCP-109283",
    },
  ],
};
