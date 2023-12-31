import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stores from "./pages/Stores/Stores";
import Categories from "./pages/Categories/Categories";
import StorePage from "./pages/StorePage/StorePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Contact from "./pages/Contact/Contact";
import Blogs from "./pages/Blogs/Blogs";
import BlogPage from "./pages/BlogPage/BlogPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./pages/Dashboard/Login";
import Registration from "./pages/Dashboard/Registration";
import CouponsPage from "./pages/Coupons/CouponsPage";
import CouponPage from "./pages/CouponPage/CouponPage";
import AdminPanel from "./pages/Dashboard/Admin/Admin";
import DataEntryPanel from "./pages/Dashboard/DataEntry/DataEntry";
import AboutUs from "./pages/About Us/AboutUs";
import { AuthProvider } from "./components/Auth/AuthContext";
import { DataProvider } from "./components/Data/DataContext";
import "./style/index.scss";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:storeName/:storeId" element={<StorePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/categories/:categoryName/:categoryId"
              element={<CategoryPage />}
            />
            <Route
              path="/categories/:categoryId/:subCatId"
              element={<CategoryPage />}
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<BlogPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/registration" element={<Registration />} />
            <Route path="/coupon/:couponId" element={<CouponPage />} />
            <Route
              path="coupons/:category/:store/:type?"
              element={<CouponsPage />}
            />
            <Route
              path="/dashboard/admin"
              element={
                <PrivateRoute
                  path="/dashboard/admin"
                  element={<AdminPanel />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/dashboard/data-entry"
              element={
                <PrivateRoute
                  path="/dashboard/data-entry"
                  element={<DataEntryPanel />}
                  allowedRoles={["data-entry"]}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
