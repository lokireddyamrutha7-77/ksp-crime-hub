import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function NetworkGraph() {
  const svgRef = useRef();
const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState({
    id: "Suspect A",
    district: "Mysuru",
    crime: "Cyber Fraud",
    risk: "High",
    connections: 3,
  });

  useEffect(() => {
  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove();

  const nodes = [
    {
      id: "Suspect A",
      x: 500,
      y: 250,
      type: "suspect",
      district: "Mysuru",
      crime: "Cyber Fraud",
      risk: "High",
      connections: 3,
    },

    {
      id: "Cyber Fraud",
      x: 500,
      y: 100,
      type: "crime",
    },

    {
      id: "Phone Records",
      x: 250,
      y: 250,
      type: "evidence",
    },

    {
      id: "Mysuru",
      x: 750,
      y: 250,
      type: "district",
    },

    {
      id: "Suspect B",
      x: 500,
      y: 420,
      type: "suspect",
      district: "Mandya",
      crime: "Drug Trafficking",
      risk: "Medium",
      connections: 3,
    },

    {
      id: "Drug Trafficking",
      x: 500,
      y: 540,
      type: "crime",
    },

    {
      id: "Bank Transactions",
      x: 750,
      y: 420,
      type: "evidence",
    },

    {
      id: "Mandya",
      x: 250,
      y: 420,
      type: "district",
    },
    
  ];
  const suspectMatch = nodes.find(
  (node) =>
    node.type === "suspect" &&
    node.id.toLowerCase().includes(searchTerm.toLowerCase())
);

if (suspectMatch) {
  setSelectedNode(suspectMatch);
}

  const links = [
  ["Suspect A", "Cyber Fraud"],
  ["Suspect A", "Phone Records"],
  ["Suspect A", "Mysuru"],

  ["Suspect B", "Drug Trafficking"],
  ["Suspect B", "Bank Transactions"],
  ["Suspect B", "Mandya"],

  ["Suspect A", "Suspect B"],

  ["Mysuru", "Mandya"]   // <-- add this line
];

  const getNode = (id) =>
    nodes.find((n) => n.id === id);

  const getColor = (type) => {
    switch (type) {
      case "suspect":
        return "#0ea5e9";

      case "district":
        return "#64748b";

      case "crime":
        return "#f59e0b";

      case "evidence":
        return "#10b981";

      default:
        return "#94a3b8";
    }
  };

  svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("x1", (d) => getNode(d[0]).x)
    .attr("y1", (d) => getNode(d[0]).y)
    .attr("x2", (d) => getNode(d[1]).x)
    .attr("y2", (d) => getNode(d[1]).y)
    .attr("stroke", "#475569")
    .attr("stroke-width", 2);

  const nodeGroup = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d) => `translate(${d.x},${d.y})`
    );

  nodeGroup
    .append("circle")
    .attr("r", d =>
  d.type === "suspect" ? 34 : 26
)
    .attr("fill", (d) => getColor(d.type))
    .style("cursor", "pointer");

  nodeGroup
    .append("text")
    .text((d) => d.id)
    .attr("x", 35)
    .attr("y", 5)
    .style("fill", "white")
    .style("font-size", d =>
  d.type === "suspect" ? "16px" : "13px"
)
    .style("font-weight", "600");

  nodeGroup.on("click", (event, d) => {
    if (d.type === "suspect") {
      setSelectedNode(d);
    }
  });
}, [searchTerm]);
  const cardStyle = {
  background: "white",
  color: "#0f172a",
    padding: "20px",
    borderRadius: "16px",
    minWidth: "220px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  };

  return (
  <div
    style={{
      background: "#f1f5f9",
      minHeight: "100vh",
      padding: "25px",
      color: "#0f172a",
    }}
  >
    <div style={{ marginBottom: "30px" }}>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
    }}
  >
    <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
      Criminal Network Analysis
    </h1>

    <input
      type="text"
      placeholder="🔍 Search Suspect..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
        width: "280px",
        fontSize: "15px",
        outline: "none",
        background: "white",
      }}
    />
  </div>

  <p
    style={{
      color: "#475569",
      fontSize: "18px",
    }}
  >
    Visualize relationships between suspects, crimes,
    districts and evidence.
  </p>
</div>

    {/* Stats Cards */}

    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}
    >
      <div style={cardStyle}>
        <h3>Total Suspects</h3>
        <h2>52</h2>
      </div>

      <div style={cardStyle}>
        <h3>Active Networks</h3>
        <h2>14</h2>
      </div>

      <div style={cardStyle}>
        <h3>High Risk Links</h3>
        <h2>7</h2>
      </div>

      <div style={cardStyle}>
        <h3>Evidence Sources</h3>
        <h2>126</h2>
      </div>
    </div>

    {/* Graph + Right Panel */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "20px",
        alignItems: "start",
      }}
    >
      {/* Graph */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Network Graph
        </h2>

        <svg
          ref={svgRef}
          width="900"
          height="650"
          style={{
            background: "#0f172a",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        />
      </div>

      {/* Details Card */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "sticky",
          top: "20px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#0ea5e9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          👤
        </div>

        <h3>Selected Node Details</h3>

        <hr />

        <p>
          <b>Name:</b> {selectedNode?.id}
        </p>

        <p>
          <b>District:</b> {selectedNode?.district}
        </p>

        <p>
          <b>Crime:</b> {selectedNode?.crime}
        </p>

        <p>
          <b>Risk Level:</b>

          <span
            style={{
              marginLeft: "10px",
              background:
                selectedNode?.risk === "High"
                  ? "#dc2626"
                  : "#f59e0b",
              color: "white",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "12px",
            }}
          >
            {selectedNode?.risk}
          </span>
        </p>

        <p>
          <b>Connections:</b>{" "}
          {selectedNode?.connections}
        </p>

        <p>
          <b>Status:</b> Active Investigation
        </p>

        <p>
          <b>Last Seen:</b> 21-Jun-2026
        </p>

        <hr />

        <h4>Legend</h4>

        <p>🔵 Suspect</p>
        <p>⚫ District</p>
        <p>🟠 Crime Type</p>
        <p>🟢 Evidence Source</p>
      </div>
          {/* Investigation Timeline */}

    <div
      style={{
        marginTop: "25px",
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2>Investigation Timeline</h2>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          <b>21-Jun-2026</b> — Cyber Fraud linked to Suspect A
        </div>

        <div>
          <b>20-Jun-2026</b> — Phone Records Added
        </div>

        <div>
          <b>18-Jun-2026</b> — New FIR Registered
        </div>

        <div>
          <b>15-Jun-2026</b> — Bank Transaction Flagged
        </div>

        <div>
          <b>12-Jun-2026</b> — Suspect B added to watchlist
        </div>
      </div>
    </div>
    </div>
  </div>
);
}
export default NetworkGraph;