import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

function VoiceFIR() {
  const [isRecording, setIsRecording] = useState(false);
const [seconds, setSeconds] = useState(0);
const [transcript, setTranscript] = useState("");
const [fir, setFir] = useState(null);


  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const generateFIR = () => {
  if (!transcript.trim()) return;

  setFir({
    complainant: "Ramesh Kumar",
    accused: "Unknown Person",
    incident:
      "Motorcycle theft near MG Road, Bengaluru at 8:30 PM.",
    sections: "IPC 379 (Theft)",
    evidence: "Nearby CCTV footage available",
  });
};

const downloadPDF = () => {
  if (!fir) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("KARNATAKA STATE POLICE", 20, 20);

  doc.setFontSize(16);
  doc.text("FIRST INFORMATION REPORT (FIR)", 20, 35);

  doc.setFontSize(12);

  doc.text(`Complainant: ${fir.complainant}`, 20, 55);
  doc.text(`Accused: ${fir.accused}`, 20, 70);
  doc.text(`Incident: ${fir.incident}`, 20, 85);
  doc.text(`Sections: ${fir.sections}`, 20, 100);
  doc.text(`Evidence: ${fir.evidence}`, 20, 115);

  doc.save("FIR.pdf");
};

  return (
    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h1>🎤 Voice FIR Generator</h1>

      <p style={{ color: "#64748b" }}>
        Speak the complaint naturally. The system will convert it into an FIR.
      </p>

      {/* Recording Card */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "25px",
          marginTop: "25px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2>
  {String(Math.floor(seconds / 60)).padStart(2, "0")}:
  {String(seconds % 60).padStart(2, "0")}
</h2>

        <button
         onClick={() => {
  if (!isRecording) {
    setSeconds(0);
    setTranscript("");
    setIsRecording(true);
  } else {
    setIsRecording(false);

    setTranscript(
      "Yesterday around 8:30 PM, the complainant reported that an unknown person stole his motorcycle near MG Road, Bengaluru. CCTV footage is available."
    );
  }
}}
          style={{
            padding: "15px 35px",
            border: "none",
            borderRadius: "10px",
            background: isRecording ? "#dc2626" : "#16a34a",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
        </button>
      </div>

      {/* Transcript */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "25px",
          marginTop: "25px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📝 Transcribed Text</h2>

        <textarea
  rows={6}
  value={transcript}
  onChange={(e) => setTranscript(e.target.value)}
  placeholder="Recorded speech will appear here..."
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    resize: "none",
  }}
/>
      </div>

      {/* FIR */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "25px",
          marginTop: "25px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📄 Generated FIR</h2>

        <button
  onClick={generateFIR}
  style={{
    marginTop: "15px",
    padding: "12px 30px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  📄 Generate FIR
</button>
{fir && (
  <div
    style={{
      marginTop: "30px",
      padding: "20px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
      background: "#f8fafc",
    }}
  >
    <h3>Generated FIR</h3>

    <p><strong>Complainant:</strong> {fir.complainant}</p>

    <p><strong>Accused:</strong> {fir.accused}</p>

    <p><strong>Incident:</strong> {fir.incident}</p>

    <p><strong>Sections:</strong> {fir.sections}</p>

    <p><strong>Evidence:</strong> {fir.evidence}</p>
  </div>
)}

        <br />
        <br />

        <button
  onClick={downloadPDF}
  style={{
    padding: "12px 30px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "20px",
  }}
>
  ⬇ Download PDF
</button>
      </div>
    </div>
  );
}

export default VoiceFIR;