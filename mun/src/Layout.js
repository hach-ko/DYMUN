import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./lib/utils";
import User from './Entities/User.json';
import { Button } from "./components/ui/Button";
import { Globe, Users, Calendar, FileText, Home, Shield, Info, BookOpen, LogOut, MessageCircle, UserIcon } from "lucide-react";
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
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const navigationItems = [
    { title: "Home", url: createPageUrl("Home"), icon: Home },
    { title: "About Us", url: createPageUrl("AboutUs"), icon: Info },
    { title: "Resources", url: createPageUrl("Resources"), icon: BookOpen },
    { title: "Connect", url: createPageUrl("Connect"), icon: MessageCircle },
    { title: "Register", url: createPageUrl("Register"), icon: FileText },
    { title: "Admin", url: createPageUrl("Admin"), icon: Shield, admin: true },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await User.me();
        setUser(loggedInUser);
      } catch (e) {
        setUser(null);
      }
    };
    fetchUser();
  }, [location.pathname]);

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
  };

  const filteredNavItems = navigationItems.filter(item => {
    if (item.admin) return user?.email === 'gydro@example.com' || user?.email === 'gydropump@gmail.com';
    return true; // Always show all other items including register
  });

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
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Sidebar className="border-r border-slate-200/60 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200/60 p-4 bg-white/40 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              
             
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3 bg-white/20 backdrop-blur-sm">
         
            {user && (
              <SidebarMenu className="mt-4">
                 <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={handleLogout}
                        className='hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 hover:shadow-md transition-all duration-300 rounded-xl mb-2 w-full group'
                      >
                        <div className="flex items-center gap-4 px-4 py-3">
                          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-semibold">Logout</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarContent>

          
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://cdn.discordapp.com/attachments/1386722363097223199/1416655431429783622/WhatsApp_Image_2025-09-11_at_22.11.20_7fcb2b63.jpg?ex=68c8f42f&is=68c7a2af&hm=577e955538c0e932b9f919d8bc9f38204339e7359e055f77425b805b5e2eb3bd&" 
                  alt="DYMUN Logo"
                  className="w-8 h-8 rounded-lg object-cover shadow-md"
                />
                <h1 className="text-lg font-bold text-slate-900">DYMUN 2025</h1>
              </div>
              <SidebarTrigger className="hover:bg-slate-100/80 p-2 rounded-lg transition-colors duration-200 shadow-sm" />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}