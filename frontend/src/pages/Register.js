import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      if (res.data.status === "ok") {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(res.data.error || "Registration failed");
      }
    } catch (err) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Travel Hub Logo"
            className="mb-2"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />
          <h3 className="fw-bold text-dark mb-1">Create an Account</h3>
          <p className="text-muted small mb-0">Join Travel Hub CRM</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-100 text-white fw-semibold rounded-pill ${
              loading ? "btn-secondary" : "btn-primary"
            }`}
            style={{
              background: loading
                ? "#aaa"
                : "linear-gradient(90deg, #007bff, #ff8c00)",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-muted small mt-3 mb-0">
          Already have an account?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>

        <p className="text-center text-muted small mt-4 mb-0">
          © {new Date().getFullYear()} Travel Hub CRM
        </p>
      </div>
    </div>
  );
};

export default Register;
