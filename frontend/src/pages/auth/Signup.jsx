import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+977\s?\d{10}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = forwardRef(({ onSwitch, closeModal, onSignupSuccess }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validate = () => {
    const newErrors = {};
    if (!fields.name) {
      newErrors.name = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(fields.name)) {
      newErrors.name = "Full Name must only contain letters and spaces";
    }
    if (!fields.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(fields.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!fields.phone) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(fields.phone)) {
      newErrors.phone = "Enter a valid Nepal phone number starting with +977";
    }
    if (!fields.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(fields.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors(validate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
    });
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/register`,
          fields
        );
        if (response.data.success) {
          toast.success(
            "Your account has been created successfully! Please verify your email."
          );
          setFields({ name: "", email: "", phone: "", password: "" });
          setTouched({});
          setErrors({});
          setTimeout(() => {
            onSignupSuccess && onSignupSuccess(fields.email); // <-- show verify modal
          }, 2000);
        } else {
          toast.error(response.data.message || "Signup failed. Try again.");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Signup failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
      <div
        ref={ref}
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 text-xl font-bold cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Signup
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={fields.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              required
              placeholder="John Doe"
              className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                touched.name && errors.name ? "border-red-500" : ""
              }`}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              required
              placeholder="name@example.com"
              className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={fields.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              required
              placeholder="+977 9812345678"
              pattern="^\+977\s?\d{7,9}$"
              title="Enter a valid Nepal phone number starting with +977"
              className={`w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                touched.phone && errors.phone ? "border-red-500" : ""
              }`}
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
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
                value={fields.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                required
                placeholder="••••••••"
                className={`w-full px-3 py-2 pr-10 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 ${
                  touched.password && errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {/* Switch */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => onSwitch("login")}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
              type="button"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
});

export default Signup;
