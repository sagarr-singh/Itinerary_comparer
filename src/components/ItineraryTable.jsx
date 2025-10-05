import React from "react";

export default function ItineraryTable({ itineraries }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Comparison</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Cost ($)</th>
              <th className="px-4 py-2 border">Duration (days)</th>
              <th className="px-4 py-2 border">Activities</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.map((it) => (
              <tr key={it.id}>
                <td className="px-4 py-2 border">{it.title}</td>
                <td className="px-4 py-2 border">{it.cost}</td>
                <td className="px-4 py-2 border">{it.duration}</td>
                <td className="px-4 py-2 border">
                  {it.activities.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
