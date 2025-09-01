import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AccountCreationPage({ handleSignup, users }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (users.find((u) => u.email === email)) {
      setError("Email already exists");
      return;
    }

    handleSignup(name, email, password);
    // Navigate to home page after successful signup
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up for ShopVibe</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSubmit}>Sign Up</button>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
