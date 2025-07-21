import React, { useState } from "react";
import { GripVertical, Trash2, Plus, CheckSquare, Edit2, MoreHorizontal } from "lucide-react";

const blocks = [
  { id: 1, type: "heading", content: "Welcome to your Notion-style Doc" },
  { id: 2, type: "text", content: "Start writing your ideas here. Use the sidebar to add or switch pages." },
  { id: 3, type: "todo", content: "Try the block controls!" },
];

const BlockEditorMock: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [touched, setTouched] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1 sm:gap-2 py-2 sm:py-6">
      {blocks.map((block) => (
        <div
          key={block.id}
          className="group relative flex items-start px-1 sm:px-2 py-2 sm:py-1 rounded hover:bg-blue-50 transition-colors"
          onMouseEnter={() => setHovered(block.id)}
          onMouseLeave={() => setHovered(null)}
          onTouchStart={() => setTouched(block.id)}
          onTouchEnd={() => setTimeout(() => setTouched(null), 2000)}
        >
          {/* Desktop hover controls */}
          {(hovered === block.id || touched === block.id) && (
            <>
              {/* Desktop controls */}
              <div className="hidden sm:flex absolute -left-10 flex-col gap-1 items-center">
                <button className="p-1 rounded hover:bg-blue-100 touch-manipulation" title="Drag">
                  <GripVertical size={16} className="text-gray-400" />
                </button>
                <button className="p-1 rounded hover:bg-blue-100 touch-manipulation" title="Add block">
                  <Plus size={16} className="text-blue-500" />
                </button>
                <button className="p-1 rounded hover:bg-blue-100 touch-manipulation" title="Delete">
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
              
              {/* Mobile controls */}
              <div className="sm:hidden absolute -right-2 -top-1 flex gap-1 bg-white border rounded-lg shadow-sm p-1">
                <button className="p-1.5 rounded hover:bg-blue-100 touch-manipulation" title="More options">
                  <MoreHorizontal size={16} className="text-gray-500" />
                </button>
                <button className="p-1.5 rounded hover:bg-blue-100 touch-manipulation" title="Add block">
                  <Plus size={16} className="text-blue-500" />
                </button>
              </div>
            </>
          )}
          
          {/* Block content */}
          <div className="pl-2 sm:pl-6 w-full min-w-0">
            {block.type === "heading" && (
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-start sm:items-center gap-2 leading-tight">
                <span className="flex-1 min-w-0">{block.content}</span>
                <Edit2 size={14} className="text-gray-300 mt-1 sm:mt-0 flex-shrink-0" />
              </h2>
            )}
            {block.type === "text" && (
              <p className="text-sm sm:text-base text-gray-800 flex items-start sm:items-center gap-2 leading-relaxed">
                <span className="flex-1 min-w-0">{block.content}</span>
                <Edit2 size={14} className="text-gray-300 mt-1 sm:mt-0 flex-shrink-0" />
              </p>
            )}
            {block.type === "todo" && (
              <label className="flex items-start sm:items-center gap-2 sm:gap-3 cursor-pointer touch-manipulation">
                <input 
                  type="checkbox" 
                  className="accent-blue-500 mt-1 sm:mt-0 w-4 h-4 sm:w-auto sm:h-auto flex-shrink-0" 
                />
                <span className="text-sm sm:text-base text-gray-800 line-through flex-1 min-w-0 leading-relaxed">
                  {block.content}
                </span>
                <CheckSquare size={14} className="text-blue-400 mt-1 sm:mt-0 flex-shrink-0" />
              </label>
            )}
          </div>
        </div>
      ))}
      
      {/* Add new block button */}
      <div className="group relative flex items-center px-1 sm:px-2 py-2 sm:py-1 rounded hover:bg-blue-50 transition-colors">
        <div className="pl-2 sm:pl-6 w-full">
          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors text-sm sm:text-base touch-manipulation py-1">
            <Plus size={16} />
            <span>Click to add a block</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockEditorMock;
