import { useState } from "react";

function SketchWitness() {
  const [description, setDescription] = useState("");
  const [sketch, setSketch] = useState(null);

  const handleVoiceInput = () => {
    setDescription(
      "Male around 30 years old, medium build, black hair, beard, wearing a blue shirt."
    );
  };

  const handleGenerateSketch = () => {
    // Dummy image for frontend testing
    setSketch("https://placehold.co/400x500?text=Generated+Sketch");
  };

  const handleDownload = () => {
    if (!sketch) return;

    const link = document.createElement("a");
    link.href = sketch;
    link.download = "suspect-sketch.png";
    link.click();
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h1>🖼️ Sketch Witness AI</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Generate a suspect sketch from a witness description.
      </p>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}

        <div
          style={{
            flex: 1,
            minWidth: "350px",
          }}
          
        >
            <h1
  style={{
    fontSize: "38px",
    marginBottom: "10px",
  }}
>
  🖼️ Sketch Witness AI
</h1>

<p
  style={{
    color: "#64748b",
    marginBottom: "30px",
  }}
>
  Generate suspect sketches using witness descriptions and AI.
</p>
          <h2>Witness Description</h2>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type the witness description here..."
            style={{
              width: "100%",
              height: "220px",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
            }}
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleVoiceInput}
              style={{
                padding: "12px 22px",
                border: "none",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                cursor: "pointer",
              }}
            >
              🎤 Voice Input
            </button>

            <button
              onClick={handleGenerateSketch}
              style={{
                padding: "12px 22px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              🖼️ Generate Sketch
            </button>
          </div>
        </div>

        {/* Right Side */}

        <div
          style={{
            flex: 1,
            minWidth: "350px",
          }}
        >
          <h2>Generated Sketch</h2>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              minHeight: "520px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            {sketch ? (
              <img
                src={sketch}
                alt="Generated Sketch"
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <p>No sketch generated yet.</p>
            )}
          </div>

          <button
            onClick={handleDownload}
            disabled={!sketch}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: sketch ? "#0ea5e9" : "#94a3b8",
              color: "white",
              cursor: sketch ? "pointer" : "not-allowed",
            }}
          >
            ⬇️ Download Sketch
          </button>
        </div>
      </div>
    </div>
  );
}

export default SketchWitness;