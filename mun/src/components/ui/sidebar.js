import React, { useState, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  BookOpen,
  MessageCircle,
  FileText,
} from "lucide-react";
import Logo from "../../assets/DYMUN.png";

// Context for Sidebar open/close (for mobile)
const SidebarContext = createContext();
export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(window.innerWidth >= 1024); // Show sidebar by default on desktop
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
export function useSidebar() {
  return useContext(SidebarContext);
}

// Sidebar main wrapper
export function Sidebar({ children, className }) {
  const { open, setOpen } = useSidebar();

  // Hide sidebar on mobile/tablet unless toggled
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open && window.innerWidth < 1024 ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
        style={{ pointerEvents: open && window.innerWidth < 1024 ? "auto" : "none" }}
      />
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-md shadow-xl transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${className || ""}`}
        style={{ borderRight: "1px solid rgba(0, 0, 0, 0.05)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "24px 28px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <img
            src={Logo}
            alt="DYMUN Logo"
            style={{
              width: 64,
              height: 64,
              borderRadius: "1rem",
              boxShadow: "0 4px 16px rgba(59, 130, 246, 0.15)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "#1e293b",
                letterSpacing: "-0.02em",
              }}
            >
              DYMUN
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "#64748b",
                letterSpacing: "-0.01em",
              }}
            >
              2025 Conference
            </span>
          </div>
        </div>
        <nav style={{ marginTop: 24, padding: "0 16px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navItems.map((item) => (
              <SidebarMenuItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </ul>
        </nav>
        {children}
      </aside>
    </>
  );
}

// Navigation items
const navItems = [
  { path: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
  { path: "/about-us", icon: <Info className="h-5 w-5" />, label: "About Us" },
  { path: "/resources", icon: <BookOpen className="h-5 w-5" />, label: "Resources" },
  { path: "/connect", icon: <MessageCircle className="h-5 w-5" />, label: "Connect" },
  { path: "/register", icon: <FileText className="h-5 w-5" />, label: "Register" },
];

// Sidebar menu item
function SidebarMenuItem({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <Link
        to={to}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 16px",
          borderRadius: "0.75rem",
          fontWeight: 600,
          color: isActive ? "#ffffff" : isHovered ? "#000000ff" : "#334155",
          background: isActive
            ? "linear-gradient(90deg, #2563eb 10%, #4f46e5 90%)"
            : isHovered
            ? "rgba(59, 130, 246, 0.05)"
            : "transparent",
          boxShadow: isActive
            ? "0 6px 24px rgba(59, 130, 246, 0.2)"
            : isHovered
            ? "0 4px 12px rgba(59, 130, 246, 0.1)"
            : "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          textDecoration: "none",
          width: "100%",
          outline: "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered || isActive ? "scale(1.1)" : "scale(1)",
          }}
        >
          {icon}
        </span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

// Sidebar header
export function SidebarHeader({ children, className }) {
  return <div className={className}>{children}</div>;
}

// Sidebar content
export function SidebarContent({ children, className }) {
  return <nav className={className}>{children}</nav>;
}

// Sidebar group
export function SidebarGroup({ children }) {
  return <div>{children}</div>;
}
export function SidebarGroupLabel({ children, className }) {
  return <div className={className}>{children}</div>;
}
export function SidebarGroupContent({ children }) {
  return <div>{children}</div>;
}

// Sidebar menu
export function SidebarMenu({ children, className }) {
  return <ul className={className}>{children}</ul>;
}

// Sidebar footer
export function SidebarFooter({ children, className }) {
  return <footer className={className}>{children}</footer>;
}

// Sidebar trigger (for mobile)
export function SidebarTrigger(props) {
  const { open, setOpen } = useSidebar();
  return (
    <button
      {...props}
      aria-label="Open sidebar"
      onClick={() => setOpen(!open)}
    >
      <svg width="24" height="24" fill="none">
        <rect x="4" y="7" width="16" height="2" rx="1" fill="#64748b" />
        <rect x="4" y="15" width="16" height="2" rx="1" fill="#64748b" />
      </svg>
    </button>
  );
}

export { SidebarMenuItem };

export function SidebarMenuButton({ children, asChild, ...props }) {
  if (asChild) return children;
  return <button {...props}>{children}</button>;
}