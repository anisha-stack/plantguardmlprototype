
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RiskLevel() {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    const savedPrediction = localStorage.getItem(
      "plantguard_prediction"
    );

    if (!savedPrediction) {
      navigate("/prediction");
      return;
    }

    const data = JSON.parse(savedPrediction);
    setPrediction(data);

    const humidity = Number(data.humidity);
    const rainfall = Number(data.rainfall);
    const temperature = Number(data.temperature);

    let level = "Low Risk";
    let description =
      "Environmental conditions are generally suitable for plant health.";
    let icon = "🟢";

    if (
      humidity > 80 ||
      rainfall > 100 ||
      temperature > 32
    ) {
      level = "High Risk";
      description =
        "The environmental conditions may increase the possibility of plant disease. Close monitoring is recommended.";
      icon = "🔴";
    } else if (
      humidity > 65 ||
      rainfall > 50 ||
      temperature > 28
    ) {
      level = "Medium Risk";
      description =
        "Some environmental conditions may support disease development. Regular monitoring is recommended.";
      icon = "🟡";
    }

    setRisk({
      level,
      description,
      icon,
    });
  }, [navigate]);

  if (!prediction || !risk) {
    return (
      <div className="page">
        <div className="loading-page">
          ⏳ Loading risk analysis...
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>🚦 Risk Level Analysis</h1>
          <p>
            Environmental risk assessment for the latest prediction.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/prediction")}
        >
          ← Prediction
        </button>
      </div>

      <div className="risk-card">

        <div className="risk-icon">
          {risk.icon}
        </div>

        <span className="result-label">
          Current Risk Level
        </span>

        <h2>{risk.level}</h2>

        <p className="risk-description">
          {risk.description}
        </p>

      </div>

      <div className="risk-details">

        <div className="risk-detail-box">
          <span>Detected Condition</span>
          <strong>{prediction.disease}</strong>
        </div>

        <div className="risk-detail-box">
          <span>Humidity</span>
          <strong>{prediction.humidity}%</strong>
        </div>

        <div className="risk-detail-box">
          <span>Rainfall</span>
          <strong>{prediction.rainfall} mm</strong>
        </div>

        <div className="risk-detail-box">
          <span>Temperature</span>
          <strong>{prediction.temperature}°C</strong>
        </div>

      </div>

      <div className="risk-actions">

        <button
          className="next-button"
          onClick={() =>
            navigate("/environment")
          }
        >
          Environmental Summary →
        </button>

      </div>

    </div>
  );
}

export default RiskLevel;

