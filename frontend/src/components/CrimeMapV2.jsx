
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  
} from "react-leaflet";

import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { districts } from "../data/districtSummary";

import L from "leaflet";
import "./Hotspot.css";

const highRiskHotspot = new L.DivIcon({
  html: '<div class="hotspot-high"></div>',
  className: "",
  iconSize: [35, 35],
});

const mediumRiskHotspot = new L.DivIcon({
  html: '<div class="hotspot-medium"></div>',
  className: "",
  iconSize: [35, 35],
});

const lowRiskHotspot = new L.DivIcon({
  html: '<div class="hotspot-low"></div>',
  className: "",
  iconSize: [35, 35],
});

const getRiskIcon = (risk) => {
  switch (risk.toLowerCase()) {
    case "high":
      return highRiskHotspot;

    case "medium":
      return mediumRiskHotspot;

    case "low":
      return lowRiskHotspot;

    default:
      return lowRiskHotspot;
  }
};

function ZoomWatcher({ setZoom }) {
  useMapEvents({
    zoomend: (event) => {
      setZoom(event.target.getZoom());
    },
  });

  return null;
}

function CrimeMapV2() {
    const [zoom, setZoom] = useState(7);
const [districtData] = useState({});
const alertMarkers = [
  {
    district: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    alert: "Crime Spike",
    severity: "Critical",
  },
  {
    district: "Mysuru",
    lat: 12.2958,
    lng: 76.6394,
    alert: "Vehicle Theft",
    severity: "Warning",
  },
];



  return (
    <MapContainer
    
      center={[13.2, 76.3]}
zoom={8}
      style={{ height: "600px", width: "100%" }}
    >
        <ZoomWatcher setZoom={setZoom} />
      <TileLayer
  attribution="&copy; OpenStreetMap contributors"
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

    {districts.map((district) => {
  const realData =
    districtData[district.district];

  return (
    
  <Marker
  key={district.district}
  position={[district.lat, district.lng]}
  eventHandlers={{
  dblclick: (e) => {
    e.target._map.flyTo(
      [district.lat, district.lng],
      14,
      {
        duration: 1.5,
      }
    );
  },
}}
    icon={
  zoom <= 9
    ? getRiskIcon(district.risk)
    : new L.DivIcon({
        html: `
          <div style="
            font-size:32px;
            line-height:32px;
          ">
            📍
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })
}
    
  >
   <Popup>
  <div style={{ minWidth: "250px" }}>

    <h3>
  {zoom <= 9
    ? district.district.toUpperCase() + " DISTRICT"
    : district.cities[0].toUpperCase()}
</h3>

    <hr />

    {zoom <= 9 ? (
      <>
        <b>Number of Cities</b>
        <br />
        {district.cities ? district.cities.length : 1}

        <br />
        <br />

        <b>Total Cases</b>
        <br />
        {realData?.cases || district.cases}

        <br />
        <br />

        <b>Risk Level</b>
        <br />
        {realData?.risk || district.risk}

        <br />
        <br />

        <b>Top Crime</b>
        <br />
        {realData?.topCrime || district.topCrime} ({realData?.topCrimeCases || district.topCrimeCases} cases)
      </>
    ) : (
      <>
        <b>Total Cases</b>
        <br />
        {realData?.cases || district.cases}

        <br />
        <br />

        <b>Risk Level</b>
        <br />
        {realData?.risk || district.risk}

        <br />
        <br />

        <b>Most Active Police Station</b>
        <br />
        {realData?.topPoliceStation || district.topPoliceStation}

        <br />
        <br />

        <b>Stations Involved</b>

        <ul>
          {(realData?.stations || district.stations).map((station, index) => (
            <li key={index}>
              {station.name} ({station.cases})
            </li>
          ))}
        </ul>

        <b>Crime Breakdown</b>

        <ul>
          {(realData?.crimeBreakdown || district.crimeBreakdown).map((crime, index) => (
            <li key={index}>
              {crime.crime} ({crime.cases})
            </li>
          ))}
        </ul>

        <b>Case Status</b>

        <ul>
          {(realData?.statusBreakdown || district.statusBreakdown).map((status, index) => (
            <li key={index}>
              {status.status} ({status.count})
            </li>
          ))}
        </ul>
      </>
    )}

  </div>
</Popup>
  </Marker>
    
  );
})}
{alertMarkers.map((alert) => (
  <Marker
    key={alert.district + "-alert"}
    position={[alert.lat, alert.lng]}
    icon={
      new L.DivIcon({
        html: `
          <div style="
            width:24px;
            height:24px;
            background:#dc2626;
            border-radius:50%;
            border:4px solid white;
            box-shadow:0 0 15px red;
            animation:pulse 1.2s infinite;
          "></div>
        `,
        className: "",
        iconSize: [24, 24],
      })
    }
  >
    <Popup>
      <h3>🚨 {alert.alert}</h3>

      <b>District:</b> {alert.district}

      <br />

      <b>Severity:</b> {alert.severity}
    </Popup>
  </Marker>
))}
    </MapContainer>
  );
}

export default CrimeMapV2;