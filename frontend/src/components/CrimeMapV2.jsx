
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
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
function DoubleClickZoom({ position }) {
  const map = useMap();

  return (
    <Marker
      position={position}
      eventHandlers={{
        dblclick: () => {
          map.setView(position, 11, {
            animate: true,
          });
        },
      }}
      opacity={0}
    />
  );
}

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
  return (
    <MapContainer
    
      center={[15.3173, 75.7139]}
      zoom={7}
      style={{ height: "600px", width: "100%" }}
    >
        <ZoomWatcher setZoom={setZoom} />
      <TileLayer
  attribution="&copy; OpenStreetMap contributors"
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

      {districts.map((district) => (
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
        {district.cases}

        <br />
        <br />

        <b>Risk Level</b>
        <br />
        {district.risk}

        <br />
        <br />

        <b>Top Crime</b>
        <br />
        {district.topCrime} ({district.topCrimeCases} cases)
      </>
    ) : (
      <>
        <b>Total Cases</b>
        <br />
        {district.cases}

        <br />
        <br />

        <b>Risk Level</b>
        <br />
        {district.risk}

        <br />
        <br />

        <b>Most Active Police Station</b>
        <br />
        {district.topPoliceStation}

        <br />
        <br />

        <b>Stations Involved</b>

        <ul>
          {district.stations.map((station, index) => (
            <li key={index}>
              {station.name} ({station.cases})
            </li>
          ))}
        </ul>

        <b>Crime Breakdown</b>

        <ul>
          {district.crimeBreakdown.map((crime, index) => (
            <li key={index}>
              {crime.crime} ({crime.cases})
            </li>
          ))}
        </ul>

        <b>Case Status</b>

        <ul>
          {district.statusBreakdown.map((status, index) => (
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
))}
    </MapContainer>
  );
}

export default CrimeMapV2;