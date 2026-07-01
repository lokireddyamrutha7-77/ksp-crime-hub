import { useState, useEffect, useRef } from "react";

function AIInvestigator() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
  {
    sender: "ai",
    text:
      "👮 Welcome Officer.\n\nI'm your AI CrimeZero Assistant.\n\nI can help with:\n• FIRs\n• Suspects\n• Crime Hotspots\n• District Statistics",
  },
]);

  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef(null);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);
  const englishSuggestions = [
  "Highest crime district",
  "Show cybercrime hotspots",
  "Top repeat offenders",
  "Pending FIR statistics",
  "Most wanted suspects",
];

const kannadaSuggestions = [
  "ಹೆಚ್ಚು ಅಪರಾಧಗಳ ಜಿಲ್ಲೆ",
  "ಸೈಬರ್ ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",
  "ಪುನರಾವರ್ತಿತ ಅಪರಾಧಿಗಳು",
  "ಬಾಕಿ ಇರುವ FIR ಅಂಕಿಅಂಶಗಳು",
  "ಅತೀ ಹೆಚ್ಚು ಬೇಕಾಗಿರುವ ಶಂಕಿತರು",
];

const suggestions =
  language === "en"
    ? englishSuggestions
    : kannadaSuggestions;

  const sendMessage = (text) => {
    const userQuestion = text || question;

    if (!userQuestion.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      let answer =
  language === "en"
    ? "I couldn't find an exact answer. Try asking about theft, cybercrime, FIRs, repeat offenders, hotspots or high-risk districts."
    : "ನಿಖರವಾದ ಉತ್ತರ ಸಿಗಲಿಲ್ಲ. ಕಳ್ಳತನ, ಸೈಬರ್ ಅಪರಾಧ, FIRಗಳು, ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು ಅಥವಾ ಹೆಚ್ಚಿನ ಅಪಾಯದ ಜಿಲ್ಲೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.";

      if (userQuestion.toLowerCase().includes("theft")) {
  answer =
    language === "en"
      ? "Bengaluru currently reports the highest number of theft cases."
      : "ಬೆಂಗಳೂರುದಲ್ಲಿ ಪ್ರಸ್ತುತ ಅತ್ಯಧಿಕ ಕಳ್ಳತನ ಪ್ರಕರಣಗಳು ದಾಖಲಾಗಿವೆ.";
}

      else if (userQuestion.includes("cyber")) {
        answer =
          "Cybercrime hotspots include Bengaluru, Mysuru and Hubballi.";
      }

      else if (userQuestion.includes("repeat")) {
        answer =
  language === "en"
    ? "There are currently 21 repeat offenders under observation."
    : "ಪ್ರಸ್ತುತ 21 ಪುನರಾವರ್ತಿತ ಅಪರಾಧಿಗಳು ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿದ್ದಾರೆ.";
      }

      else if (userQuestion.includes("Pending")) {
       answer =
  language === "en"
    ? "There are currently 126 pending FIRs across Karnataka."
    : "ಪ್ರಸ್ತುತ ಕರ್ನಾಟಕದಾದ್ಯಂತ 126 ಬಾಕಿ ಇರುವ FIRಗಳಿವೆ.";
      }

      else if (
  userQuestion.toLowerCase().includes("risk") ||
  userQuestion.toLowerCase().includes("crime") ||
  userQuestion.toLowerCase().includes("highest")
) {
  answer =
  language === "en"
    ? "Based on current records, Bengaluru has the highest crime rate in Karnataka."
    : "ಪ್ರಸ್ತುತ ದಾಖಲೆಗಳ ಪ್ರಕಾರ, ಕರ್ನಾಟಕದಲ್ಲಿ ಅತ್ಯಧಿಕ ಅಪರಾಧ ಪ್ರಮಾಣವು ಬೆಂಗಳೂರಿನಲ್ಲಿದೆ.";
}

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: answer,
        },
      ]);
    }, 1500);
  };

  return (
<div
  style={{
    padding: "40px 30px 30px 30px",
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily:
      language === "en"
        ? "Arial, sans-serif"
        : "'Noto Sans Kannada', sans-serif",
      }}
    >
      <h1>
  {language === "en"
    ? "🤖 AI Investigator"
    : "🤖 AI ತನಿಖಾಧಿಕಾರಿ"}
</h1>

{/* Language Toggle */}

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "15px",
    marginBottom: "20px",
    gap: "10px",
  }}
