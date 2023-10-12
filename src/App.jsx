import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stores from "./pages/Stores/Stores";
import Categories from "./pages/Categories/Categories";
import StorePage from "./pages/StorePage/StorePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SubCatPage from "./pages/SubCatPage/SubCatPage";
import "./style/index.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:storeId" element={<StorePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route
          path="/categories/:categoryId/:subCatId"
          element={<SubCatPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
