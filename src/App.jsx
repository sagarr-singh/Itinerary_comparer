import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About.jsx";
import TRIP from "./assets/trip logo.jpg";
import ItineraryView from "./pages/ItinearyView.jsx";
import ItineraryHomePage from "./components/ItinearyHomePage.jsx";

export default function App() {

  const [itineraries, setItineraries] = useState([]);


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md w-full flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <a href="/">
            <img
              src={TRIP}
              alt="TRIP Logo"
              className="h-20 w-20 object-contain mr-9"
            />
          </a>
        </div>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-800">
          Itinerary Comparer
        </h1>

        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-3 py-1 rounded text-gray-700 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-3 py-1 rounded text-gray-700 hover:bg-gray-200"
          >
            About
          </Link>
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<ItineraryHomePage />} />
          <Route
            path="/"
            element={<ItineraryHomePage itineraries={itineraries} setItineraries={setItineraries} />}
          />
          <Route
            path="/view/:id"
            element={<ItineraryView itineraries={itineraries} />}
          />
          <Route
            path="about"
            element=<About />
          />
        </Routes>
      </main>
    </div>
  );
}
