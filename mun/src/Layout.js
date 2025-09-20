// Layout.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./lib/utils";
import { Button } from "./components/ui/Button";
import { Home, Info, BookOpen, MessageCircle, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Skeleton } from "./components/ui/Skeleton";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  // Simulate loading for sidebar
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigationItems = [
    { title: "Home", url: createPageUrl("Home"), icon: Home },
    { title: "About Us", url: createPageUrl("AboutUs"), icon: Info },
    { title: "Resources", url: createPageUrl("Resources"), icon: BookOpen },
    { title: "Connect", url: createPageUrl("Connect"), icon: MessageCircle },
    { title: "Register", url: createPageUrl("Register"), icon: FileText },
  ];

  return (
    <SidebarProvider>
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #94a3b8, #64748b);
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #475569, #334155);
        }
        ::-webkit-scrollbar-corner {
          background: #f1f5f9;
        }
        html, body {
          overflow-x: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .main-content {
          width: 100%;
          max-width: calc(100vw - 260px);
        }
        @media (max-width: 1023px) {
          .main-content {
            max-width: 100vw;
          }
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Sidebar className="border-r border-slate-200/60 backdrop-blur-sm lg:w-[260px]">
    
 
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 lg:hidden shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
          
           
              </div>
              <SidebarTrigger className="hover:bg-slate-100/80 p-2 rounded-lg transition-colors duration-200 shadow-sm" />
            </div>
          </header>
          <div className="flex-1 overflow-auto lg:ml-[260px] main-content">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}