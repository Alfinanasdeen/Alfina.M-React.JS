import { useState, useEffect } from "react";
import "./Game.css";

// Box Component to represent each box in the grid
const Box = ({ isHit, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`box ${isHit ? "hit" : ""}`} // Apply hit class conditionally
    >
      {isHit ? "HIT" : ""}
    </div>
  );
};

// Game Component that contains the logic for the game
const Game = () => {
  const [score, setScore] = useState(0);
  const [hitBox, setHitBox] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // Game duration in seconds
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const [lastClickTime, setLastClickTime] = useState(0); // Track time of last click to prevent double clicks

  useEffect(() => {
    let timer;
    // Function to randomly select a box to display the keyword
    const randomHit = () => {
      const randomIndex = Math.floor(Math.random() * 9); // Random index between 0-8
      setHitBox(randomIndex);
      // Clear hitBox after 1 second
      setTimeout(() => setHitBox(null), 1000);
    };

    // Game timer
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          randomHit();
          setTimeLeft((prevTime) => prevTime - 1); // Decrease time
        } else {
          clearInterval(timer);
          setGameOver(true); // End game
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft, gameStarted, gameOver]);

  // Handle box click event with debounce logic
  const handleBoxClick = (index) => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime > 1000) {
      // If more than 1 second has passed since the last click
      setLastClickTime(currentTime); // Update the last click time

      if (index === hitBox) {
        setScore(score + 5); // Award points for correct hit
      } else {
        setScore(score - 2.5); // Deduct points for missed hit
      }
    }
  };

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setHitBox(null);
    setGameOver(false);
    setGameStarted(true);
  };

  // Restart the game
  const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setHitBox(null);
    setGameOver(false);
    setGameStarted(true); // Set game started to true for new game
  };

  // Render the game UI
  return (
    <div className="center-container">
      <h1 className="title">Hit the Box Game</h1>
      <p className="description">
        Test your reflexes by clicking on the boxes that say "HIT". You have 60
        seconds to score as high as possible. Be quick!
      </p>
      <h1>Score: {score}</h1>
      <h2>Time Left: {timeLeft}s</h2>
      {!gameStarted && !gameOver ? (
        <button onClick={startGame}>Start Game</button>
      ) : gameOver ? (
        <button onClick={restartGame}>Restart Game</button>
      ) : (
        <div className="grid-container">
          {[...Array(9)].map((_, index) => (
            <Box
              key={index}
              isHit={hitBox === index}
              onClick={() => handleBoxClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
