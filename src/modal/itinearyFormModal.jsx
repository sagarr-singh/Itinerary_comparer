import React, { useState } from "react";

export default function ItineraryFormModal({ onAdd, onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        traveler: "",
        start_date: "",
        end_date: "",
        description: "",
        estimated_cost: "",
        notes: "",
        days: [], 
    });
    ``
    const [currentDay, setCurrentDay] = useState({
        date: "",
        day_name: "",
        summary: "",
        activities: [{ time: "", activity: "", location: "", notes: "" }],
    });

    const addDay = () => {
        if (!currentDay.date || !currentDay.summary) {
            alert("Fill date and summary for the day");
            return;
        }
        setFormData({
            ...formData,
            days: [...formData.days, { ...currentDay }],
        });
        setCurrentDay({
            date: "",
            day_name: "",
            summary: "",
            activities: [{ time: "", activity: "", location: "", notes: "" }],
        });
    };

    const addActivityToDay = () => {
        setCurrentDay({
            ...currentDay,
            activities: [...currentDay.activities, { time: "", activity: "", location: "", notes: "" }],
        });
    };

    const updateActivity = (index, field, value) => {
        const newActivities = [...currentDay.activities];
        newActivities[index] = { ...newActivities[index], [field]: value };
        setCurrentDay({ ...currentDay, activities: newActivities });
    };

    const removeActivity = (index) => {
        const newActivities = currentDay.activities.filter((_, i) => i !== index);
        setCurrentDay({ ...currentDay, activities: newActivities });
    };

    const removeDay = (index) => {
        const newDays = formData.days.filter((_, i) => i !== index);
        setFormData({ ...formData, days: newDays });
    };

    const handleAddForm = () => {
        if (!formData.title || !formData.start_date || formData.days.length === 0) {
            alert("Fill title, start date, and at least one day");
            return;
        }

        const existing = JSON.parse(localStorage.getItem("itineraries")) || [];
        const newId = existing.length ? existing[existing.length - 1].id + 1 : 1;

        const newItinerary = {
            id: newId,
            ...formData,
            traveler: formData.traveler || "You",
            notes: formData.notes
                ? formData.notes.split("\n").filter((n) => n.trim()).map((n) => n.trim())
                : [`Total estimated cost: ${formData.estimated_cost || "Not specified"}`],
        };

        localStorage.setItem("itineraries", JSON.stringify([...existing, newItinerary]));

        onAdd(newItinerary);

        setFormData({
            title: "",
            traveler: "",
            start_date: "",
            end_date: "",
            description: "",
            estimated_cost: "",
            notes: "",
            days: [],
        });

        setCurrentDay({
            date: "",
            day_name: "",
            summary: "",
            activities: [{ time: "", activity: "", location: "", notes: "" }],
        });

        onClose();
    };


    return (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto p-4 backdrop-blur-sm">
            <div className="relative bg-blue-300 text-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-300">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-200 hover:text-gray-200 font-bold"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-6">Add Itinerary via Form</h2>



                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Title (e.g., Weekend Getaway to Paris)"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Traveler (e.g., You)"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.traveler}
                        onChange={(e) => setFormData({ ...formData, traveler: e.target.value })}
                    />
                    <input
                        type="date"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                    <input
                        type="date"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        placeholder="Overall trip description..."
                        className="w-full border rounded p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Estimated Cost */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Estimated Cost</label>
                    <input
                        type="text"
                        placeholder="€500-700 (excluding flights)"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.estimated_cost}
                        onChange={(e) => setFormData({ ...formData, estimated_cost: e.target.value })}
                    />
                </div>

                {/* Notes */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Notes (one per line)</label>
                    <textarea
                        placeholder="e.g., Transportation: Metro pass recommended"
                        className="w-full border rounded p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                {/* Days Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-black">Days</h3>

                    {formData.days.map((day, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded border mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">
                                    Day {i + 1}: {day.date} – {day.summary}
                                </h4>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700 text-sm"
                                    onClick={() => removeDay(i)}
                                >
                                    Remove Day
                                </button>
                            </div>
                            <ul className="space-y-2 text-sm">
                                {day.activities.map((act, j) => (
                                    <li key={j} className="flex space-x-2">
                                        <span className="font-mono text-xs">{act.time}</span>
                                        <span>{act.activity} – {act.location}</span>
                                        {act.notes && <span className="italic text-gray-500">({act.notes})</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="bg-blue-300 p-4 rounded border">
                        <h4 className="font-medium mb-2">Add New Day</h4>
                        <div className="grid md:grid-cols-2 gap-2 mb-2">
                            <input
                                type="date"
                                className="border rounded p-1 text-sm"
                                value={currentDay.date}
                                onChange={(e) => setCurrentDay({ ...currentDay, date: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Day Name (e.g., Saturday)"
                                className="border rounded p-1 text-sm"
                                value={currentDay.day_name}
                                onChange={(e) => setCurrentDay({ ...currentDay, day_name: e.target.value })}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Summary (e.g., Arrival and exploration)"
                            className="w-full border rounded p-1 mb-2 text-sm"
                            value={currentDay.summary}
                            onChange={(e) => setCurrentDay({ ...currentDay, summary: e.target.value })}
                        />

                        {/* Activities */}
                        <h5 className="text-sm font-medium mb-1">Activities</h5>
                        {currentDay.activities.map((act, j) => (
                            <div key={j} className="flex space-x-1 mb-1">
                                <input
                                    type="text"
                                    placeholder="Time"
                                    className="flex-1 border rounded p-1 text-xs"
                                    value={act.time}
                                    onChange={(e) => updateActivity(j, "time", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Activity"
                                    className="flex-2 border rounded p-1 text-xs"
                                    value={act.activity}
                                    onChange={(e) => updateActivity(j, "activity", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="flex-2 border rounded p-1 text-xs"
                                    value={act.location}
                                    onChange={(e) => updateActivity(j, "location", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Notes"
                                    className="flex-2 border rounded p-1 text-xs"
                                    value={act.notes}
                                    onChange={(e) => updateActivity(j, "notes", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className= "text-gray-200 hover:text-gray-200 font-bold px-1"
                                    onClick={() => removeActivity(j)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <div className="mt-2 space-x-3">
                            <button
                                type="button"
                                className="text-xs text-blue-500 hover:text-blue-700"
                                onClick={addActivityToDay}
                            >
                                + Add Activity
                            </button>
                            <button
                                type="button"
                                className="text-xs text-green-500 hover:text-green-700"
                                onClick={addDay}
                            >
                                + Add Day
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={handleAddForm}
                    >
                        Add Itinerary
                    </button>
                </div>
            </div>
        </div>
    );
}