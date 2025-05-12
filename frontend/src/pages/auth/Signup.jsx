import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Signup = ({ onClose, onSwitchToLogin, onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        onSignupSuccess(); // Trigger toast in AppRoutes
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
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

      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSignup}>
        <fieldset className="fieldset">
          <label className="fieldset-label text-lg">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full text-base py-3"
            placeholder="Name"
            required
          />
          <label className="fieldset-label text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-base py-3"
            placeholder="Email"
            required
          />
          <label className="fieldset-label text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-base py-3"
            placeholder="Password"
            required
          />
          <div className="mt-2">
            <a
              onClick={onSwitchToLogin}
              className="link link-hover text-base cursor-pointer"
            >
              Already have an account? Login
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-neutral mt-6 text-lg py-3 w-full"
          >
            Sign Up
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
