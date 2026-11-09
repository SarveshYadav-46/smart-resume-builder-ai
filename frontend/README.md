# Smart Resume Builder AI — Frontend Application

Modern, intuitive, and responsive single-page web application (SPA) for crafting ATS-optimized professional resumes in real time with Google Gemini AI assistance and instant A4 PDF export.

- **Live Frontend URL:** [https://smart-resume-builder-ai.vercel.app/](https://smart-resume-builder-ai.vercel.app/)
- **Production Backend API:** [https://smart-resume-builder-backend-e900.onrender.com/api](https://smart-resume-builder-backend-e900.onrender.com/api)
- **Deployment Platform:** Vercel

---

## Table of Contents

- [Overview](#overview)
- [Live Deployment](#live-deployment)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Folder Structure](#folder-structure)
- [Installation & Local Development](#installation--local-development)
- [Environment Variables Setup](#environment-variables-setup)
- [API Communication](#api-communication)
- [Production Deployment (Vercel)](#production-deployment-vercel)
- [Available Scripts](#available-scripts)

---

## Overview

The Smart Resume Builder frontend is built with React 18 and Vite 6, styled with Tailwind CSS, and designed to provide a frictionless resume writing experience. It features an interactive multi-section form, live dual-template A4 preview with customizable accent colors, AI-powered content improvement powered by Google Gemini via the backend API, and client-side A4 PDF download.

---

## Live Deployment

| Service | Provider | URL |
| :--- | :--- | :--- |
| **Frontend Application** | Vercel | [https://smart-resume-builder-ai.vercel.app/](https://smart-resume-builder-ai.vercel.app/) |
| **Backend API** | Render | [https://smart-resume-builder-backend-e900.onrender.com](https://smart-resume-builder-backend-e900.onrender.com) |
| **API Health Check** | Render | [https://smart-resume-builder-backend-e900.onrender.com/api/health](https://smart-resume-builder-backend-e900.onrender.com/api/health) |

---

## Technologies Used

- **Core Framework:** [React 18](https://react.dev/) (`^18.3.1`)
- **Build Tool:** [Vite 6](https://vitejs.dev/) (`^6.0.7`)
- **Routing:** [React Router DOM](https://reactrouter.com/) (`^6.28.0`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (`^3.4.17`) with PostCSS & Autoprefixer
- **Icons:** [Lucide React](https://lucide.dev/) (`^0.469.0`)
- **PDF Generation:** [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) (`^0.14.0`)
- **State Management:** React Context API (`ResumeContext.jsx`) with localStorage persistence

---

## Key Features

1. **Multi-Section Resume Editor**
   - Personal Info (Full Name, Contact, Social / Portfolio links)
   - Professional Summary with AI enhancement
   - Work Experience with Google XYZ bullet formatting
   - Education and Academic records
   - Projects with tech stacks and live/GitHub links
   - Categorized Technical & Soft Skills
   - Certifications with credential verification links

2. **Real-Time Live Preview & Dual Templates**
   - **Modern Clean:** Contemporary layout with colored accent bars, badges, and icon highlights.
   - **Classic ATS:** Clean, single-column minimalist format engineered to pass ATS scanners.
   - **Accent Palette:** Switch between Indigo, Emerald, Sky, and Slate accents in one click.

3. **Google Gemini AI Integration**
   - **Summary Improver:** Polishes drafts into punchy, ATS-ready elevator pitches.
   - **Experience Rewriter:** Transforms bullet points into quantifiable impact statements ("Accomplished [X] as measured by [Y] by doing [Z]").
   - **Project Enhancer:** Emphasizes architectural decisions and outcomes.
   - **Skill Recommender:** Suggests missing in-demand skills based on the target role.

4. **Client-Side A4 PDF Export & Print**
   - Direct download of clean, high-resolution (Retina scale 2x) A4 PDF.
   - Uses the candidate's name for the output filename (e.g., `Sarvesh_Yadav_Resume.pdf`).
   - Built-in 15-second timeout guard with error banner and automatic fallback to the native browser Print dialog.
   - Dedicated **Print** button preserving clean print media CSS (`@media print`).

5. **Resume Management Dashboard**
   - Create, edit, duplicate, and delete resumes persisted to MongoDB Atlas.
   - Overview metrics and quick-action cards.

---

## Folder Structure

```text
frontend/
├── dist/                          # Production build output
├── public/                        # Static public assets
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AISuggestionModal.jsx   # Modal for viewing & applying AI suggestions
│   │   │   ├── Footer.jsx              # Application footer
│   │   │   └── Navbar.jsx              # Responsive navigation header
│   │   ├── dashboard/
│   │   │   ├── EmptyState.jsx          # Placeholder when no resumes exist
│   │   │   ├── ResumeCard.jsx          # Resume summary card on Dashboard
│   │   │   └── StatsOverview.jsx       # Resume count and status statistics
│   │   ├── resume-builder/
│   │   │   ├── CertificationsForm.jsx  # Certification entries form
│   │   │   ├── EducationForm.jsx       # Education entries form
│   │   │   ├── ExperienceForm.jsx      # Work experience with AI assistance
│   │   │   ├── PersonalInfoForm.jsx    # Contact and personal details
│   │   │   ├── ProjectsForm.jsx        # Project details with AI enhancement
│   │   │   ├── ResumeLivePreview.jsx   # Live paper preview, template & PDF controls
│   │   │   ├── SkillsForm.jsx          # Skills category builder & AI recommender
│   │   │   └── SummaryForm.jsx         # Professional summary with AI enhancement
│   │   └── templates/
│   │       ├── MinimalTemplate.jsx     # Classic ATS single-column template
│   │       └── ModernTemplate.jsx      # Modern styled layout with accent color
│   ├── context/
│   │   └── ResumeContext.jsx           # Global state for active resume, template & theme
│   ├── data/
│   │   ├── mockResumes.js              # Fallback mock resumes for offline testing
│   │   └── sampleResume.js             # Initial template resume data
│   ├── pages/
│   │   ├── CreateResumePage.jsx        # Main two-column editor & preview page
│   │   ├── DashboardPage.jsx           # User dashboard for saved resumes
│   │   └── LandingPage.jsx             # Marketing and feature highlight page
│   ├── services/
│   │   └── api.js                      # Centralized API service for backend endpoints
│   ├── utils/
│   │   └── pdfExport.js                # html2pdf.js configuration & window.print handler
│   ├── App.jsx                         # Application router configuration
│   ├── index.css                       # Global Tailwind CSS definitions
│   └── main.jsx                        # React root entry point
├── .env                                # Local environment variables (git-ignored)
├── .env.example                        # Example environment variables template
├── index.html                          # Single-page application HTML entry
├── package.json                        # Frontend dependencies & scripts
├── postcss.config.js                   # PostCSS plugin setup
├── tailwind.config.js                  # Tailwind theme, colors & font setup
├── vercel.json                         # Vercel deployment rewrites configuration
└── vite.config.js                      # Vite build configuration
```

---

## Installation & Local Development

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Steps

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the environment file:**
   Create a `.env` file in the `frontend` root:
   ```bash
   cp .env.example .env
   ```
   Ensure it points to your local backend server:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## Environment Variables Setup

The frontend uses Vite's `import.meta.env` system. All environment variables must be prefixed with `VITE_`.

| Variable | Description | Default (Local) | Production Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` | `https://smart-resume-builder-backend-e900.onrender.com/api` |

### `.env` (Local Development)
```env
# Frontend Local Environment
VITE_API_URL=http://localhost:5000/api
```

---

## API Communication

The frontend communicates with the backend exclusively through the configured `VITE_API_URL`.

All HTTP requests are routed through `src/services/api.js`:
- **Resume CRUD Operations:**
  - `GET /resumes` — Load all resumes
  - `GET /resumes/:id` — Load single resume
  - `POST /resumes` — Save new resume
  - `PUT /resumes/:id` — Update existing resume
  - `DELETE /resumes/:id` — Delete resume
- **AI Integration Operations:**
  - `POST /ai/improve-summary` — AI summary refinement
  - `POST /ai/improve-experience` — AI bullet point rewrite
  - `POST /ai/improve-project` — AI project description improvement
  - `POST /ai/suggest-skills` — AI skills suggestion for role
  - `POST /ai/generate-content` — Custom section generation
- **System Health:**
  - `GET /health` — Check backend and database status

> **Security Note:** Sensitive credentials (such as `GEMINI_API_KEY` and MongoDB Atlas connection strings) are stored exclusively in the backend `.env`. The frontend never accesses or exposes secret keys.

---

## Production Deployment (Vercel)

The frontend is deployed to Vercel with automatic continuous deployment from the repository's `main` branch.

### Vercel Project Configuration

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Vercel Environment Variables
In the Vercel Project Settings under **Settings → Environment Variables**:

```text
VITE_API_URL = https://smart-resume-builder-backend-e900.onrender.com/api
```

### SPA Routing (`vercel.json`)
Client-side routing via React Router DOM is configured using rewrites in `frontend/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production |
| `npm run preview` | Locally previews the production build from `dist/` |
