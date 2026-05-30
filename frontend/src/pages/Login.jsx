import { useState } from "react";

import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");


      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      setError("Invalid login or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Cold Storage Admin</h2>
        <p>Reporting System Login</p>

        <input
          type="text"
          placeholder="Username"
          data-testid="login-username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          data-testid="login-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? (
          <p className="login-error" data-testid="login-error">
            {error}
          </p>
        ) : null}

        <button
          data-testid="login-submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}