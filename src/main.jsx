import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import App from "./App";

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="board" element={<Board />} />
      </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
