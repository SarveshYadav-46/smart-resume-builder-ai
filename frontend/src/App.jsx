import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateResumePage } from "./pages/CreateResumePage";

const AppContent = () => {
  const location = useLocation();
  const isBuilderPage = location.pathname === "/create-resume";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <div className="no-print">
        <Navbar />
      </div>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-resume" element={<CreateResumePage />} />
          {/* Catch all fallback to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {!isBuilderPage && (
        <div className="no-print">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ResumeProvider>
  );
}
