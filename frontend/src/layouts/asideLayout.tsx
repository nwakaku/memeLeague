//@ts-nocheck
"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Trophy,
  Zap,
  Vote,
  User,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface AsideLayoutProps {
  onPageChange?: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function AsideLayout({
  onPageChange = () => {},
  isSidebarOpen,
  setIsSidebarOpen,
}: AsideLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Get current page from URL path
  const currentPage = location.pathname.split("/")[1] || "dashboard";

  const navigationItems = [
    {
      id: "dashboard",
      icon: Heart,
      label: "My Pet",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "leaderboard",
      icon: Trophy,
      label: "Rankings",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "battle",
      icon: Zap,
      label: "Battle",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "dao",
      icon: Vote,
      label: "DAO",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "dashboard",
      icon: User,
      label: "Profile",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const handlePageChange = (pageId: string) => {
    navigate(`/${pageId}`);
    onPageChange(pageId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-20 left-4 z-50 p-3 rounded-xl transition-all duration-300 md:hidden
          bg-default-100 backdrop-blur-lg border border-default-200 text-default-700
          hover:bg-default-200 hover:scale-110 shadow-2xl`}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 bottom-0 z-40 transition-all duration-500 ease-out 
          md:relative md:left-0 md:top-0 md:bottom-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-72 md:w-20 lg:w-72
          bg-default-50 backdrop-blur-2xl
          shadow-2xl
        `}
      >
        <div className="relative h-full flex flex-col">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map(({ id, icon: Icon, label, color }, index) => (
              <button
                key={id}
                onClick={() => handlePageChange(id)}
                className={`
                    w-full flex items-center gap-4 shadow border border-default-200  shadow-2xl py-4 px-4 rounded-2xl transition-all duration-300
                    group hover:scale-[1.02] hover:shadow-2xl
                    ${
                      currentPage === id
                        ? `bg-gradient-to-r ${color} text-white shadow-2xl shadow-purple-500/25`
                        : "text-default-600 hover:text-default-900 hover:bg-default-100 backdrop-blur-sm"
                    }
                  `}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className={`
                    p-2 rounded-xl transition-all duration-300
                    ${
                      currentPage === id
                        ? "bg-white/20 shadow-lg"
                        : "bg-default-100 group-hover:bg-default-200"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="lg:block md:hidden block">
                  <span className="font-semibold text-sm block">{label}</span>
                  {currentPage === id && (
                    <span className="text-xs opacity-80">Active</span>
                  )}
                </div>
                {currentPage === id && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-lg"></div>
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Premium bottom section */}
          <div className="p-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm border border-default-200 p-4 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              <div className="relative">
                <div className="text-3xl mb-2 animate-bounce">🐾</div>
                <p className="text-default-900 font-bold text-sm lg:block md:hidden block mb-1">
                  Meme Pet League
                </p>
                <p className="text-default-600 text-xs lg:block md:hidden block">
                  Level up your pet
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
