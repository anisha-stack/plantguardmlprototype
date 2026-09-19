import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Prediction() {
  const navigate = useNavigate();

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [soilPh, setSoilPh] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predictDisease = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    const temp = Number(temperature);
    const hum = Number(humidity);
    const rain = Number(rainfall);
    const ph = Number(soilPh);

    if (temp < -50 || temp > 60) {
      setError("Temperature must be between -50°C and 60°C.");
      return;
    }

    if (hum < 0 || hum > 100) {
      setError("Humidity must be between 0% and 100%.");
      return;
    }

    if (rain < 0) {
      setError("Rainfall cannot be negative.");
      return;
    }

    if (ph < 0 || ph > 14) {
      setError("Soil pH must be between 0 and 14.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
    "https://plantguardmlprototype-3.onrender.com/api/predict/",
    
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            temperature: temp,
            humidity: hum,
            rainfall: rain,
            soil_ph: ph,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      const prediction = data.prediction;

      setResult(prediction);

      localStorage.setItem(
        "plantguard_prediction",
        JSON.stringify({
          ...prediction,
          temperature: temp,
          humidity: hum,
          rainfall: rain,
          soil_ph: ph,
        })
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the prediction server."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTemperature("");
    setHumidity("");
    setRainfall("");
    setSoilPh("");
    setResult(null);
    setError("");
  };

  const goToRisk = () => {
    if (result) {
      navigate("/risk");
    }
  };

  return (
    <div className="prediction-page">

      {/* Page Header */}
      <div className="prediction-header">

        <div>
          <div className="section-tag">
            AI PLANT HEALTH ANALYSIS
          </div>

          <h1>
            Plant Health Prediction
          </h1>

          <p>
            Analyze environmental conditions to identify
            potential plant diseases and understand plant health.
          </p>
        </div>

        <button
          className="dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </button>

      </div>


      {/* Main Prediction Layout */}
      <div className="prediction-layout">

        {/* Input Card */}
        <div className="prediction-card">

          <div className="card-heading">

            <div className="card-icon">
              🌿
            </div>

            <div>
              <h2>Environmental Conditions</h2>

              <p>
                Enter the current conditions of your plant
                environment.
              </p>
            </div>

          </div>


          <form onSubmit={predictDisease}>

            <div className="form-grid">

              {/* Temperature */}
              <div className="input-group">

                <label>
                  Temperature
                  <span>°C</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">🌡️</span>

                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) =>
                      setTemperature(e.target.value)
                    }
                    placeholder="e.g. 29.9"
                    required
                  />
                </div>

              </div>


              {/* Humidity */}
              <div className="input-group">

                <label>
                  Humidity
                  <span>%</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">💧</span>

                  <input
                    type="number"
                    step="0.1"
                    value={humidity}
                    onChange={(e) =>
                      setHumidity(e.target.value)
                    }
                    placeholder="e.g. 58"
                    required
                  />
                </div>

              </div>


              {/* Rainfall */}
              <div className="input-group">

                <label>
                  Rainfall
                  <span>mm</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">🌧️</span>

                  <input
                    type="number"
                    step="0.1"
                    value={rainfall}
                    onChange={(e) =>
                      setRainfall(e.target.value)
                    }
                    placeholder="e.g. 120"
                    required
                  />
                </div>

              </div>


              {/* Soil pH */}
              <div className="input-group">

                <label>
                  Soil pH
                  <span>0–14</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">🌱</span>

                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={soilPh}
                    onChange={(e) =>
                      setSoilPh(e.target.value)
                    }
                    placeholder="e.g. 6.2"
                    required
                  />
                </div>

              </div>

            </div>


            {/* Buttons */}
            <div className="prediction-actions">

              <button
                type="submit"
                className="predict-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    ⏳ Analyzing...
                  </>
                ) : (
                  <>
                    🔍 Predict Plant Disease
                  </>
                )}
              </button>

              <button
                type="button"
                className="clear-button"
                onClick={clearForm}
              >
                Clear
              </button>

            </div>

          </form>


          {/* Error */}
          {error && (
            <div className="prediction-error">
              <span>⚠️</span>

              <div>
                <strong>Prediction Error</strong>

                <p>{error}</p>
              </div>
            </div>
          )}

        </div>


        {/* Information Card */}
        <div className="info-card">

          <div className="info-icon">
            🤖
          </div>

          <h3>
            How PlantGuard AI Works
          </h3>

          <p>
            Our machine learning model analyzes the
            environmental conditions you provide to
            identify potential plant health risks.
          </p>

          <div className="info-list">

            <div className="info-item">
              <span>01</span>
              <p>Enter environmental conditions</p>
            </div>

            <div className="info-item">
              <span>02</span>
              <p>AI analyzes the plant environment</p>
            </div>

            <div className="info-item">
              <span>03</span>
              <p>View disease prediction and confidence</p>
            </div>

            <div className="info-item">
              <span>04</span>
              <p>Continue to risk and treatment analysis</p>
            </div>

          </div>

        </div>

      </div>


      {/* Prediction Result */}
      {result && (
        <div className="prediction-result">

          <div className="result-header">

            <div>
              <span className="result-label">
                AI ANALYSIS COMPLETE
              </span>

              <h2>
                {result.disease}
              </h2>
            </div>

            <div className="confidence-card">

              <span>Confidence</span>

              <strong>
                {result.confidence}
              </strong>

            </div>

          </div>


          <div className="result-info-grid">

            <div className="result-box">
              <span>Recovery Time</span>

              <strong>
                {result.recovery_time}
              </strong>
            </div>

            <div className="result-box">
              <span>Expected Yield Loss</span>

              <strong>
                {result.expected_yield_loss}
              </strong>
            </div>

          </div>


          <div className="result-next">

            <p>
              Your prediction is ready. Continue to
              understand the risk level and recommended
              treatment.
            </p>

            <button
              onClick={goToRisk}
              className="next-button"
            >
              Continue to Risk Level →
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Prediction;