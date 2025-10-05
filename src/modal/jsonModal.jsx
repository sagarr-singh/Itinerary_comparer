import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function JsonModal({ onAdd, onClose }) {
    const [jsonInput, setJsonInput] = useState("");


    const handleAddJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            const itineraryData = parsed.itinerary ? parsed.itinerary : parsed;
            onAdd(itineraryData);
            toast.success("Itinerary added successfully!");
            setJsonInput("");
            onClose();
        } catch (err) {
            alert("Invalid JSON format");
        }
    };



    return (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto p-4 backdrop-blur-sm">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <div className="relative bg-blue-300 text-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-300">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-200 hover:text-gray-200 font-bold"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Paste JSON Itinerary
                </h2>

                <textarea
                    className="w-full border border-gray-300 rounded-md p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white placeholder:text-gray-400 h-80"
                    rows="12"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Eg :- 
{
  "title": "Sample Weekend Getaway to Paris",
  "start_date": "2025-10-04",
  "end_date": "2025-10-06",
  "traveler": "You",
  "days": [
    {
      "date": "2025-10-04",
      "day_name": "Saturday",
      "summary": "Arrival and exploration",
      "activities": [
        {
          "time": "08:00 AM",
          "activity": "Flight arrival at Charles de Gaulle Airport",
          "location": "CDG Airport",
          "notes": "Pick up rental car or take RER train to city center"
        }
      ]
    }
  ]
}'
                />
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        onClick={handleAddJson}
                    >
                        Add JSON
                    </button>
                </div>
            </div>
        </div>

    );
}