import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, X, Check } from "lucide-react"; // ✅ icons

const MyProfile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
    preview: "",
  });

  // Fetch profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });
        if (res.data.success) {
          setFormData((prev) => ({
            ...prev,
            name: res.data.user.name,
            email: res.data.user.email,
            preview: res.data.user.profilePic
              ? `${backendUrl}/uploads/${res.data.user.profilePic}`
              : "",
          }));
        }
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, [backendUrl, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        profilePic: files[0],
        preview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (formData.profilePic) data.append("profilePic", formData.profilePic);

      const res = await axios.put(`${backendUrl}/api/user/update`, data, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Profile updated!");
        setEditMode(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 w-full max-w-lg flex flex-col gap-6 relative"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          {!editMode ? (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="text-gray-600 hover:text-amber-600"
            >
              <Pencil size={20} />
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="text-green-600 hover:text-green-700"
              >
                <Check size={22} />
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="text-red-600 hover:text-red-700"
              >
                <X size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Profile picture */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              formData.preview ||
              "https://via.placeholder.com/150?text=Profile"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          {editMode && (
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-600"
            />
          )}
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!editMode}
          className={`border px-3 py-2 rounded-lg ${
            editMode
              ? "border-gray-300 focus:outline-none focus:border-amber-500"
              : "bg-gray-100 cursor-not-allowed border-gray-200"
          }`}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          readOnly={!editMode}
          className={`border px-3 py-2 rounded-lg ${
            editMode
              ? "border-gray-300 focus:outline-none focus:border-amber-500"
              : "bg-gray-100 cursor-not-allowed border-gray-200"
          }`}
        />

        {/* Password */}
        {editMode && (
          <input
            type="password"
            name="password"
            placeholder="New Password (leave blank to keep old)"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-amber-500"
          />
        )}
      </form>
    </div>
  );
};

export default MyProfile;
