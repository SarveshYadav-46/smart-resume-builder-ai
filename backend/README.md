# Smart Resume Builder AI — Backend RESTful API

Scalable, production-ready Node.js & Express.js REST API providing secure MongoDB Atlas persistence, robust DNS resolution, and Google Gemini AI integrations for the Smart Resume Builder platform.

- **Live Backend API URL:** [https://smart-resume-builder-backend-e900.onrender.com](https://smart-resume-builder-backend-e900.onrender.com)
- **Live Health Check URL:** [https://smart-resume-builder-backend-e900.onrender.com/api/health](https://smart-resume-builder-backend-e900.onrender.com/api/health)
- **Database:** MongoDB Atlas
- **AI Integration:** Google Gemini API (`gemini-3.8-flash`)
- **Hosting Platform:** Render

---

## Table of Contents

- [Overview](#overview)
- [Live Deployment Links](#live-deployment-links)
- [Technologies Used](#technologies-used)
- [Architecture & Core Highlights](#architecture--core-highlights)
- [API Endpoints Reference](#api-endpoints-reference)
  - [System & Health](#system--health)
  - [Resume Management (CRUD)](#resume-management-crud)
  - [Google Gemini AI Integration](#google-gemini-ai-integration)
- [Folder Structure](#folder-structure)
- [Installation & Local Setup](#installation--local-setup)
- [Environment Variables](#environment-variables)
- [Render Deployment Configuration](#render-deployment-configuration)
- [Automated Test Suites](#automated-test-suites)
- [Available Scripts](#available-scripts)

---

## Overview

The Smart Resume Builder backend serves as the core orchestration and data layer. It manages resume persistence in MongoDB Atlas via Mongoose, enforces strict schema validation, handles dynamic CORS policies for Vercel deployments and local development, and routes requests to Google Gemini AI to assist candidates with ATS-friendly phrasing, impact statements, and skills suggestions.

---

## Live Deployment Links

| Resource | Service | URL |
| :--- | :--- | :--- |
| **API Base URL** | Render | [https://smart-resume-builder-backend-e900.onrender.com](https://smart-resume-builder-backend-e900.onrender.com) |
| **Health Check** | Render | [https://smart-resume-builder-backend-e900.onrender.com/api/health](https://smart-resume-builder-backend-e900.onrender.com/api/health) |
| **Resumes Endpoint** | Render | [https://smart-resume-builder-backend-e900.onrender.com/api/resumes](https://smart-resume-builder-backend-e900.onrender.com/api/resumes) |
| **Connected Frontend** | Vercel | [https://smart-resume-builder-ai.vercel.app](https://smart-resume-builder-ai.vercel.app) |

---

## Technologies Used

- **Runtime Environment:** [Node.js](https://nodejs.org/) (`>=18.0.0`, Native ES Modules `"type": "module"`)
- **Web Framework:** [Express.js](https://expressjs.com/) (`^4.21.2`)
- **Database Engine:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud Cluster)
- **ODM / Data Modeling:** [Mongoose](https://mongoosejs.com/) (`^8.9.3`)
- **AI Engine:** [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (`@google/generative-ai: ^0.21.0`)
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv) (`^16.4.7`)
- **Cross-Origin Security:** [cors](https://www.npmjs.com/package/cors) (`^2.8.5`)

---

## Architecture & Core Highlights

1. **Pre-Connection DNS Configuration**
   - Configures Node.js to use Google Public DNS (`8.8.8.8`, `8.8.4.4`) with `ipv4first` result ordering prior to database initialization.
   - Prevents `querySrv ECONNREFUSED` issues common on Windows and local router DNS resolvers when looking up Atlas SRV records (`_mongodb._tcp.*`).

2. **Sequential Server Bootstrap**
   - Express only binds and listens on port 5000 **after** the MongoDB connection succeeds, eliminating unhandled connection rejections.

3. **Resilient AI Pipeline with Transient Fault Handling**
   - Uses `gemini-3.8-flash` as the primary AI model.
   - Implements automated fallback cascading (`gemini-3.8-flash` → `gemini-3.6-flash` → `gemini-3.5-flash` → `gemini-3-flash-preview`) to absorb transient HTTP 503 high-demand spikes and 429 rate limits.
   - Provides structured HTTP error responses for 400, 401, 404, 429, and 503 status codes.

4. **Security & Credential Protection**
   - MongoDB Atlas credentials and Google Gemini API keys are confined strictly to backend environment variables.
   - Dynamic CORS middleware permits designated frontend domains (including Vercel deployment URLs and localhost) while rejecting unauthorized origins in production.

---

## API Endpoints Reference

### System & Health

| Method | Endpoint | Description | Sample Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Root API ping and endpoint registry | `{"name":"Smart Resume Builder API","status":"active","healthCheck":"/api/health"}` |
| `GET` | `/api/health` | Comprehensive health check (MongoDB Atlas + Gemini AI) | `{"status":"online","services":{"database":"Connected (MongoDB Atlas)","geminiAI":"Configured"}}` |

---

### Resume Management (CRUD)

All resume endpoints are mounted at `/api/resumes`.

| Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/resumes` | Create and persist a new resume | Resume JSON document | `201 Created` |
| `GET` | `/api/resumes` | Fetch all saved resumes (sorted by updatedAt) | None | `200 OK` |
| `GET` | `/api/resumes/:id` | Fetch a single resume by its MongoDB `_id` | None | `200 OK` |
| `PUT` | `/api/resumes/:id` | Update an existing resume document | Partial or full Resume JSON | `200 OK` |
| `DELETE` | `/api/resumes/:id` | Permanently remove a resume document | None | `200 OK` |

---

### Google Gemini AI Integration

All AI endpoints are mounted at `/api/ai`.

| Method | Endpoint | Description | Request Body Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/improve-summary` | Refine professional summary with active voice & ATS keywords | `{ "summary": "...", "jobTitle": "Full Stack Developer" }` |
| `POST` | `/api/ai/improve-experience` | Convert experience bullets into Google XYZ impact format | `{ "role": "...", "company": "...", "description": "..." }` |
| `POST` | `/api/ai/improve-project` | Highlight tech stack and engineering challenges for projects | `{ "title": "...", "techStack": "...", "description": "..." }` |
| `POST` | `/api/ai/suggest-skills` | Recommend in-demand technical skills for target role | `{ "jobTitle": "...", "currentSkills": ["React", "Node.js"] }` |
| `POST` | `/api/ai/generate-content` | Generate custom ATS content for any resume section | `{ "section": "Summary", "prompt": "..." }` |

---

## Folder Structure

```text
backend/
├── config/
│   └── db.js                   # Mongoose Atlas connection with Google DNS resolver setup
├── controllers/
│   ├── aiController.js         # Request handlers for Gemini AI endpoints
│   └── resumeController.js     # CRUD controllers with connection guards & validation
├── middleware/
│   └── errorHandler.js         # 404 handler and central JSON error response middleware
├── models/
│   └── Resume.js               # Mongoose schema (PersonalInfo, Experience, Education, etc.)
├── routes/
│   ├── aiRoutes.js             # Router mounting for /api/ai endpoints
│   └── resumeRoutes.js         # Router mounting for /api/resumes CRUD
├── services/
│   ├── aiService.js            # Core Gemini AI service, prompt engineering & error handling
│   └── geminiService.js        # Backward-compatible re-export module
├── .env                        # Local environment variables (git-ignored)
├── .env.example                # Example environment variable template
├── package.json                # Project dependencies, engines & test scripts
├── server.js                   # Main application entry point & Express server bootstrap
├── test-ai-service.js          # Automated Gemini AI service verification script
└── test-db-connection.js       # Automated MongoDB Atlas SRV & CRUD test script
```

---

## Installation & Local Setup

### Prerequisites

- **Node.js:** `>=18.0.0`
- **npm:** `>=9.0.0`
- **MongoDB Atlas Cluster:** Accessible URI with network access enabled (`0.0.0.0/0` or current IP)
- **Google Gemini API Key:** Free key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Steps

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the environment file:**
   Create a `.env` file from the provided example:
   ```bash
   cp .env.example .env
   ```

4. **Run automated connectivity diagnostics:**
   ```bash
   # Test MongoDB Atlas connection and CRUD operations
   npm run test:db

   # Test Google Gemini AI integration and prompt responses
   npm run test:ai
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Or for standard production start:
   ```bash
   npm start
   ```

   The server will output:
   ```text
   MongoDB Atlas Connected Successfully
      Host: cluster0-shard-00-00.xxxx.mongodb.net
      Database Name: authDB
   Server running on port 5000
   🚀 Smart Resume Builder Server running on port 5000
   📡 Health Check endpoint: http://localhost:5000/api/health
   ```

---

## Environment Variables

### Local Development (`backend/.env`)

```env
# Server Port
PORT=5000

# Environment Mode
NODE_ENV=development

# Allowed Frontend Origin (for CORS)
FRONTEND_URL=http://localhost:5173

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/smart_resume_builder?retryWrites=true&w=majority

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Google Gemini Model (defaults to gemini-3.8-flash)
GEMINI_MODEL=gemini-3.8-flash
```

---

## Render Deployment Configuration

The backend is configured for deployment as a Render Web Service.

### Service Settings

| Setting | Value |
| :--- | :--- |
| **Service Type** | Web Service |
| **Environment** | Node |
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Health Check Path** | `/api/health` |
| **Auto-Deploy** | Yes (on push to `main` branch) |

### Production Environment Variables on Render

In the Render Dashboard under **Environment**:

| Key | Value Description | Example / Production Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Web server port | `5000` |
| `FRONTEND_URL` | Live frontend URL allowed by CORS | `https://smart-resume-builder-ai.vercel.app` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://<db_user>:<db_password>@cluster0...` |
| `GEMINI_API_KEY` | Google AI Studio API key | `<your_production_gemini_api_key>` |
| `GEMINI_MODEL` | Gemini AI model identifier | `gemini-3.8-flash` |

---

## Automated Test Suites

The backend includes standalone test scripts to verify external integrations without needing a running frontend:

1. **Database & CRUD Verification:**
   ```bash
   npm run test:db
   ```
   Tests SRV DNS resolution, connects to MongoDB Atlas via Mongoose, inserts a test resume document, reads it back, updates it, and deletes it.

2. **Gemini AI Service Verification:**
   ```bash
   npm run test:ai
   ```
   Sends test prompts to the Google Gemini API for summary enhancement, experience bullet point rewriting, and skills suggestion, verifying end-to-end AI completion.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Runs the production server (`node server.js`) |
| `npm run dev` | Runs the development server with auto-reload (`node --watch server.js`) |
| `npm run test:db` | Runs the database connection and CRUD verification suite |
| `npm run test:ai` | Runs the Gemini AI integration and prompt verification suite |
