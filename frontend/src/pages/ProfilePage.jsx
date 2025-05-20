import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layouts/Layout.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      // ignore error, proceed to clear local state
    }
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (loading)
    return (
      <Layout>
        <div className="text-center py-10">Loading...</div>
      </Layout>
    );
  if (!user)
    return (
      <Layout>
        <div className="text-center py-10">User not found.</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-2 mb-6">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {user.phone}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default ProfilePage;
