import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 Protect profile page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
    };

    updateUser(updatedUser);   // 🔥 Update in context + localStorage
    setSuccess("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          My Profile
        </h2>

        {/* Success message */}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
