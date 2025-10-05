import React from "react";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">About Itinerary Comparer</h1>
            <p className="text-gray-700 mb-3">
                The Itinerary Comparer is a front-end React application designed to help travelers compare multiple travel itineraries easily. You can:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-3">
                <li>Upload or paste 2 - 3 itineraries in JSON format or via a form.</li>
                <li>View each itinerary in clean cards.</li>
                <li>Compare key metrics: total cost, total duration, and number of activities.</li>
                <li>Get a calculated score and insights for each itinerary.</li>
            </ul>
            <p className="text-gray-700">
                This app is a front-end prototype. In a full application, we could integrate a backend for storing itineraries, user authentication, PDF parsing, and advanced analytics for trip optimization.
            </p>
        </div>
    );
}
