
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://plantguardmlprototype-3.onrender.com/api/history/"
      );

      const data = await response.json();

      if (response.ok) {
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error(
        "Unable to load dashboard history:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const totalPredictions = history.length;

  const healthyCount = history.filter(
    (item) => item.disease === "Healthy"
  ).length;

  const diseaseCount = history.filter(
    (item) => item.disease !== "Healthy"
  ).length;

  const highRiskCount = history.filter(
    (item) =>
      item.humidity > 80 ||
      item.rainfall > 100 ||
      item.temperature > 32
  ).length;

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>📊 PlantGuard Dashboard</h1>

          <p>
            Overview of your plant health predictions.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/prediction")}
        >
          🔬 New Prediction
        </button>

      </div>


      <div className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <span>Total Predictions</span>

          <strong>
            {totalPredictions}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🌱
          </div>

          <span>Healthy Plants</span>

          <strong>
            {healthyCount}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🦠
          </div>

          <span>Diseases Detected</span>

          <strong>
            {diseaseCount}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🚨
          </div>

          <span>High Risk Cases</span>

          <strong>
            {highRiskCount}
          </strong>

        </div>

      </div>


      <div className="dashboard-card">

        <div className="dashboard-card-header">

          <div>
            <h2>
              📜 Recent Predictions
            </h2>

            <p>
              Your latest plant health analysis records.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={loadHistory}
          >
            🔄 Refresh
          </button>

        </div>


        {loading ? (

          <div className="loading-page">
            ⏳ Loading prediction history...
          </div>

        ) : history.length === 0 ? (

          <div className="empty-history">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No predictions yet
            </h3>

            <p>
              Start a prediction to see your results here.
            </p>

          </div>

        ) : (

          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>

                <tr>

                  <th>Date & Time</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Rainfall</th>
                  <th>Soil pH</th>
                  <th>Disease</th>
                  <th>Confidence</th>

                </tr>

              </thead>

              <tbody>

                {history.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.created_at}
                    </td>

                    <td>
                      {item.temperature}°C
                    </td>

                    <td>
                      {item.humidity}%
                    </td>

                    <td>
                      {item.rainfall} mm
                    </td>

                    <td>
                      {item.soil_ph}
                    </td>

                    <td>

                      <span className="disease-badge">
                        {item.disease}
                      </span>

                    </td>

                    <td>
                      {item.confidence}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      <div className="dashboard-navigation">

        <button
          onClick={() => navigate("/risk")}
        >
          🚦 Risk Level
        </button>

        <button
          onClick={() => navigate("/environment")}
        >
          🌡️ Environment
        </button>

        <button
          onClick={() => navigate("/treatment")}
        >
          💊 Treatment
        </button>

        <button
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </button>

      </div>

    </div>
  );
}

export default Dashboard;
