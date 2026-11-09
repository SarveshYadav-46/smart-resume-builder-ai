import html2pdf from "html2pdf.js";

/**
 * Clean candidate name to form a safe, professional filename
 * e.g. "Sarvesh Yadav" -> "Sarvesh_Yadav_Resume.pdf"
 */
export const getResumeFilename = (fullName) => {
  const cleanName = (fullName || "Candidate")
    .trim()
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .replace(/\s+/g, "_");

  return `${cleanName || "Candidate"}_Resume.pdf`;
};

/**
 * Download resume as an A4 PDF document directly to user's computer
 *
 * @param {Object} options
 * @param {string} options.fullName - Candidate's full name
 * @param {string} [options.elementId="resume-document"] - DOM ID of resume container
 * @returns {Promise<{success: boolean, filename: string}>}
 */
export const downloadResumePdf = async ({ fullName, elementId = "resume-document" }) => {
  const filename = getResumeFilename(fullName);
  const element =
    document.getElementById(elementId) ||
    document.querySelector(".resume-sheet") ||
    document.getElementById("resume-preview-container");

  if (!element) {
    throw new Error(
      "Resume preview element was not found in the DOM. Please ensure the preview is active."
    );
  }

  const opt = {
    margin: [8, 8, 8, 8], // 8mm margins for clean A4 printing
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // High resolution (Retina quality)
      useCORS: true,
      letterRendering: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth || 800,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
      avoid: [".break-inside-avoid", ".page-break-avoid", "section", "header"],
    },
  };

  // Guard with timeout so the operation can never hang indefinitely
  const pdfPromise = html2pdf().set(opt).from(element).save();

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("PDF generation timed out after 15 seconds."));
    }, 15000);
  });

  await Promise.race([pdfPromise, timeoutPromise]);
  return { success: true, filename };
};

/**
 * Trigger browser print dialog with the candidate's name as document title
 * When the user selects "Save as PDF", the browser automatically suggests `${fullName}_Resume.pdf`
 *
 * @param {Object} options
 * @param {string} options.fullName - Candidate's full name
 */
export const printResumePdf = ({ fullName }) => {
  const originalTitle = document.title;
  const cleanTitle = (fullName || "Candidate")
    .trim()
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .replace(/\s+/g, "_");

  document.title = `${cleanTitle || "Candidate"}_Resume`;

  window.print();

  // Restore original page title after printing dialog closes
  setTimeout(() => {
    document.title = originalTitle;
  }, 1200);
};
