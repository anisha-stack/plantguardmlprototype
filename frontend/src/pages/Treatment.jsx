
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Treatment() {
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
          ⏳ Loading treatment information...
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>💊 Required Treatment</h1>

          <p>
            Treatment and prevention information for the detected condition.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/environment")}
        >
          ← Environment
        </button>

      </div>


      <div className="treatment-disease">

        <span>
          Detected Condition
        </span>

        <h2>
          {prediction.disease}
        </h2>

        <div className="treatment-confidence">
          Confidence: {prediction.confidence}
        </div>

      </div>


      <div className="treatment-grid">

        <div className="treatment-card">

          <div className="treatment-card-icon">
            💊
          </div>

          <h2>
            Recommended Treatment
          </h2>

          <p>
            {prediction.treatment}
          </p>

        </div>


        <div className="treatment-card">

          <div className="treatment-card-icon">
            🛡️
          </div>

          <h2>
            Prevention Tips
          </h2>

          {prediction.prevention_tips &&
          prediction.prevention_tips.length > 0 ? (

            <ul>

              {prediction.prevention_tips.map(
                (tip, index) => (
                  <li key={index}>
                    {tip}
                  </li>
                )
              )}

            </ul>

          ) : (

            <p>
              Continue regular plant monitoring and
              maintain suitable environmental conditions.
            </p>

          )}

        </div>

      </div>


      <div className="treatment-details">

        <div>
          <span>Recovery Time</span>

          <strong>
            {prediction.recovery_time}
          </strong>
        </div>


        <div>
          <span>Expected Yield Loss</span>

          <strong>
            {prediction.expected_yield_loss}
          </strong>
        </div>

      </div>


      <div className="treatment-warning">

        <h3>
          ⚠️ Important
        </h3>

        <p>
          This system provides a prototype-level recommendation
          based on environmental conditions. For actual crop
          treatment, farmers should follow locally appropriate
          agricultural guidance and product instructions.
        </p>

      </div>


      <div className="treatment-actions">

        <button
          className="next-button"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard →
        </button>

      </div>

    </div>
  );
}

export default Treatment;

