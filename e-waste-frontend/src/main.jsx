import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 🌱 Splash Screen Component
const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="loader-circle"></div>
      <h2 className="splash-title">♻️ E-Waste Management</h2>
      <p className="splash-subtitle">Building a Greener Tomorrow...</p>
    </div>
  );
};

// 🌎 RootApp Wrapper with Loading Animation
const RootApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="fade-in">
          <App />
        </div>
      )}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<RootApp />);
