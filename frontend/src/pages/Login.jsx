import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    localStorage.setItem(
      "plantguard_user",
      JSON.stringify({ email })
    );

    navigate("/prediction");
  };

  return (
    <div className="pg-login-page">

      <div className="pg-login-left">

        <div className="pg-brand">
          <div className="pg-brand-icon">🌱</div>

          <h1>PlantGuard AI</h1>

          <p>
            Intelligent Plant Disease Prediction
            <br />
            & Treatment Recommendation System
          </p>
        </div>

        <div className="pg-features">

          <div className="pg-feature">
            <span>🔬</span>
            <div>
              <strong>AI Disease Detection</strong>
              <p>Identify potential plant diseases using ML.</p>
            </div>
          </div>

          <div className="pg-feature">
            <span>🌿</span>
            <div>
              <strong>Smart Plant Health</strong>
              <p>Analyze environmental conditions and plant risk.</p>
            </div>
          </div>

          <div className="pg-feature">
            <span>💊</span>
            <div>
              <strong>Treatment Guidance</strong>
              <p>Get recommended treatment and recovery information.</p>
            </div>
          </div>

        </div>

      </div>


      <div className="pg-login-right">

        <div className="pg-login-box">

          <div className="pg-mobile-logo">
            🌱
          </div>

          <div className="pg-login-heading">
            <h2>Welcome Back</h2>

            <p>
              Sign in to continue to PlantGuard AI
            </p>
          </div>

          <div className="pg-status">
            <span></span>
            System Online
          </div>

          <form onSubmit={handleLogin}>

            <div className="pg-field">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="pg-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="pg-login-button"
            >
              🔐 Sign In
            </button>

          </form>

          <p className="pg-login-footer">
            PBL Prototype • PlantGuard AI
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;