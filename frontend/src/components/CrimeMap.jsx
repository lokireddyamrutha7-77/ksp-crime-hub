import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

function CrimeMap() {
  return (
    <MapContainer
      center={[15.3173, 75.7139]}
      zoom={7}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Bengaluru - High Risk */}
      <Marker
        position={[12.9716, 77.5946]}
        icon={highRiskHotspot}
      >
        <Popup>
          <b>District:</b> Bengaluru Urban
          <br />
          <b>Risk Level:</b> High 🔴
          <br />
          <b>Total Cases:</b> 245
        </Popup>
      </Marker>

      {/* Mysuru - Medium Risk */}
      <Marker
        position={[12.2958, 76.6394]}
        icon={mediumRiskHotspot}
      >
        <Popup>
          <b>District:</b> Mysuru
          <br />
          <b>Risk Level:</b> Medium 🟠
          <br />
          <b>Total Cases:</b> 85
        </Popup>
      </Marker>

      {/* Hubballi - Low Risk */}
      <Marker
        position={[15.3647, 75.1240]}
        icon={lowRiskHotspot}
      >
        <Popup>
          <b>District:</b> Hubballi
          <br />
          <b>Risk Level:</b> Low 🟡
          <br />
          <b>Total Cases:</b> 40
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default CrimeMap;