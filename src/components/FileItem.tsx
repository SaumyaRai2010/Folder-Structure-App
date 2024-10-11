import React, { useState } from "react";
import { ContextMenu } from "./ContextMenu";

interface FileItemProps {
  item: any;
  level: number;
}

const FileItem: React.FC<FileItemProps> = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleLeftClick = () => {
    setIsSelected(!isSelected);
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedItem(item);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="file-item"
      style={{ marginLeft: `${level * 20}px`, marginTop: "10px" }}
      onContextMenu={handleRightClick}
    >
      <div
        className={`item ${
          item.type === "folder" ? (isOpen ? "selected" : "closed") : ""
        }`}
        onClick={item.type === "folder" ? toggleFolder : handleLeftClick}
      >
        {item.type === "folder" && (
          <span className="arrow" onClick={toggleFolder}>
            {isOpen ? "▼" : "▶"}
          </span>
        )}

        <span className="icon">{item.type === "file" ? "📄" : "📁"}</span>
        {item.name}
      </div>

      {isOpen &&
        item.type === "folder" &&
        item.data?.map((child: any) => (
          <FileItem key={child.name} item={child} level={level + 1} />
        ))}
      {contextMenuVisible && selectedItem && (
        <ContextMenu
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          item={selectedItem}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
};

export default React.memo(FileItem);
