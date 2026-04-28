import React from "react";
import { Menu, User, LogOut } from "lucide-react";

const Topbar = ({ onMenuClick, sidebarCollapsed }) => {

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  return (
    <div
      className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 z-30 transition-all duration-300 ${
        sidebarCollapsed ? "lg:left-16 left-0" : "lg:left-64 left-0"
      }`}
    >
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Admin Text */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Admin
          </span>
        </div>

        {/* Logout Button */}
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button> */}

      </div>
    </div>
  );
};

export default Topbar;