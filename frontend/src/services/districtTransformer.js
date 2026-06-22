export function transformDistrictData(crimes) {
  if (!crimes || crimes.length === 0) {
    return {
      cases: 0,
      risk: "low",
      topCrime: "N/A",
      cities: [],
      stations: [],
      crimeBreakdown: [],
      statusBreakdown: []
    };
  }

  const totalCases = crimes.length;

  // Crime Counts
  const crimeCounts = {};

  crimes.forEach((crime) => {
    crimeCounts[crime.crime_type] =
      (crimeCounts[crime.crime_type] || 0) + 1;
  });

  const topCrime = Object.keys(crimeCounts).reduce((a, b) =>
    crimeCounts[a] > crimeCounts[b] ? a : b
  );

  const crimeBreakdown = Object.entries(crimeCounts).map(
    ([crime, cases]) => ({
      crime,
      cases
    })
  );

  // Status Counts
  const statusCounts = {};

  crimes.forEach((crime) => {
    statusCounts[crime.status] =
      (statusCounts[crime.status] || 0) + 1;
  });

  const statusBreakdown = Object.entries(statusCounts).map(
    ([status, count]) => ({
      status,
      count
    })
  );

  // Cities
  const cities = [
    ...new Set(crimes.map((c) => c.city))
  ];

  // Police Stations
  const stationCounts = {};

  crimes.forEach((crime) => {
    stationCounts[crime.police_station] =
      (stationCounts[crime.police_station] || 0) + 1;
  });

  const stations = Object.entries(stationCounts)
    .map(([name, cases]) => ({
      name,
      cases
    }))
    .sort((a, b) => b.cases - a.cases);

  // Risk Level
  let risk = "low";

  if (totalCases > 300) {
    risk = "high";
  } else if (totalCases > 150) {
    risk = "medium";
  }

  return {
    cases: totalCases,
    risk,
    topCrime,
    cities,
    stations,
    crimeBreakdown,
    statusBreakdown
  };
}