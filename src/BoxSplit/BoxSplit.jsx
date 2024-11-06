import { useState } from "react";
import "./BoxSplit.css";

// A common component that represents a square box
const Square = ({ size, position, onClick }) => {
  const squareStyle = {
    width: `${size}px`,
    height: `${size}px`,
    top: `${position.top}px`,
    left: `${position.left}px`,
    position: "absolute", // This positions the square absolutely within the box-container
  };

  return <div className="square" style={squareStyle} onClick={onClick}></div>;
};

// Main component that handles the box splitting logic
const BoxSplit = () => {
  const initialSize = 400;
  const [squares, setSquares] = useState([
    { id: 0, size: initialSize, position: { top: 0, left: 0 } },
  ]);
  const [nextId, setNextId] = useState(1);

  // Function to handle the splitting of squares
  const handleSquareClick = (id) => {
    const clickedSquare = squares.find((square) => square.id === id);
    if (!clickedSquare) return;

    const newSize = clickedSquare.size / 2;
    if (newSize < 1) return;

    const newSquares = [
      {
        id: nextId,
        size: newSize,
        position: {
          top: clickedSquare.position.top,
          left: clickedSquare.position.left,
        },
      },
      {
        id: nextId + 1,
        size: newSize,
        position: {
          top: clickedSquare.position.top,
          left: clickedSquare.position.left + newSize,
        },
      },
      {
        id: nextId + 2,
        size: newSize,
        position: {
          top: clickedSquare.position.top + newSize,
          left: clickedSquare.position.left,
        },
      },
      {
        id: nextId + 3,
        size: newSize,
        position: {
          top: clickedSquare.position.top + newSize,
          left: clickedSquare.position.left + newSize,
        },
      },
    ];

    setSquares((prevSquares) =>
      prevSquares.filter((square) => square.id !== id).concat(newSquares)
    );

    setNextId(nextId + 4);
  };

  return (
    <div className="center-container">
      <h1 className="title">Box Splitter Game</h1>
      <p className="description">
        Click inside the box to split it into four smaller squares. Keep
        clicking to split each square further. How far can you go?
      </p>
      <div className="box-container">
        {squares.map((square) => (
          <Square
            key={square.id}
            size={square.size}
            position={square.position}
            onClick={() => handleSquareClick(square.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxSplit;
