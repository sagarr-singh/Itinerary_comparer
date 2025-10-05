import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../assets/Img1.jpg";
import img2 from "../assets/Imgg2.jpg";
import img3 from "../assets/Imgg3.jpg";
import img4 from "../assets/Img6.jpg";

const images = [img1, img2, img3, img4];

export default function ItinearyView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("itineraries")) || [];
    const found = saved.find((it) => it.id === Number(id));
    if (!found) {
      setItinerary(null);
    } else {
      setItinerary(found);
      // Random image if not already present
      setImage(found.image || images[Math.floor(Math.random() * images.length)]);
    }
  }, [id]);

  if (!itinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Itinerary Not Found</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <img
          src={image}
          alt="Itinerary"
          className="w-full h-64 object-cover rounded mb-4"
        />

        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {itinerary.title || itinerary.package_name || "Itinerary"}
        </h1>

        {itinerary.start_date && itinerary.end_date && (
          <p className="text-gray-700 mb-2">
            📅 {itinerary.start_date} to {itinerary.end_date} ({itinerary.days?.length || 1} days)
          </p>
        )}

        {itinerary.traveler && (
          <p className="text-gray-700 mb-4">👤 Traveler: {itinerary.traveler}</p>
        )}

        {/* ✅ Show description if present */}
        {itinerary.description && (
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Description:</h3>
            <p className="text-gray-700 whitespace-pre-line">{itinerary.description}</p>
          </div>
        )}

        {/* ✅ If structured days exist */}
        {itinerary.days?.length > 0 ? (
          itinerary.days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-6 border-b pb-4 last:border-b-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {day.day_name}, {day.date} - {day.summary}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {day.activities?.map((a, aIndex) => (
                  <li key={aIndex} className="flex items-start">
                    <span className="font-mono text-xs text-gray-500 mr-2 min-w-[60px]">
                      {a.time}
                    </span>
                    <div>
                      <strong className="text-gray-800">{a.activity}</strong>
                      <br />
                      <span className="text-gray-500">📍 {a.location}</span>
                      {a.notes && (
                        <div className="mt-1 text-xs italic text-gray-400">{a.notes}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          /* ✅ If no structured days, show extracted raw text */
          itinerary.raw_text && (
            <div className="p-4 bg-gray-50 rounded mt-4 max-h-[500px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Extracted Itinerary Details
              </h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {itinerary.raw_text}
              </pre>
            </div>
          )
        )}

        {itinerary.notes && itinerary.notes.length > 0 && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-500">
            <h5 className="font-medium mb-2">Additional Notes:</h5>
            <ul className="list-disc pl-5 space-y-1">
              {itinerary.notes.map((note, nIndex) => (
                <li key={nIndex}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>

  );
}
