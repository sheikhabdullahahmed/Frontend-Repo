import { FiDollarSign } from "react-icons/fi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { IoLogOutOutline, IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function SideMenu({ isOpen, onClose }) {
  const [user, setUser] = useState({ fullName: "", profileImageUrl: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:4000/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await axios.post(
          "http://localhost:4000/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <div className={`
      fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl flex flex-col z-50
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Close button - Only visible on mobile */}
      <div className="lg:hidden absolute top-4 right-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <IoClose size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Expense Tracker
        </h1>
      </div>

      {/* User Profile Section */}
      <div className="p-6 flex flex-col items-center border-b border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
            {user.profileImageUrl ? (
              <img
                src={`http://localhost:4000/${user.profileImageUrl.replace(/\\/g, "/")}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200">
                <span className="text-2xl font-bold text-purple-700">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {user.fullName || "User"}
        </h2>
        <p className="text-xs text-gray-500 mt-1">Welcome back!</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <button
          onClick={() => handleNavigation("/expensetracker/dashboard")}
          className={`w-full flex items-center px-4 py-3 mb-2 rounded-xl text-left transition-all duration-200 ${
            currentPath.includes("/dashboard")
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg transform scale-105"
              : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
          }`}
        >
          <FiDollarSign className="mr-3 flex-shrink-0" size={20} />
          <span className="font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => handleNavigation("/expensetracker/expense")}
          className={`w-full flex items-center px-4 py-3 mb-2 rounded-xl text-left transition-all duration-200 ${
            currentPath.includes("/expense")
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg transform scale-105"
              : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
          }`}
        >
          <AiOutlineArrowDown className="mr-3 flex-shrink-0" size={20} />
          <span className="font-medium">Expense</span>
        </button>

        <button
          onClick={() => handleNavigation("/expensetracker/income")}
          className={`w-full flex items-center px-4 py-3 mb-2 rounded-xl text-left transition-all duration-200 ${
            currentPath.includes("/income")
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg transform scale-105"
              : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
          }`}
        >
          <AiOutlineArrowUp className="mr-3 flex-shrink-0" size={20} />
          <span className="font-medium">Income</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 hover:translate-x-1"
        >
          <IoLogOutOutline className="mr-3 flex-shrink-0" size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SideMenu;