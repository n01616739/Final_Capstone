import React from "react";
import { Link } from "react-router-dom";
import "../Login.css";

function LoginForm() {
  return (
    <div>
      <header>
        <div className="logo"> {/* Replace with actual logo */}
          <img src="logo.png" alt="Logo" />
        </div>
        <nav>
          <a href="#home">Home</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#contact">Contact</a>
          <button className="login-button">Login</button>
        </nav>
      </header>
      <main>
        <h1>Welcome. Let's Login.</h1>
        <p>Sign in to continue.</p>
        <form>
          <input type="email" placeholder="Enter email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p>
          No account? <Link to="/register" className="login-link">Let's Register.</Link>
        </p>
      </main>
      <footer>
        <p>© 2025 Your Company | <a href="#about">About</a> | <a href="#contact">Contact</a></p>
      </footer>
    </div>
  );
}

export default LoginForm;
