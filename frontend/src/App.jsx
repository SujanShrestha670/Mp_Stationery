import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
// adjust the import path accordingly

import LandingPage from "./pages/LandingPage";
import BooksPage from "./pages/BooksPage";
import GiftsPage from "./pages/GiftsPage";
import SportsPage from "./pages/SportsPage";
import StationeryPage from "./pages/StationeryPage";
import CategoriesPage from "./pages/CategoriesPage";
import WishListPage from "./pages/WishListPage";
import AddToCartPage from "./pages/AddToCartPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/gifts" element={<GiftsPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/stationery" element={<StationeryPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/addtocart" element={<AddToCartPage />} />
        {/* Protect the profile route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
