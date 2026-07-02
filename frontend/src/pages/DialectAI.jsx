import { useState } from "react";

function DialectAI() {
  const [selectedLanguage, setSelectedLanguage] = useState("Kannada");
const [isRecording, setIsRecording] = useState(false);
const [transcript, setTranscript] = useState("");
  const languageData = {
  Kannada: {
    crime_type: "Mobile Theft",
    district: "Bengaluru",
    severity: "High",
  },

  Tulu: {
    crime_type: "Chain Snatching",
    district: "Mangaluru",
    severity: "Medium",
  },

  Kodava: {
    crime_type: "Illegal Hunting",
    district: "Kodagu",
    severity: "Medium",
  },

  Urdu: {
    crime_type: "Cyber Fraud",
    district: "Kalaburagi",
    severity: "High",
  },

  "Hindi-Kannada": {
    crime_type: "Vehicle Theft",
    district: "Hubballi",
    severity: "Low",
  },
};

const result = languageData[selectedLanguage];
  const handleRecording = () => {
  if (!isRecording) {
    setIsRecording(true);

    setTimeout(() => {
      if (selectedLanguage === "Kannada") {
  setTranscript("ಬೈಕ್ ಕಳ್ಳತನ ಬೆಂಗಳೂರು ಎಂ.ಜಿ ರಸ್ತೆಯಲ್ಲಿ ವರದಿಯಾಗಿದೆ.");
}

else if (selectedLanguage === "Tulu") {
  setTranscript("Bike kadd malpundu Mangaluru da.");
}

else if (selectedLanguage === "Kodava") {
  setTranscript("Kodagu alli bike theft report aitu.");
}

else if (selectedLanguage === "Urdu") {
  setTranscript("موٹر سائیکل چوری کی اطلاع ملی ہے۔");
}

else {
  setTranscript("Bike theft reported near Hubballi.");
}
      setIsRecording(false);
    }, 3000);
  }
};

  return (
    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h1>🌐 Dialect AI</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Detect Karnataka dialects and convert speech into structured crime
        information.
      </p>

      {/* Language Cards */}

      <h2>Select Language</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "35px",
        }}
      >
        {[
          "Kannada",
          "Tulu",
          "Kodava",
          "Urdu",
          "Hindi-Kannada",
        ].map((language) => (
          <div
            key={language}
            onClick={() => setSelectedLanguage(language)}
            style={{
              width: "170px",
              padding: "20px",
              borderRadius: "12px",
              cursor: "pointer",
              background:
                selectedLanguage === language
                  ? "#2563eb"
                  : "white",
              color:
                selectedLanguage === language
                  ? "white"
                  : "black",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {language}
          </div>
        ))}
      </div>

      {/* Detection Result */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "25px",
          marginBottom: "30px",
          boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Detected Language</h2>

        <h1
          style={{
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          {selectedLanguage}
        </h1>

        <p
          style={{
            color: "#16a34a",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          94% Confidence
        </p>
      </div>

      {/* Structured Output */}

      <h2 style={{ marginBottom: "20px" }}>
        Structured Output
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h3>🚔 Crime Type</h3>
          <p>{result.crime_type}</p>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h3>📍 District</h3>
          <p>{result.district}</p>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h3>⚠️ Severity</h3>
          <p>{result.severity}</p>
        </div>
      </div>
      {/* Voice Input */}

<div
  style={{
    marginTop: "40px",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
  }}
>
  <h2>🎤 Voice Input</h2>

  <button
    onClick={handleRecording}
    disabled={isRecording}
    style={{
      padding: "14px 28px",
      background: isRecording ? "#dc2626" : "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "15px",
    }}
  >
    {isRecording ? "Recording..." : "Start Recording"}
  </button>

  <textarea
    value={transcript}
    readOnly
    placeholder="Detected speech will appear here..."
    style={{
      width: "100%",
      height: "120px",
      marginTop: "20px",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      fontSize: "15px",
    }}
  />
</div>
    </div>
  );
}

export default DialectAI;