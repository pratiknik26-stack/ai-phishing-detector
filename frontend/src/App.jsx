import { useState } from "react";
import "./App.css";

function App() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async () => {
    if (!emailText) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://ai-phishing-detector-lpit.onrender.com/analyze-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_text: emailText,
        }),
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Phishing Detection Dashboard</h1>

      <textarea
        placeholder="Paste suspicious email here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />

      <button onClick={analyzeEmail} disabled={loading}>
        {loading ? "Analyzing Threat..." : "Analyze Email"}
      </button>

      {loading && (
        <div className="loading">
          AI engine analyzing email threat indicators...
        </div>
      )}

      {result && (
        <div className="result-card">
          <h2>Threat Analysis Result</h2>

          <p
            className={`score ${
              result.threat_level === "HIGH"
                ? "high"
                : result.threat_level === "MEDIUM"
                ? "medium"
                : "low"
            }`}
          >
            Phishing Score: {result.phishing_score}/100
          </p>

          <div
            className={`badge ${
              result.threat_level === "HIGH"
                ? "high"
                : result.threat_level === "MEDIUM"
                ? "medium"
                : "low"
            }`}
          >
            {result.threat_level} RISK
          </div>

          <h3>Explanation</h3>
          <p>{result.explanation}</p>

          <h3>Recommended Action</h3>
          <p>{result.recommended_action}</p>

          <h3>Suspicious Indicators</h3>

          <ul>
            {result.suspicious_indicators.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;