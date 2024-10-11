import React from "react";
import FileItem from "./FileItem";
import { Files } from "../data";

export const FileExplorer: React.FC = () => {
  return (
    <div className="file-explorer">
      <FileItem item={Files} level={0} />
    </div>
  );
};
