import { useState, useEffect } from "react";
import ElementTransfer from "./ElementTransfer/ElementTransfer.jsx";
import NestedListComponent from "./NestedListcomponent/NestedListcomponent.jsx";
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll.jsx";
import Game from "./Game/Game.jsx";
import BoxSplit from "./BoxSplit/BoxSplit.jsx";
import "./App.css";

const App = () => {
  // Initialize the state based on the value in localStorage or default to an empty string
  const [currentView, setCurrentView] = useState(
    localStorage.getItem("currentView") || ""
  );

  // Update the localStorage whenever the currentView state changes
  useEffect(() => {
    if (currentView) {
      localStorage.setItem("currentView", currentView);
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case "elementTransfer":
        return <ElementTransfer />;
      case "nestedList":
        return <NestedListComponent />;
      case "infiniteScroll":
        return <InfiniteScroll />;
      case "Game":
        return <Game />;
      case "BoxSplit":
        return <BoxSplit />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Select a Component</h1>
        <button onClick={() => setCurrentView("elementTransfer")}>
          Element Transfer
        </button>
        <button onClick={() => setCurrentView("nestedList")}>
          Nested List
        </button>
        <button onClick={() => setCurrentView("infiniteScroll")}>
          Infinite Scroll
        </button>
        <button onClick={() => setCurrentView("Game")}>Game</button>
        <button onClick={() => setCurrentView("BoxSplit")}>Box Split</button>
      </header>
      <div className="content">{renderView()}</div>
    </div>
  );
};

export default App;
