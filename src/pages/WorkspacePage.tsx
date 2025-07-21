import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import BlockEditorMock from "../components/editor/BlockEditorMock";
import ShareModal from "../components/ShareModal";

const WorkspacePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapse={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onShare={() => setShareOpen(true)}
          onMenuClick={() => setMobileMenuOpen(true)}
          showMenuButton={isMobile}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 px-2 sm:px-0">
              Welcome
            </h1>
            <div className="px-2 sm:px-0">
              <BlockEditorMock />
            </div>
          </div>
        </main>
      </div>
      
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
};

export default WorkspacePage;
