
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Prediction from "./pages/Prediction";
import RiskLevel from "./pages/RiskLevel";
import EnvironmentalSummary from "./pages/EnvironmentalSummary";
import Treatment from "./pages/Treatment";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import "./App.css";


function ProtectedRoute({ children }) {
  const user = localStorage.getItem("plantguard_user");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function Navigation() {
  return (
    <nav className="main-navigation">

      <div className="nav-logo">
        🌱 PlantGuard AI
      </div>

      <div className="nav-links">

        <a href="/prediction">
          🔬 Prediction
        </a>

        <a href="/risk">
          🚦 Risk
        </a>

        <a href="/environment">
          🌡️ Environment
        </a>

        <a href="/treatment">
          💊 Treatment
        </a>

        <a href="/dashboard">
          📊 Dashboard
        </a>

        <a href="/profile">
          👤 Profile
        </a>

      </div>

    </nav>
  );
}


function PageLayout({ children }) {
  return (
    <div className="app">

      <Navigation />

      <main className="main-content">
        {children}
      </main>

      <footer>

        <p>
          🌱 PlantGuard AI — Smart Agriculture Disease Prediction
        </p>

        <p className="footer-small">
          PBL Prototype | React + Django REST Framework
        </p>

      </footer>

    </div>
  );
}


function App() {
  return (
    <Routes>

      {/* Login */}

      <Route
        path="/"
        element={<Login />}
      />


      {/* Prediction */}

      <Route
        path="/prediction"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Prediction />
            </PageLayout>
          </ProtectedRoute>
        }
      />


      {/* Risk Level */}

      <Route
        path="/risk"
        element={
          <ProtectedRoute>
            <PageLayout>
              <RiskLevel />
            </PageLayout>
          </ProtectedRoute>
        }
      />


      {/* Environmental Summary */}

      <Route
        path="/environment"
        element={
          <ProtectedRoute>
            <PageLayout>
              <EnvironmentalSummary />
            </PageLayout>
          </ProtectedRoute>
        }
      />


      {/* Required Treatment */}

      <Route
        path="/treatment"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Treatment />
            </PageLayout>
          </ProtectedRoute>
        }
      />


      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Dashboard />
            </PageLayout>
          </ProtectedRoute>
        }
      />


      {/* Profile */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Profile />
            </PageLayout>
          </ProtectedRoute>
        }
      />


      {/* Unknown URL */}

      <Route
        path="*"
        element={
          <Navigate to="/" replace />
        }
      />

    </Routes>
  );
}

export default App;

