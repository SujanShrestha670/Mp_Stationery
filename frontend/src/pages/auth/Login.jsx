import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate requests
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true } // Include cookies for authentication
      );

      // Check for successful response (status 200 and success flag)
      if (response.status === 200 && response.data.success) {
        setEmail("");
        setPassword("");
        if (onLoginSuccess) {
          onLoginSuccess(); // Trigger toast in AppRoutes
        }
      } else {
        // Unexpected success response structure
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      // Handle specific HTTP errors
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="card-body relative bg-base-100 shadow-2xl rounded-lg max-w-md w-full p-8">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faTimes} className="text-2xl" />
      </button>

      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleLogin}>
        <fieldset className="fieldset">
          <label className="fieldset-label text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-base py-3"
            placeholder="Email"
            required
            disabled={isSubmitting} // Disable input during submission
          />
          <label className="fieldset-label text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-base py-3"
            placeholder="Password"
            required
            disabled={isSubmitting} // Disable input during submission
          />
          <div className="mt-2">
            <a className="link link-hover text-base">Forgot password?</a>
          </div>
          <div className="mt-2">
            <a
              onClick={onSwitchToSignup}
              className="link link-hover text-base cursor-pointer"
            >
              Don’t have an account? Sign up
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-neutral mt-6 text-lg py-3 w-full"
            disabled={isSubmitting} // Disable button during submission
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
