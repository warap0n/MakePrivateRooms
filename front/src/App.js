import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/error/Error";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<Error />} />

          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
