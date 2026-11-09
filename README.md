# 📄 Smart Resume Builder (ResumAI)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-Cloud%20Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-3.8%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, production-ready Full Stack **MERN** (MongoDB, Express, React, Node.js) web application powered by **Google Gemini AI**. Build recruiter-approved, ATS-compliant resumes with real-time live preview, AI-assisted content optimization, dynamic template switching, MongoDB Atlas persistence, and one-click professional A4 PDF export.

---

## 🚀 Live Demo & Deployment Links

- **Frontend (Vercel):** https://smart-resume-builder-ai.vercel.app/
- **Backend API (Render):** https://smart-resume-builder-backend-e900.onrender.com
- **API Health Check:** https://smart-resume-builder-backend-e900.onrender.com/api/health

---

## 📚 Documentation Links

For detailed, subproject-specific installation, configuration, and architecture details, see:

- 📘 **[Frontend Documentation](frontend/README.md)** — Comprehensive guide for the React 18 & Vite client application, component hierarchy, templates, and Vercel deployment.
- 📙 **[Backend Documentation](backend/README.md)** — Detailed guide for the Node.js & Express RESTful API, MongoDB Atlas integration, Google Gemini AI services, test suites, and Render deployment.

---

## 🌟 Key Features

### 1. 🖨️ Professional A4 PDF Export
- **Candidate-Specific Filename**: Downloads with candidate name format: `<Candidate_Name>_Resume.pdf` (e.g., `Sarvesh_Yadav_Resume.pdf`).
- **Template & Theme Fidelity**: Preserves the selected resume template (*Modern Clean* or *Classic ATS*) and accent color (*Indigo*, *Emerald*, *Sky*, *Slate*).
- **A4 Geometry & Spacing**: Precise A4 dimensions (210mm × 297mm) with balanced margins, page-break-avoidance rules, and print-color adjust.
- **Dual Export Mechanism**: Client-side instant PDF generation powered by `html2pdf.js` with zero-friction browser print fallback.

### 2. 🤖 Google Gemini AI Studio Integration
- **Summary Optimizer**: Rewrites rough drafts into 40–75 word ATS-optimized elevator pitches highlighting career value propositions.
- **FAANG-Style Work Experience Bullets**: Transforms task notes into high-impact Google XYZ formula bullets (*"Accomplished [X] as measured by [Y] by doing [Z]"*).
- **Project Descriptions Enhancer**: Formats technical project overviews highlighting architectural decisions and tech stack.
- **Skill Keyword Recommendations**: Analyzes your target job title (e.g., *Full Stack Developer*, *DevOps Engineer*) and recommends in-demand technical keywords.
- **Interactive Review Modal**: Visual side-by-side comparison ("Original" vs "AI-Optimized") allowing you to accept or reject suggestions with one click.

### 3. 💾 Full CRUD with MongoDB Atlas Persistence
- **Create**: Draft new resumes with structured forms for Personal Info, Experience, Education, Skills, Projects, and Certifications.
- **Read & Load**: Browse saved resumes in the Dashboard with ATS match score, completion percentage, and last modified date.
- **Update**: Edit any existing resume and synchronize updates directly to MongoDB Atlas.
- **Delete**: Remove resumes permanently with immediate state updates.
- **Offline Resilience**: Seamless fallback to in-memory state if the database is in the process of connecting.

### 4. 🎨 Real-Time Synchronous Live Preview & Templates
- **Split-Screen Studio**: Edit on the left and see immediate, reactive updates on the right.
- **Curated Templates**:
  - **Modern Clean**: Top color banner, uppercase headers, modern typography, and structured sections.
  - **Classic ATS**: Centered header, subtle divider lines, high-density layout ideal for traditional recruiters and automated parsers.
- **4 Accent Palettes**: Indigo, Emerald, Sky, and Slate.

---

## 🛠️ Technologies Used

| Domain | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS 3, Lucide React, React Router DOM 6 |
| **Backend** | Node.js (ES Modules), Express.js 4, Mongoose 8, CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud NoSQL Database) |
| **Artificial Intelligence** | Google Gemini 3.8 Flash (`@google/generative-ai`) |
| **PDF Generation** | `html2pdf.js`, `@media print` CSS engine |
| **Deployment** | Vercel (Frontend SPA), Render (Backend Web Service) |

---

## 📁 Project Folder Structure

