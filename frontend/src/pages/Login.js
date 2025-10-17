import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Custom CSS (see below)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert(res.data.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg p-4 rounded-4 bg-white">
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Travel Hub Logo"
            className="img-fluid mb-2"
            style={{ width: "70px", height: "70px" }}
          />
          <h2 className="fw-bold text-dark">Travel Hub CRM</h2>
          <p className="text-muted small">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-lg w-100 text-white fw-semibold gradient-btn ${
              loading ? "disabled" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          © {new Date().getFullYear()} Travel Hub CRM
        </p>
      </div>
    </div>
  );
};

export default Login;
