import React from "react";

export default function Insight({ itinerary }) {
  // --- Extract cost (supports estimated / total / price) ---
  const extractCost = (it) => {
    // Case 1: Directly available cost fields
    if (it.total_cost) return parseFloat(it.total_cost);
    if (it.estimated_cost) {
      const num = String(it.estimated_cost).replace(/[^0-9.]/g, ""); // remove '$' or commas
      return parseFloat(num);
    }

    // Case 2: detect from text (estimated cost, total cost, etc.)
    const textSources = [
      it.notes?.join(" ") || "",
      it.description || "",
      it.title || "",
      it.package_name || "",
    ].join(" ");

    const match = textSources.match(
      /(?:estimated_cost|total\s*cost|package\s*rate|cost|price)\s*[:=\-]?\s*(?:Rs\.?\s*|\$)?([\d,]+)/i
    );

    if (match) return parseFloat(match[1].replace(/,/g, ""));
    return 0;
  };


  // --- Extract duration ---
  const extractDuration = (it) => {
    if (typeof it.duration === "number") return it.duration;
    if (typeof it.duration === "string") {
      const match = it.duration.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return 0;
  };

  // --- Extract activities ---
  const extractActivities = (it) => {
    const fromArray = it.activities?.length || 0;
    const fromObj = it.number_of_activities || 0;
    const fromDays =
      it.days?.reduce((acc, d) => acc + (d.activities?.length || 0), 0) || 0;
    return Math.max(fromArray, fromObj, fromDays);
  };

  // --- Calculate score ---
  const calcScore = (it) => {
    let score = 50;
    let rationale = [];

    const cost = extractCost(it);
    const durationDays = extractDuration(it);
    const totalActivities = extractActivities(it);

    // Cost scoring
    if (cost > 0) {
      if (cost < 20000) {
        score += 20;
        rationale.push(`Cost ₹${cost} — budget-friendly.`);
      } else if (cost < 40000) {
        score += 10;
        rationale.push(`Cost ₹${cost} — reasonably priced.`);
      } else {
        score -= 10;
        rationale.push(`Cost ₹${cost} — slightly expensive.`);
      }
    } else {
      rationale.push("Cost not available.");
    }

    // Duration scoring
    if (durationDays > 0) {
      if (durationDays >= 5 && durationDays <= 7) {
        score += 15;
        rationale.push(`Duration ${durationDays} days — ideal trip length.`);
      } else if (durationDays > 7 && durationDays <= 10) {
        score += 10;
        rationale.push(`Duration ${durationDays} days — extended trip.`);
      } else {
        score += 5;
        rationale.push(`Duration ${durationDays} days — short getaway.`);
      }
    } else {
      rationale.push("Duration not specified.");
    }

    // activity scoring
    if (totalActivities > 0) {
      const actBonus =
        totalActivities >= 5 ? 20 : totalActivities >= 3 ? 15 : 10;
      score += actBonus;
      rationale.push(`${totalActivities} activities planned — good engagement.`);
    } else {
      rationale.push("Activities not listed.");
    }

    // Clamp score between 0–100
    score = Math.max(0, Math.min(100, score));

    return { score, rationale };
  };

  const { score, rationale } = calcScore(itinerary);

  return (
    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <span className="font-semibold text-gray-800">Score: {score}/100</span>
      <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
        {rationale.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