```text
smart-resume-builder/
├── .gitignore                    # Root Git ignore configuration
├── README.md                     # Main repository documentation & overview
├── render.yaml                   # Render Blueprint Infrastructure-as-Code deployment spec
│
├── frontend/                     # Independent React 18 + Vite 6 Client Application
│   ├── README.md                 # Detailed frontend architecture & deployment guide
│   ├── .env                      # Local frontend environment variables (git-ignored)
│   ├── .env.example              # Frontend environment template
│   ├── index.html                # Single-page application HTML entry
│   ├── package.json              # Frontend dependencies (React, Lucide, Tailwind, Vite)
│   ├── postcss.config.js         # PostCSS Tailwind plugins
│   ├── tailwind.config.js        # Tailwind typography and theme configuration
│   ├── vercel.json               # Vercel Single-Page-App routing rewrite configuration
│   ├── vite.config.js            # Vite build and dev server configuration
│   │
│   └── src/                      # React Frontend Source Tree
│       ├── main.jsx              # React DOM mount point
│       ├── App.jsx               # React Router routing & layout wrapper
│       ├── index.css             # Global Tailwind CSS & A4 print styling
│       ├── components/
│       │   ├── common/
│       │   │   ├── AISuggestionModal.jsx # Side-by-side AI suggestion modal
│       │   │   ├── Footer.jsx            # Application footer
│       │   │   └── Navbar.jsx            # Top navigation bar
│       │   ├── dashboard/
│       │   │   ├── EmptyState.jsx        # Zero-state illustration
│       │   │   ├── ResumeCard.jsx        # Resume card with edit/delete actions
│       │   │   └── StatsOverview.jsx     # Dashboard KPI metrics
│       │   ├── resume-builder/
│       │   │   ├── CertificationsForm.jsx# Certifications & licenses form
│       │   │   ├── EducationForm.jsx     # Degrees & universities form
│       │   │   ├── ExperienceForm.jsx    # Work experience & AI bullet polish form
│       │   │   ├── PersonalInfoForm.jsx  # Contact & links form
│       │   │   ├── ProjectsForm.jsx      # Key projects & AI enhance form
│       │   │   ├── ResumeLivePreview.jsx # Sticky preview with PDF download & template controls
│       │   │   ├── SkillsForm.jsx        # Categorized skills & AI suggest form
│       │   │   └── SummaryForm.jsx       # Summary & AI elevator pitch form
│       │   └── templates/
│       │       ├── MinimalTemplate.jsx   # Classic ATS resume layout
│       │       └── ModernTemplate.jsx    # Modern Clean resume layout
│       ├── context/
│       │   └── ResumeContext.jsx         # Global state & API sync context provider
│       ├── data/
│       │   ├── mockResumes.js            # Fallback mock resumes
│       │   └── sampleResume.js           # Sample resume default dataset
│       ├── pages/
│       │   ├── CreateResumePage.jsx      # Split-screen resume editor studio
│       │   ├── DashboardPage.jsx         # Resumes library, search, and filters
│       │   └── LandingPage.jsx           # Public marketing landing page
│       ├── services/
│       │   └── api.js                    # Fetch client for backend REST API
│       └── utils/
│           └── pdfExport.js              # A4 PDF download & candidate naming utility
│
└── backend/                      # Independent Node.js + Express REST API
    ├── README.md                 # Detailed backend architecture & API reference guide
    ├── .env                      # Local backend secrets (git-ignored)
    ├── .env.example              # Backend environment template
    ├── package.json              # Backend dependencies (@google/generative-ai, express, etc.)
    ├── server.js                 # Express server entry point, CORS & graceful shutdown
    ├── test-ai-service.js        # Automated Gemini AI service test suite
    ├── test-db-connection.js     # Automated MongoDB Atlas connection & CRUD test suite
    ├── config/
    │   └── db.js                 # MongoDB Atlas connection handler & DNS configuration
    ├── controllers/
    │   ├── aiController.js       # Gemini AI request validation and handling
    │   └── resumeController.js   # Resume CRUD database operations
    ├── middleware/
    │   └── errorHandler.js       # Centralized 404 & 500 error handler
    ├── models/
    │   └── Resume.js             # Mongoose resume schema & validation
    ├── routes/
    │   ├── aiRoutes.js           # /api/ai routes
    │   └── resumeRoutes.js       # /api/resumes routes
    └── services/
        ├── aiService.js          # Google Gemini AI prompts, cascading fallback & error handling
        └── geminiService.js      # Backward-compatible re-export module
```

---

## ⚙️ Environment Variable Setup

### 1. Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory based on `backend/.env.example`:

```env
# Server Port
PORT=5000

# Environment Mode
NODE_ENV=development

# Allowed Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart_resume_builder?retryWrites=true&w=majority

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Gemini Model (defaults to gemini-3.8-flash)
GEMINI_MODEL=gemini-3.8-flash
```

> ⚠️ **Important Security Rule**: Never commit `backend/.env` to GitHub. The file is excluded by `.gitignore`.

### 2. Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory based on `frontend/.env.example`:

