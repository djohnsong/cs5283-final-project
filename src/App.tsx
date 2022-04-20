import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import VideoRoom from "./components/VideoRoom/VideoRoom";
import { SocketProvider } from "./SocketContext";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={"room/:roomId"} element={<VideoRoom />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
