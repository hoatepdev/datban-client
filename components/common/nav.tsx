"use client";
import React, { useState } from "react";
import { Home, Search, MessageCircle, User, PlusSquare } from "lucide-react";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "create", icon: PlusSquare, label: "Create" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="relative">
      {/* Create Post Button - Positioned to overflow above the nav */}
      <button
        onClick={() => setActiveTab("create")}
        className="fixed bottom-9 left-1/2 z-10 -translate-x-1/2 transform"
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg transition-all duration-200 hover:bg-blue-600 ${activeTab === "create" ? "scale-95 bg-blue-600" : ""} `}
        >
          <PlusSquare className="h-6 w-6 text-white" />
        </div>
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-around">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex h-full w-full flex-col items-center justify-center px-2 ${id === "create" ? "opacity-0" : ""} ${activeTab === id ? "text-blue-600" : "text-gray-500"} `}
            >
              <Icon
                className={`h-6 w-6 ${
                  activeTab === id ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className="mt-1 text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
