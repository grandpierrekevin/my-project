import { useState, useRef, useEffect } from "react";
import { SidebarLink } from "@/components/layout/SidebarLink";
import { SidebarDropdown } from "@/components/layout/SidebarDropdown";
import { sidebarConfig } from "@/components/config/sidebarConfig";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        ref={sidebarRef}
        className={`h-full bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 ease-in-out z-30 ${
          sidebarOpen ? "w-56" : "w-16"
        } backdrop-blur-md bg-opacity-60`}
      >
        <div>
          <div className="flex justify-center p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
          </div>

          <nav className="flex flex-col space-y-2 mt-4">
            {sidebarConfig.map((item, idx) =>
              item.children ? (
                <SidebarDropdown key={idx} item={item} sidebarOpen={sidebarOpen} />
              ) : (
                <SidebarLink key={idx} item={item} sidebarOpen={sidebarOpen} />
              )
            )}
          </nav>
        </div>

        {/* Profil en bas */}
        <div className="p-4">
          <SidebarLink item={{ path: "/profil", icon: "👤", label: "Profil" }} sidebarOpen={sidebarOpen} />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
