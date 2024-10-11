import React, { useEffect, useRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  item: any;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, item, onClose }) => {
  const menuRef = useRef<HTMLUListElement | null>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose(); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside); 

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, [onClose]);

  const handleOptionClick = (action: string) => {
    console.log(`${action} ${item.name}`);
    onClose(); 
  };

  return (
    <ul
      ref={menuRef}
      className="context-menu"
      style={{
        position: "absolute",
        top: y,
        left: x,
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
        padding: "10px",
        listStyleType: "none",
        margin: 0,
      }}
    >
      <li onClick={() => handleOptionClick("Copy")}>Copy</li>
      <li onClick={() => handleOptionClick("Delete")}>Delete</li>
      <li onClick={() => handleOptionClick("Rename")}>Rename</li>
    </ul>
  );
};
