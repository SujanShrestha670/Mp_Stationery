import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const codeRegex = /^\d{6}$/; // 6-digit code regex

const Verify = ({ email, onVerifySuccess, closeModal, onSwitch }) => {
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!code) {
      newErrors.code = "Verification code is required";
    } else if (!codeRegex.test(code)) {
      newErrors.code = "Enter a valid 6-digit code";
    }
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ code: true });
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/verify-email`,
          { email, code }
        );
        if (response.data.success) {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            onVerifySuccess && onVerifySuccess(); // Only this!
          }, 1500);
        } else {
          toast.error(response.data.message || "Verification failed.");
        }
      } catch (err) {
        toast.error("Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 text-xl font-bold cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Verify Your Email
        </h2>

        <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
          We sent a verification code to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Verification Code */}
          <div>
            <label
              htmlFor="code"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onBlur={() => handleBlur("code")}
              required
              maxLength={6}
              className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                touched.code && errors.code ? "border-red-500" : ""
              }`}
              placeholder="Enter 6-digit code"
            />
            {touched.code && errors.code && (
              <p className="text-xs text-red-600 mt-1">{errors.code}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          {/* Switch to Signup/Login */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Didn't receive a code?{" "}
            <button
              onClick={() => onSwitch("signup")}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
              type="button"
            >
              Sign up
            </button>{" "}
            or{" "}
            <button
              onClick={() => onSwitch("login")}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
              type="button"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Verify;
