const dummyItineraryData = {
  title: "Sample Weekend Getaway to Paris",
  start_date: "2025-10-04",
  end_date: "2025-10-06",
  traveler: "You",
  days: [
    {
      date: "2025-10-04",
      day_name: "Saturday",
      summary: "Arrival and exploration",
      activities: [
        {
          time: "08:00 AM",
          activity: "Flight arrival at Charles de Gaulle Airport",
          location: "CDG Airport",
          notes: "Pick up rental car or take RER train to city center",
        },
        {
          time: "10:00 AM",
          activity: "Check-in at hotel",
          location: "Le Marais District",
          notes: "Hotel: Hôtel de la Place des Vosges",
        },
        {
          time: "12:00 PM",
          activity: "Lunch at local café",
          location: "Place des Vosges",
          notes: "Try croque-monsieur and coffee",
        },
        {
          time: "02:00 PM",
          activity: "Visit Notre-Dame Cathedral",
          location: "Île de la Cité",
          notes: "Admire the Gothic architecture (exterior view)",
        },
        {
          time: "05:00 PM",
          activity: "Stroll along the Seine River",
          location: "River Seine Banks",
          notes: "Book lovers: Stop at Shakespeare and Company",
        },
        {
          time: "07:00 PM",
          activity: "Dinner at bistro",
          location: "Le Marais",
          notes: "Reserve at Chez Janou for Provençal cuisine",
        },
      ],
    },
    {
      date: "2025-10-05",
      day_name: "Sunday",
      summary: "Cultural immersion",
      activities: [
        {
          time: "09:00 AM",
          activity: "Breakfast at hotel",
          location: "Hôtel de la Place des Vosges",
          notes: "Fresh croissants and café au lait",
        },
        {
          time: "10:30 AM",
          activity: "Tour the Louvre Museum",
          location: "Louvre Pyramid",
          notes: "Focus on Mona Lisa and Venus de Milo; book timed entry",
        },
        {
          time: "02:00 PM",
          activity: "Picnic in Tuileries Garden",
          location: "Jardin des Tuileries",
          notes: "Grab baguettes, cheese, and wine from nearby market",
        },
        {
          time: "04:00 PM",
          activity: "Climb the Eiffel Tower",
          location: "Champ de Mars",
          notes: "Sunset views; advance tickets recommended",
        },
        {
          time: "08:00 PM",
          activity: "Evening cruise on the Seine",
          location: "Bateaux Parisiens",
          notes: "Includes dinner option with live music",
        },
      ],
    },
    {
      date: "2025-10-06",
      day_name: "Monday",
      summary: "Departure day",
      activities: [
        {
          time: "08:00 AM",
          activity: "Breakfast and checkout",
          location: "Hôtel de la Place des Vosges",
          notes: "Store luggage if needed",
        },
        {
          time: "09:30 AM",
          activity: "Visit Montmartre and Sacré-Cœur",
          location: "Montmartre Hill",
          notes: "Wander artist square and enjoy panoramic views",
        },
        {
          time: "12:00 PM",
          activity: "Quick lunch",
          location: "Montmartre",
          notes: "Crêpes at a street vendor",
        },
        {
          time: "01:00 PM",
          activity: "Head to airport",
          location: "CDG Airport",
          notes: "Allow 2 hours for travel and security",
        },
      ],
    },
  ],
  notes: [
    "Total estimated cost: €500-700 (excluding flights)",
    "Transportation: Metro pass recommended",
    "Weather in October: Mild, pack layers",
  ],
};

export default dummyItineraryData;
