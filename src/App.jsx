import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import RegistrationPage from "./pages/user/RegistrationPage";
import SchedulesPage from "./pages/user/SchedulesPage";
import AboutPage from "./pages/user/AboutPage";
import BlogPage from "./pages/user/BlogPage";
import StandingsPage from "./pages/user/StandingsPage";
import Login from "./pages/shared/Login";
import AdminPage from "./pages/admin/AdminPage";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import ToggleProvider from "./context/ToggleProvider";
import CategoryProvider from "./context/CategoryProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "flowbite";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes("admin") ? (
        <CategoryProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegistrationPage />} />

            <Route
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/games" element={<SchedulesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/blogs" element={<BlogPage />} />
            </Route>
          </Routes>
          <Footer />
        </CategoryProvider>
      ) : (
        <ToggleProvider>
          <AdminPage />
        </ToggleProvider>
      )}
    </>
  );
}

export default App;
