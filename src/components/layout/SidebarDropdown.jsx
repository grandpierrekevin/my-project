import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export function SidebarDropdown({ item, sidebarOpen }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = location.pathname.startsWith(item.path || "");

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
          sidebarOpen
            ? isActive
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-600 text-gray-300"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {/* Partie Link vers la page principale */}
        <Link
          to={item.path || "#"}
          className="flex items-center gap-2 flex-1"
        >
          <span>{item.icon}</span>
          {sidebarOpen && <span>{item.label}</span>}
        </Link>

        {/* Bouton pour dropdown */}
        {item.children && (
          <button
            onClick={toggleDropdown}
            className="p-2 focus:outline-none"
          >
            {open ? (
              <FaChevronDown size={12} />
            ) : (
              <FaChevronRight size={12} />
            )}
          </button>
        )}
      </div>

      {/* Sous-menus */}
      {open && item.children && (
        <div className="flex flex-col ml-6 mt-1 space-y-1">
          {item.children.map((child) => (
            <Link
            key={child.path}
            to={child.path}
            className={`relative flex items-center gap-3 p-2 text-sm rounded-lg transition ${
              location.pathname === child.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <span>{child.icon}</span>
            {sidebarOpen && <span>{child.label}</span>}
          
            {/* Tooltip */}
            {!sidebarOpen && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {child.label}
              </span>
            )}
          </Link>
          
          ))}
        </div>
      )}

    </div>
  );
}
