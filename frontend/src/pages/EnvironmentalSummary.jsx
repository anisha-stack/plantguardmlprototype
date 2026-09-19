
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EnvironmentalSummary() {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const savedPrediction = localStorage.getItem(
      "plantguard_prediction"
    );

    if (!savedPrediction) {
      navigate("/prediction");
      return;
    }

    setPrediction(JSON.parse(savedPrediction));
  }, [navigate]);

  if (!prediction) {
    return (
      <div className="page">
        <div className="loading-page">
          ⏳ Loading environmental summary...
        </div>
      </div>
    );
  }

  const temperature = Number(prediction.temperature);
  const humidity = Number(prediction.humidity);
  const rainfall = Number(prediction.rainfall);
  const soilPh = Number(prediction.soil_ph);

  let overallCondition = "Favorable";
  let conditionDescription =
    "The environmental conditions are generally suitable for plant growth.";

  if (
    humidity > 80 ||
    rainfall > 100 ||
    temperature > 32 ||
    soilPh < 5.5
  ) {
    overallCondition = "Needs Attention";
    conditionDescription =
      "Some environmental conditions may increase plant disease risk. Regular monitoring is recommended.";
  } else if (
    humidity > 65 ||
    rainfall > 50 ||
    temperature > 28 ||
    soilPh < 6
  ) {
    overallCondition = "Moderate";
    conditionDescription =
      "Environmental conditions require regular monitoring to maintain healthy plant growth.";
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>🌡️ Environmental Summary</h1>

          <p>
            Detailed analysis of the environmental conditions.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/risk")}
        >
          ← Risk Level
        </button>

      </div>


      <div className="environment-status">

        <div className="environment-status-icon">
          🌱
        </div>

        <div>
          <span>Overall Environmental Condition</span>

          <h2>
            {overallCondition}
          </h2>

          <p>
            {conditionDescription}
          </p>
        </div>

      </div>


      <div className="environment-grid">

        <div className="environment-card">

          <div className="environment-icon">
            🌡️
          </div>

          <span>Temperature</span>

          <strong>
            {temperature}°C
          </strong>

          <p>
            Current temperature condition
          </p>

        </div>


        <div className="environment-card">

          <div className="environment-icon">
            💧
          </div>

          <span>Humidity</span>

          <strong>
            {humidity}%
          </strong>

          <p>
            Current atmospheric humidity
          </p>

        </div>


        <div className="environment-card">

          <div className="environment-icon">
            🌧️
          </div>

          <span>Rainfall</span>

          <strong>
            {rainfall} mm
          </strong>

          <p>
            Recorded rainfall condition
          </p>

        </div>


        <div className="environment-card">

          <div className="environment-icon">
            🌱
          </div>

          <span>Soil pH</span>

          <strong>
            {soilPh}
          </strong>

          <p>
            Current soil acidity level
          </p>

        </div>

      </div>


      <div className="environment-analysis">

        <h2>
          📋 Environmental Analysis
        </h2>

        <ul>

          <li>
            Temperature: {temperature}°C
          </li>

          <li>
            Humidity: {humidity}%
          </li>

          <li>
            Rainfall: {rainfall} mm
          </li>

          <li>
            Soil pH: {soilPh}
          </li>

          <li>
            Detected condition:{" "}
            <strong>{prediction.disease}</strong>
          </li>

        </ul>

      </div>


      <div className="environment-actions">

        <button
          className="next-button"
          onClick={() =>
            navigate("/treatment")
          }
        >
          Required Treatment →
        </button>

      </div>

    </div>
  );
}

export default EnvironmentalSummary;
