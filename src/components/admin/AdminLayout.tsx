"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Tv,
  Settings,
  LogOut,
  Menu,
  X,
  PlaySquare,
} from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/utils/constants";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  PlaySquare,
  Tv,
  Settings,
};

export default function AdminLayout({
  children,
  activeTab,
  onTabChange,
  onLogout,
}: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-56 lg:w-64 bg-[#161f2e] border-r border-gray-800 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00a8e1] to-[#00f5d4] flex items-center justify-center flex-shrink-0">
              <PlaySquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Admin</h1>
              <p className="text-xs text-gray-400">TeluguDB</p>
            </div>
          </div>
        </div>

        {/* Close button - mobile only */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-[#00a8e1] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1f293a]"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay - mobile only */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile menu button */}
        <div className="lg:hidden p-3 border-b border-gray-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-[#161f2e] rounded-lg border border-gray-700"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
