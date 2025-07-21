import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Copy, Link } from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText("https://notion-docs.app/page/12345");
    // Could add a toast notification here
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Link size={20} className="text-blue-500" />
            Share this page
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 py-2">
          <span className="text-sm text-gray-700 font-medium">Shareable link:</span>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 bg-gray-50 border rounded-lg px-3 py-2 min-w-0">
              <span className="text-xs sm:text-sm text-gray-800 select-all break-all">
                https://notion-docs.app/page/12345
              </span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopy}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center gap-2 touch-manipulation h-10 sm:h-9 w-full sm:w-auto"
            >
              <Copy size={16} />
              <span>Copy</span>
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
            <p className="font-medium text-blue-700 mb-1">📝 Public access</p>
            <p>Anyone with this link can view this page. No sign-in required.</p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="w-full touch-manipulation h-10"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
