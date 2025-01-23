import React from "react";
import { Link } from "react-router-dom";
import "../Register.css";

function RegisterForm() {
  return (
    <div className="register-container">
      {/* Header */}
      <div className="register-header">
        <h1>Welcome. Let's Register.</h1>
      </div>

      {/* Registration form */}
      <form className="register-form">
        <input type="text" placeholder="Enter full name" />
        <input type="email" placeholder="Enter email" />
        <input type="password" placeholder="Create password" />
        <input type="password" placeholder="Confirm password" />
        <button type="submit" className="register-button">Register</button>
      </form>

      {/* Footer */}
      <div className="register-footer">
      <p>
          Already have an account? <Link to="/login" className="register-link">Let's Login.</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
