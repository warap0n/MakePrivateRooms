import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/:roomId" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
