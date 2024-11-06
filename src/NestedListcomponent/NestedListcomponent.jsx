import { useState } from "react";
import fileStructureData from "./fileStructureData.json";
import "./NestedListComponent.css";

// URLs for folder, file, and play button icons
const folderIconUrl =
  "https://img.icons8.com/?size=100&id=WWogVNJDSfZ5&format=png&color=000000";
const fileIconUrl =
  "https://img.icons8.com/?size=100&id=67360&format=png&color=000000";
const playButtonUrl =
  "https://img.icons8.com/?size=100&id=59862&format=png&color=000000";

// Component to display each nested item (folder/file)
const NestedItem = ({ item, level, onClick, isChild }) => {
  return (
    <div className="nested-item" onClick={() => onClick(item, level)}>
      <div className="item-container">
        {/* Play button displayed for child and grandchild items */}
        {isChild && (
          <span className="play-button">
            <img src={playButtonUrl} alt="Play" className="play-icon" />
          </span>
        )}

        {/* Folder icon if item has children, file icon if it doesn’t */}
        <span className={item.children ? "folder-icon icon" : "file-icon icon"}>
          <img
            src={item.children ? folderIconUrl : fileIconUrl}
            alt={item.children ? "Folder" : "File"}
            className="item-icon"
          />
        </span>

        {/* Display item name */}
        <span>{item.name}</span>
      </div>
    </div>
  );
};

// Component to handle the nested list structure and item expansion
const NestedListComponent = ({ data }) => {
  const [expandedLevels, setExpandedLevels] = useState([data]); // Track expanded levels
  const [path, setPath] = useState(["Root"]); // Track the current path

  // Handle click on an item to expand it if it has children
  const handleClick = (item, level) => {
    if (item.children) {
      // Add children to the expanded levels at the next level
      const newExpandedLevels = expandedLevels.slice(0, level + 1);
      newExpandedLevels.push(item.children);
      setExpandedLevels(newExpandedLevels);

      // Update path based on clicked item
      const newPath = [...path.slice(0, level + 1), item.name];
      setPath(newPath);
    }
  };

  return (
    <div>
      <h1 className="title">File Explorer</h1>
      <p className="description">
        This component displays a multi-level hierarchical structure where users
        can expand parent items to reveal child and sub-child elements.
      </p>
      {/* Display the current path */}
      <div className="path-bar">Path: {path.join(" / ")}</div>

      <div className="file-explorer">
        {/* Render each level of the file explorer */}
        {expandedLevels.map((items, level) => (
          <div key={level} className="column">
            {/* Render each item in the current level */}
            {items.map((item, index) => (
              <NestedItem
                key={index}
                item={item}
                level={level}
                onClick={handleClick}
                isChild={level > 0} // Pass true if item is child or grandchild
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <NestedListComponent data={fileStructureData} />
    </div>
  );
};

export default App;
