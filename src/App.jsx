import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./style/index.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
