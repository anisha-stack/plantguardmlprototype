
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem(
      "plantguard_user"
    );

    if (!savedUser) {
      navigate("/");
      return;
    }

    setEmail(savedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("plantguard_user");
    localStorage.removeItem("plantguard_prediction");

    navigate("/");
  };

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>👤 My Profile</h1>

          <p>
            Manage your PlantGuard AI profile.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </button>

      </div>


      <div className="profile-card">

        <div className="profile-avatar">
          🌱
        </div>

        <h2>
          PlantGuard User
        </h2>

        <p className="profile-role">
          Smart Agriculture User
        </p>

        <div className="profile-information">

          <div className="profile-row">

            <span>
              📧 Email
            </span>

            <strong>
              {email}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              🌱 Application
            </span>

            <strong>
              PlantGuard AI
            </strong>

          </div>


          <div className="profile-row">

            <span>
              🧠 System
            </span>

            <strong>
              Environmental Disease Prediction
            </strong>

          </div>


          <div className="profile-row">

            <span>
              ⚙️ Account Type
            </span>

            <strong>
              Prototype User
            </strong>

          </div>

        </div>


        <div className="profile-actions">

          <button
            onClick={() => navigate("/prediction")}
          >
            🔬 New Prediction
          </button>

          <button
            onClick={() => navigate("/dashboard")}
          >
            📊 View Dashboard
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;

