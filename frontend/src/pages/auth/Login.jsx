import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as necessary

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = ({ onSwitch, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
    setTouched({ email: true, password: true });
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/login`,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success("Login successful!");
          localStorage.setItem("token", response.data.token); // or whatever your backend returns
          setIsAuthenticated(true);
          setTimeout(() => {
            closeModal && closeModal();
          }, 1500);
        } else {
          toast.error(response.data.message || "Login failed. Try again.");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 text-xl font-bold cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Login
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              required
              className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
              placeholder="you@example.com"
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                required
                className={`w-full px-3 py-2 pr-10 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                  touched.password && errors.password ? "border-red-500" : ""
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Switch */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <button
              onClick={() => onSwitch("signup")}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
              type="button"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
