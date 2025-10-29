import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2e7d32 0%, #81c784 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      {/* Header Section */}
      <div style={{ maxWidth: "900px" }}>
        <h1
          style={{
            fontWeight: "800",
            fontSize: "3rem",
            marginBottom: "20px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Smarter E-Waste Solutions for a Greener Planet
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: "0.9",
            lineHeight: "1.6",
            marginBottom: "50px",
          }}
        >
          Transforming electronic waste into valuable resources through
          innovation, transparency, and certified recycling practices.
        </p>
      </div>

      {/* Circular Flow Section */}
      <div
        className="row justify-content-center"
        style={{
          maxWidth: "1000px",
          backgroundColor: "#ffffff",
          borderRadius: "25px",
          padding: "40px 10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          color: "#2e7d32",
          marginBottom: "50px",
        }}
      >
        <div className="col-md-3 m-3 p-3" style={cardStyle}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2913/2913461.png"
            alt="Design & Production"
            style={iconStyle}
          />
          <h4 style={cardTitle}>Eco Production</h4>
          <p style={cardText}>
            Designing electronics with sustainability and reusability in mind.
          </p>
        </div>

        <div className="col-md-3 m-3 p-3" style={cardStyle}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
            alt="Usage"
            style={iconStyle}
          />
          <h4 style={cardTitle}>Smart Usage</h4>
          <p style={cardText}>
            Encouraging responsible consumption to extend device life cycles.
          </p>
        </div>

        <div className="col-md-3 m-3 p-3" style={cardStyle}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/558/558782.png"
            alt="Recycling"
            style={iconStyle}
          />
          <h4 style={cardTitle}>Green Recycling</h4>
          <p style={cardText}>
            Collecting and repurposing e-waste to protect our environment.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <button
          onClick={() => navigate("/login")}
          className="btn fw-bold px-4 py-2"
          style={{
            backgroundColor: "#a5d6a7",
            color: "#1b5e20",
            fontSize: "1.1rem",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/register")}
          className="btn fw-bold px-4 py-2"
          style={{
            backgroundColor: "transparent",
            border: "2px solid #fff",
            color: "#fff",
            fontSize: "1.1rem",
            borderRadius: "8px",
          }}
        >
          Join Us
        </button>
      </div>

      {/* Footer Quote */}
      <p
        className="mt-5"
        style={{
          fontStyle: "italic",
          fontSize: "1rem",
          opacity: "0.8",
          maxWidth: "700px",
        }}
      >
        “Building a sustainable digital world — one recycled device at a time.”
      </p>
    </div>
  );
};

/* --- Inline CSS for consistency --- */
const cardStyle = {
  backgroundColor: "#e8f5e9",
  borderRadius: "15px",
  transition: "transform 0.3s ease, background-color 0.3s ease",
  cursor: "pointer",
  boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
};

const iconStyle = {
  width: "80px",
  height: "80px",
  marginBottom: "15px",
};

const cardTitle = {
  fontWeight: "700",
  marginBottom: "10px",
  color: "#2e7d32",
};

const cardText = {
  fontSize: "0.95rem",
  color: "#33691e",
};

export default LandingPage;
