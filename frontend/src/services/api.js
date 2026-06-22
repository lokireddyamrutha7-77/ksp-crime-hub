
const API_BASE = "http://127.0.0.1:8000";

export const getStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
};

export const getHotspots = async () => {
  const res = await fetch(`${API_BASE}/hotspots`);
  return res.json();
};

export const getDistrictCrime = async (district) => {
  const res = await fetch(
    `${API_BASE}/crimes/district/${district}`
  );
  return res.json();
};

export const getDistricts = async () => {
  const res = await fetch(`${API_BASE}/districts`);
  return res.json();
};