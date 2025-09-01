import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Authentication.css";

export default function AuthenticationLoginPage({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
   

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (handleLogin(email, password)) {
      setError("");
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login to ShopVibe</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}//ممكن يتحدث
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}//خد بالك تارجت دي مهمه جدااا
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