>
  <button
    onClick={() => setLanguage("en")}
    style={{
      padding: "8px 18px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      background:
        language === "en" ? "#2563eb" : "#e5e7eb",
      color:
        language === "en" ? "white" : "black",
    }}
  >
    🇬🇧 EN
  </button>

  <button
    onClick={() => setLanguage("kn")}
    style={{
      padding: "8px 18px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      background:
        language === "kn" ? "#2563eb" : "#e5e7eb",
      color:
        language === "kn" ? "white" : "black",
    }}
  >
    🇮🇳 ಕನ್ನಡ
  </button>
</div>

{/* Suggested Questions */}

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px",
  }}
>
        {suggestions.map((item) => (
            
          <button
          onMouseEnter={(e) => {
  e.target.style.background = "#2563eb";
  e.target.style.color = "white";
}}

onMouseLeave={(e) => {
  e.target.style.background = "white";
  e.target.style.color = "black";
}}
            key={item}
            onClick={() => sendMessage(item)}
            style={{
              padding: "10px 16px",
              borderRadius: "20px",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "18px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          height: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 25px",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  <div>
  <h3
    style={{
      margin: 0,
      fontSize: "20px",
    }}
  >
    {language === "en"
      ? "🤖 AI Investigator"
      : "🤖 AI ತನಿಖಾಧಿಕಾರಿ"}
  </h3>

  <div
    style={{
      color: "#16a34a",
      fontSize: "14px",
      marginTop: "4px",
    }}
  >
    {language === "en"
      ? "🟢 AI Ready"
      : "🟢 AI ಸಿದ್ಧವಾಗಿದೆ"}
  </div>

  <div
    style={{
      fontSize: "13px",
      color: "#64748b",
      marginTop: "4px",
    }}
  >
    {language === "en"
      ? "🌐 English Mode"
      : "🌐 ಕನ್ನಡ ಮೋಡ್"}
  </div>
</div>
  <span
    style={{
      color: "#64748b",
      fontSize: "14px",
    }}
  >
    {language === "en"
  ? "Crime Intelligence Assistant"
  : "ಅಪರಾಧ ಗುಪ್ತಚರ ಸಹಾಯಕ"}
  </span>
</div>
        <div
        className="chat-messages"
          style={{
            
            flex: 1,
            overflowY: "auto",
            
scrollbarWidth: "none",
msOverflowStyle: "none",
            padding: "25px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: msg.sender === "user" ? "60%" : "82%",
                  padding: "14px 18px",
                  borderRadius: "18px",
                  whiteSpace: "pre-line",
                  background:
                    msg.sender === "user"
                      ? "#2563eb"
                      : "#e2e8f0",
                  color:
                    msg.sender === "user"
                      ? "white"
                      : "#111827",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                background: "#e2e8f0",
                padding: "12px 18px",
                width: "70px",
                borderRadius: "18px",
                fontSize: "22px",
              }}
            >
              ● ● ●
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            padding: "20px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
           placeholder={
  language === "en"
    ? "Ask anything about crimes, FIRs or suspects..."
    : "ಅಪರಾಧಗಳು, FIRಗಳು ಅಥವಾ ಶಂಕಿತರ ಬಗ್ಗೆ ಕೇಳಿ..."
}
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
            }}
          />

          <button
            onClick={() => sendMessage()}
            style={{
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIInvestigator;