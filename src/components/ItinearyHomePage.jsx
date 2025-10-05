import React, { useState, useEffect } from "react";
import ItineraryUpload from "./ItineraryUpload";
import Insight from "./Insights";
import dummyItineraryData from "../assets/Seed";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/Img1.jpg";
import img2 from "../assets/Imgg2.jpg";
import img3 from "../assets/Imgg3.jpg";
import img4 from "../assets/Img6.jpg";

const imageList = [img1, img2, img3, img4];

export default function ItineraryHomePage() {
    const navigate = useNavigate();
    const [expandedCards, setExpandedCards] = useState({});
    const [sortBy, setSortBy] = useState("score"); // default sort

    const [itineraries, setItineraries] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("itineraries"));
        if (saved && saved.length > 0) return saved;

        // fallback dummy
        return [
            {
                id: 1,
                ...dummyItineraryData,
                duration: dummyItineraryData.days?.length || 1,
                image: imageList[0],
            },
        ];
    });

    useEffect(() => {
        localStorage.setItem("itineraries", JSON.stringify(itineraries));
    }, [itineraries]);

    const addItinerary = (newItinerary) => {
        const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

        const finalItinerary = {
            ...newItinerary,
            id: Date.now(),
            duration: newItinerary.days?.length || 1,
            image: randomImage,
        };

        const updated = [...itineraries, finalItinerary];
        setItineraries(updated);
        localStorage.setItem("itineraries", JSON.stringify(updated));
    };

    const toggleExpand = (id) => {
        setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const getDuration = (it) => {
        if (it.duration) return parseInt(it.duration);
        if (!it.start_date || !it.end_date) return it.days?.length || 1;
        const start = new Date(it.start_date);
        const end = new Date(it.end_date);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    };

    const getValue = (it, key) => {
        switch (key) {
            case "cost":
                return parseFloat(it.total_cost || it.estimated_cost || 0);
            case "duration":
                return getDuration(it);
            case "activities":
                return it.activities?.length || 0;
            default:
                return 0;
        }
    };

    const sortedItineraries = [...itineraries].sort((a, b) => {
        if (sortBy === "score") return 0; // no sorting yet, natural order
        return getValue(a, sortBy) - getValue(b, sortBy);
    });

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            <div className="flex text-black justify-end items-center mb-4">

                <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="score">Best Overall (As Created)</option>
                        <option value="cost">Lowest Cost</option>
                        <option value="duration">Shortest Trip</option>
                        <option value="activities">Most Activities</option>
                    </select>
                </div>
            </div>


            <ItineraryUpload onAdd={addItinerary} />

            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {sortedItineraries.map((it) => {
                    const duration = getDuration(it);
                    const isExpanded = expandedCards[it.id] || false;

                    return (
                        <div
                            key={it.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    {it.title || it.package_name || `Itinerary ${it.id}`}
                                </h3>

                                {Object.entries(it).map(([key, value]) => {
                                    if (
                                        ["id", "image", "days", "notes", "raw_text", "description"].includes(
                                            key
                                        )
                                    )
                                        return null;
                                    if (typeof value !== "object") {
                                        return (
                                            <p key={key} className="text-gray-700 text-sm capitalize">
                                                {key.replaceAll("_", " ")}: {value}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}

                                {isExpanded && (
                                    <div className="mt-4 text-gray-700 text-sm leading-relaxed space-y-3">
                                        {it.description && (
                                            <p className="whitespace-pre-line">{it.description}</p>
                                        )}

                                        {!it.days && it.raw_text && (
                                            <div className="p-3 border rounded bg-gray-50 max-h-64 overflow-y-auto whitespace-pre-line">
                                                {it.raw_text}
                                            </div>
                                        )}

                                        {it.days?.map((day, idx) => (
                                            <div key={idx} className="mb-4 border-b pb-2">
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {day.day_name || `Day ${idx + 1}`} – {day.summary || ""}
                                                </h4>
                                                <ul className="text-sm text-gray-600">
                                                    {day.activities?.map((act, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="font-mono text-xs text-gray-500 mr-2 min-w-[60px]">
                                                                {act.time}
                                                            </span>
                                                            <div>
                                                                <strong className="text-gray-800">{act.activity}</strong>
                                                                <br />
                                                                <span className="text-gray-500">📍 {act.location}</span>
                                                                {act.notes && (
                                                                    <div className="mt-1 text-xs italic text-gray-400">
                                                                        {act.notes}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        {it.notes?.length > 0 && (
                                            <div className="mt-2 pt-2 border-t text-sm text-gray-500">
                                                <h5 className="font-medium mb-1">Additional Notes:</h5>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {it.notes.map((note, i) => (
                                                        <li key={i}>{note}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <Insight itinerary={it} />
                                    </div>
                                )}

                                {!isExpanded && it.raw_text && (
                                    <p className="text-gray-600 text-sm italic mt-2 line-clamp-3">
                                        {it.raw_text.slice(0, 100)}...
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                                    onClick={() => toggleExpand(it.id)}
                                >
                                    {isExpanded ? "Read Less" : "Read More"}
                                </button>

                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    onClick={() => navigate(`/view/${it.id}`)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