```env
# Backend API Base URL
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Installation & Local Development Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas account** (Free M0 cluster)
- **Google AI Studio account** (Free Gemini API key)

### Step 1: Clone Repository
```bash
git clone https://github.com/SarveshYadav-46/smart-resume-builder-ai.git
cd smart-resume-builder-ai
```

### Step 2: Install Dependencies

**Install Backend Dependencies:**
```bash
cd backend
npm install
cd ..
```

**Install Frontend Dependencies:**
```bash
cd frontend
npm install
cd ..
```

### Step 3: Configure Environment Variables
- Copy `backend/.env.example` to `backend/.env` and supply your `MONGODB_URI` and `GEMINI_API_KEY`.
- Copy `frontend/.env.example` to `frontend/.env`.

### Step 4: Run Frontend and Backend

**Terminal 1 — Run Backend Server (Port 5000):**
```bash
cd backend
npm start
# Alternatively for hot-reloading:
npm run dev
```
*Output: `🚀 Smart Resume Builder Server running on port 5000`*

**Terminal 2 — Run Frontend Server (Port 5173):**
```bash
cd frontend
npm run dev
```
*Output: `➜  Local:   http://localhost:5173/`*

Open your browser at **`http://localhost:5173`**.

---

## 📡 Backend API Endpoints

### Health & Server Check
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Root API ping and route index |
| `GET` | `/api/health` | Service health status (MongoDB & Gemini AI) |

### Resume Management (CRUD)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/resumes` | Retrieve all saved resumes from MongoDB Atlas |
| `GET` | `/api/resumes/:id` | Retrieve a specific resume by MongoDB ObjectId |
| `POST` | `/api/resumes` | Create and save a new resume |
| `PUT` | `/api/resumes/:id` | Update an existing resume |
| `DELETE` | `/api/resumes/:id` | Delete a resume permanently |

### Gemini AI Studio Endpoints
| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `POST` | `/api/ai/improve-summary` | `{ summary, jobTitle }` | Optimizes professional summary statement |
| `POST` | `/api/ai/improve-experience` | `{ role, company, description }` | Converts duties into XYZ formula bullets |
| `POST` | `/api/ai/improve-project` | `{ title, techStack, description }` | Enhances technical project highlights |
| `POST` | `/api/ai/suggest-skills` | `{ jobTitle, currentSkills }` | Returns in-demand keywords for target role |
| `POST` | `/api/ai/generate-content` | `{ section, prompt }` | Custom resume text generation |

---

## 🚀 Deployment Overview

The project is deployed in a decoupled architecture:

| Component | Platform | Live URL | Configuration Docs |
| :--- | :--- | :--- | :--- |
| **Frontend** | Vercel | [https://smart-resume-builder-ai.vercel.app/](https://smart-resume-builder-ai.vercel.app/) | [Frontend README](frontend/README.md#production-deployment-vercel) |
| **Backend API** | Render | [https://smart-resume-builder-backend-e900.onrender.com](https://smart-resume-builder-backend-e900.onrender.com) | [Backend README](backend/README.md#render-deployment-configuration) |
| **Health Check** | Render | [https://smart-resume-builder-backend-e900.onrender.com/api/health](https://smart-resume-builder-backend-e900.onrender.com/api/health) | [Backend Health Check](backend/README.md#system--health) |

- **Frontend on Vercel:** Automated CI/CD from `main`, root directory set to `frontend`, output directory `dist`, SPA URL rewriting via `vercel.json`, connecting to Render via `VITE_API_URL`.
- **Backend on Render:** Automated Web Service deployment from `main`, root directory set to `backend`, start command `npm start`, health check path `/api/health`, environment configured with MongoDB Atlas and Gemini API keys.

---

## 🖼️ Application Screenshots

| Page / Feature | Description |
|---|---|
| **Landing Page** | Responsive hero, feature showcase, and step-by-step workflow |
| **Dashboard** | Resumes library, search bar, status filters, and completion indicators |
| **Split-Screen Studio** | Form inputs on left, synchronous A4 preview on right |
| **Gemini AI Modal** | Side-by-side original vs AI-enhanced suggestion comparison |
| **A4 PDF Export** | Clean print-ready download with `<Candidate_Name>_Resume.pdf` |

---

## 🔒 Security Best Practices

- **Zero Secret Exposure**: Database connection strings and Google Gemini API keys are only accessible on the backend server.
- **Strict CORS Policy**: Cross-Origin Resource Sharing is locked down to authorized frontend domains.
- **Input Sanitization**: Request payloads are validated before processing by Mongoose and Google Generative AI.
- **Database Safety Guard**: Backend endpoints verify database connectivity before querying to prevent connection hanging.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it for your personal or academic projects.
