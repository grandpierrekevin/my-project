import { Link, useLocation } from "react-router-dom";

export function SidebarLink({ item, sidebarOpen }) {
  const location = useLocation();

  return (
    <Link
      to={item.path}
      className={`relative flex items-center gap-3 p-3 rounded-lg transition ${
        location.pathname === item.path
          ? "bg-blue-500 text-white"
          : "hover:bg-gray-700 text-gray-300"
      }`}
    >
      <span>{item.icon}</span>
      {sidebarOpen && <span>{item.label}</span>}

      {/* Tooltip */}
      {!sidebarOpen && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.label}
        </span>
      )}
    </Link>
  );
}
