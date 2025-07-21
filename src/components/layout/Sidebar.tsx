import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Plus, GripVertical, X } from "lucide-react";

const staticPages = [
  { id: 1, title: "Welcome" },
  { id: 2, title: "Project Plan" },
  { id: 3, title: "Ideas" },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

// Shared sidebar content component
const SidebarContent: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <>
    <nav className="flex-1 overflow-y-auto py-2 px-1">
      {staticPages.map((page) => (
        <div
          key={page.id}
          className={`group flex items-center gap-2 px-2 py-2 sm:py-1.5 rounded-md cursor-pointer hover:bg-blue-50 transition-colors touch-manipulation ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-gray-700 flex-1 truncate text-sm font-medium">
            {collapsed ? page.title.charAt(0) : page.title}
          </span>
          {!collapsed && (
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical size={16} className="text-gray-400" />
            </span>
          )}
        </div>
      ))}
    </nav>
    <div className="p-2 border-t">
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full flex items-center gap-2 text-blue-600 border-blue-100 hover:bg-blue-50 h-9 touch-manipulation"
      >
        <Plus size={16} />
        {!collapsed && <span>Add Page</span>}
      </Button>
    </div>
  </>
);

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, mobileOpen, onMobileClose }) => {
  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('mobile-sidebar');
        const target = event.target as Node;
        if (sidebar && !sidebar.contains(target)) {
          onMobileClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen, onMobileClose]);

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside
      className={`hidden lg:flex h-full bg-white border-r transition-all duration-200 flex-col ${collapsed ? "w-14" : "w-60"}`}
    >
      <div className="flex items-center justify-between h-12 sm:h-14 px-3 border-b">
        <span className={`text-lg font-medium text-gray-800 transition-opacity duration-200 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          Pages
        </span>
        <Button size="icon" variant="ghost" onClick={onCollapse} className="ml-auto w-8 h-8">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <SidebarContent collapsed={collapsed} />
    </aside>
  );

  // Mobile sidebar overlay
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity"
          onClick={onMobileClose}
        />
      )}
      
      {/* Mobile sidebar */}
      <aside
        id="mobile-sidebar"
        className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-12 sm:h-14 px-3 border-b">
          <span className="text-lg font-medium text-gray-800">Pages</span>
          <Button size="icon" variant="ghost" onClick={onMobileClose} className="w-8 h-8">
            <X size={18} />
          </Button>
        </div>
        <SidebarContent collapsed={false} />
      </aside>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
