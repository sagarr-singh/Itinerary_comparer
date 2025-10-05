import React, { useState } from "react";
import JsonModal from "../modal/JsonModal";
import ItineraryFormModal from "../modal/itinearyFormModal";
import { extractTextFromPDF } from "../utils/pdfParser";
import UploadPdfModal from "../modal/UploadPdfModal";
import { ToastContainer, toast } from 'react-toastify';



export default function ItineraryUpload({ onAdd }) {
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPdfUpload, setShowPdfUpload] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    try {
      const pdfText = await extractTextFromPDF(file);
      const lines = pdfText.split("\n").map((l) => l.trim()).filter(Boolean);

      // Package name from filename or first line
      const package_name = file?.name?.replace(/\.[^/.]+$/, "") || lines[0] || "Extracted PDF Itinerary";

      // Duration: look for "X days" or "X nights"
      const durationMatch = pdfText.match(/\b(\d+)\s*(days?|nights?)\b/i);
      const duration = durationMatch ? durationMatch[0] : "N/A";

      // Estimated cost: search lines for keywords like "Package Rate", "Cost", "Price"
      let total_cost = 0;
      const costLine = lines.find((l) =>
        /package rate|cost|price/i.test(l)
      );
      if (costLine) {
        const numberMatch = costLine.match(/Rs\.?\s?([\d,]+)/i);
        if (numberMatch) {
          total_cost = parseInt(numberMatch[1].replace(/,/g, ""));
        }
      }

      // Activities: detect day headings
      const activities = lines
        .filter((l) => /^Day\s*\d+/i.test(l))
        .map((l) => l.replace(/[:\-]/g, "").trim());

      const newItinerary = {
        id: Date.now(),
        package_name,
        description: pdfText.slice(0, 500) + (pdfText.length > 200 ? "..." : ""),
        duration,
        total_cost,
        activities,
        number_of_activities: activities.length,
        raw_text: pdfText,
      };

      onAdd(newItinerary);
      setShowPdfUpload(false);
      toast.success("PDF Itinerary added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to parse PDF");
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* JSON Button */}
        <div className="p-4 rounded-lg shadow text-center">
          <button
            className="w-full px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            onClick={() => setShowJsonModal(true)}
          >
            📄 Paste JSON Itinerary
          </button>
        </div>

        {/* Form Button */}
        <div className=" p-4 rounded-lg shadow text-center">
          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setShowFormModal(true)}
          >
            ✏️ Add Itineary via Form
          </button>
        </div>

        <div className="p-4 rounded-lg shadow text-center">
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowPdfUpload(true)}
          >
            📁 Upload PDF Itinerary
          </button>
        </div>
      </div>

      {showPdfUpload && (
        <UploadPdfModal
          onClose={() => setShowPdfUpload(false)}
          onUpload={handlePdfUpload}
          loading={loading}
        />
      )}


      {/* Modals */}
      {showJsonModal && (
        <JsonModal onAdd={onAdd} onClose={() => setShowJsonModal(false)} />
      )}
      {showFormModal && (
        <ItineraryFormModal onAdd={onAdd} onClose={() => setShowFormModal(false)} />
      )}
    </>
  );
}