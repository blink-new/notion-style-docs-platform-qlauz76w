import React from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Menu, Share2 } from "lucide-react";

interface HeaderProps {
  onShare: () => void;
  onMenuClick: () => void;
  showMenuButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onShare, onMenuClick, showMenuButton }) => {
  return (
    <header className="flex items-center justify-between h-12 sm:h-14 px-3 sm:px-6 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="flex items-center gap-2 sm:gap-3">
        {showMenuButton && (
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onMenuClick}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9"
          >
            <Menu size={18} />
          </Button>
        )}
        <span className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 select-none truncate">
          Workspace
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          onClick={onShare} 
          size="sm"
          className="text-blue-600 border-blue-100 hover:bg-blue-50 h-8 sm:h-9 px-2 sm:px-3"
        >
          <Share2 size={16} className="sm:mr-2" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        <Avatar className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-700 font-bold select-none">
          <span className="text-xs sm:text-sm">N</span>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
