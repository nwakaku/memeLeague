//@ts-nocheck
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { AsideLayout } from "./asideLayout";

interface DefaultLayoutProps {
  children?: React.ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
  showSidebar?: boolean; // New prop to control sidebar visibility
}

export default function DefaultLayout({
  children,
  currentPage = "dashboard",
  onPageChange = () => {},
  showSidebar = true, // Default to true, but can be overridden
}: DefaultLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden container mx-auto">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex h-screen pt-16">
        {/* Conditionally render AsideLayout */}
        {showSidebar && (
          <AsideLayout
            currentPage={currentPage}
            onPageChange={onPageChange}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}

        {/* Main content area - adjust margins based on sidebar presence */}
        <main
          className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] ${
            showSidebar ? "" : "w-full"
          }`}
        >
          <div className="min-h-full">
            {/* Content wrapper */}
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="transition-all duration-300">
                {children || (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-2xl">
                      <Heart size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                      Welcome to Meme Pet League
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                      Your premium pet management experience starts here. Choose
                      a section from the sidebar to begin your journey.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Premium Footer */}
            <footer className="w-full flex items-center justify-center py-3 border-t border-white/10">
              <div className="max-w-6xl mx-auto text-center">
                <div className="text-2xl mb-4">🐾</div>
                <p className="text-gray-400 mb-4">
                  Meme Pet League - Where $GUI becomes culture
                </p>
                <div className="flex justify-center gap-6 text-sm text-gray-500">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                  <span>Discord</span>
                  <span>Twitter</span>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
