import { useState } from "react";
import "./ElementTransfer.css";

// Bucket component to display items and allow selection
const Bucket = ({ items, onItemClick, selectedItems }) => {
  return (
    <div className="bucket">
      {items.map((item) => (
        <button
          key={item}
          className={`${item} ${
            selectedItems.includes(item) ? "selected" : ""
          }`}
          onClick={() => onItemClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const ElementTransfer = () => {
  // Initial state for the items in both buckets
  const [bucket1, setBucket1] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 5",
  ]);
  const [bucket2, setBucket2] = useState(["Item 4", "Item 6"]);

  // Selected items to transfer between buckets
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState(null);

  // Function to handle selecting/deselecting items
  const handleItemClick = (item, bucket) => {
    if (
      (bucket === "bucket1" && bucket1.includes(item)) ||
      (bucket === "bucket2" && bucket2.includes(item))
    ) {
      setSelectedItems(
        (prevItems) =>
          prevItems.includes(item)
            ? prevItems.filter((i) => i !== item) // Deselect item if already selected
            : [...prevItems, item] // Select item
      );
      setSelectedBucket(bucket);
    }
  };

  // Add selected items to the opposite bucket
  const handleAdd = () => {
    if (selectedBucket === "bucket1") {
      setBucket2((prevBucket2) => [...prevBucket2, ...selectedItems]);
      setBucket1((prevBucket1) =>
        prevBucket1.filter((item) => !selectedItems.includes(item))
      );
    } else if (selectedBucket === "bucket2") {
      setBucket1((prevBucket1) => [...prevBucket1, ...selectedItems]);
      setBucket2((prevBucket2) =>
        prevBucket2.filter((item) => !selectedItems.includes(item))
      );
    }
    setSelectedItems([]); // Clear selected items after moving
    setSelectedBucket(null);
  };

  // Remove selected items from the current bucket
  const handleRemove = () => {
    if (selectedBucket === "bucket1") {
      setBucket2((prevBucket2) => [...prevBucket2, ...selectedItems]);
      setBucket1((prevBucket1) =>
        prevBucket1.filter((item) => !selectedItems.includes(item))
      );
    } else if (selectedBucket === "bucket2") {
      setBucket1((prevBucket1) => [...prevBucket1, ...selectedItems]);
      setBucket2((prevBucket2) =>
        prevBucket2.filter((item) => !selectedItems.includes(item))
      );
    }
    setSelectedItems([]); // Clear selected items after removing
    setSelectedBucket(null);
  };

  // Move all items from bucket1 to bucket2
  const handleAddAll = () => {
    setBucket2((prevBucket2) => [...prevBucket2, ...bucket1]);
    setBucket1([]); // Clear bucket1
  };

  // Move all items from bucket2 to bucket1
  const handleRemoveAll = () => {
    setBucket1((prevBucket1) => [...prevBucket1, ...bucket2]);
    setBucket2([]); // Clear bucket2
  };

  return (
    <div className="element-transfer-container">
      <h2>Element Transfer</h2>
      <p className="description">
        Select items from either Bucket 1 or Bucket 2 and click &quot;Add&quot;
        or &quot;Remove&quot; to move them. You can also use &quot;Add All&quot;
        or &quot;Remove All&quot; to transfer all items.
      </p>

      <div className="element-transfer">
        <div className="bucket-container">
          <h3>Bucket 1</h3>
          <Bucket
            items={bucket1}
            onItemClick={(item) => handleItemClick(item, "bucket1")}
            selectedItems={selectedItems}
          />
        </div>

        <div className="controls">
          <button onClick={handleAdd} disabled={selectedItems.length === 0}>
            Add
          </button>
          <button onClick={handleRemove} disabled={selectedItems.length === 0}>
            Remove
          </button>
          <button onClick={handleAddAll} disabled={bucket1.length === 0}>
            Add All
          </button>
          <button onClick={handleRemoveAll} disabled={bucket2.length === 0}>
            Remove All
          </button>
        </div>

        <div className="bucket-container">
          <h3>Bucket 2</h3>
          <Bucket
            items={bucket2}
            onItemClick={(item) => handleItemClick(item, "bucket2")}
            selectedItems={selectedItems}
          />
        </div>
      </div>
    </div>
  );
};

export default ElementTransfer;
